import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { User, Prisma } from '@prisma-gen/client';
import { Roles, UserStatus } from '@prisma-gen/enums';
import { hash, verify } from 'argon2';

import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { BanUserDto } from './dto/ban-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

type UserSafe = Omit<User, 'password_hash'>;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  private toUserSafe(user: User): UserSafe {
    const { password_hash: _password_hash, ...safeUser } = user;
    return safeUser;
  }

  async findAllUsers(
    pagination: PaginationDto,
    search: SearchUsersDto,
  ): Promise<PaginatedResponseDto<UserSafe>> {
    const where: Prisma.UserWhereInput = {};

    if (search.id) {
      where.id = search.id;
    }

    if (search.role) {
      where.role = search.role;
    }

    if (search.status) {
      where.status = search.status;
    }

    if (search.name) {
      where.name = { contains: search.name, mode: 'insensitive' };
    }

    if (search.surname) {
      where.surname = { contains: search.surname, mode: 'insensitive' };
    }

    if (search.email) {
      where.email = { contains: search.email, mode: 'insensitive' };
    }

    if (search.phone_number) {
      where.phone_number = { contains: search.phone_number };
    }

    if (search.query) {
      where.OR = [
        { name: { contains: search.query, mode: 'insensitive' } },
        { surname: { contains: search.query, mode: 'insensitive' } },
        { email: { contains: search.query, mode: 'insensitive' } },
        { phone_number: { contains: search.query } },
      ];
    }

    const orderBy: Prisma.UserOrderByWithRelationInput = {};
    if (search.orderBy) {
      orderBy[search.orderBy as keyof Prisma.UserOrderByWithRelationInput] =
        (search.orderDirection || 'asc') as Prisma.SortOrder;
    } else {
      orderBy.created_at = 'desc';
    }

    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy,
      }),
      this.prisma.user.count({ where }),
    ]);

    const safeItems = items.map((item) => this.toUserSafe(item));
    return new PaginatedResponseDto(
      safeItems,
      total,
      pagination,
      search.query || null,
    );
  }

  async findById(id: string): Promise<UserSafe> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return this.toUserSafe(existingUser);
  }

  async banUser(id: string, _banUserDto: BanUserDto): Promise<UserSafe> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (existingUser.role === Roles.ADMIN) {
      throw new ForbiddenException('Cannot ban an admin user');
    }

    if (existingUser.status === UserStatus.BANNED) {
      throw new BadRequestException('User is already banned');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        status: UserStatus.BANNED,
        updated_at: new Date(),
      },
    });

    await this.prisma.session.updateMany({
      where: { userId: id },
      data: { lastActiveAt: new Date() },
    });

    return this.toUserSafe(updatedUser);
  }

  async unbanUser(id: string): Promise<UserSafe> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (existingUser.status === UserStatus.ACTIVE) {
      throw new BadRequestException('User is already active');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        status: UserStatus.ACTIVE,
        updated_at: new Date(),
      },
    });

    return this.toUserSafe(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (existingUser.role === Roles.ADMIN) {
      throw new ForbiddenException('Cannot delete an admin user');
    }

    await this.prisma.$transaction([
      this.prisma.session.deleteMany({ where: { userId: id } }),
      this.prisma.token.deleteMany({ where: { email: existingUser.email } }),
      this.prisma.user.delete({ where: { id: id } }),
    ]);
  }

  async updateEmail(
    userId: string,
    updateEmailDto: UpdateEmailDto,
  ): Promise<UserSafe> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: { email: updateEmailDto.email },
    });

    if (userWithSameEmail && userWithSameEmail.id !== userId) {
      throw new ConflictException('Email already in use');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        email: updateEmailDto.email,
        updated_at: new Date(),
      },
    });

    return this.toUserSafe(updatedUser);
  }

  async updatePassword(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const isPasswordValid = await verify(
      existingUser.password_hash,
      updatePasswordDto.currentPassword,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    const newPasswordHash = await hash(updatePasswordDto.newPassword);

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password_hash: newPasswordHash,
        updated_at: new Date(),
      },
    });

    await this.prisma.session.deleteMany({
      where: { userId: userId },
    });
  }

  async updatePhone(
    userId: string,
    updatePhoneDto: UpdatePhoneDto,
  ): Promise<UserSafe> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const userWithSamePhone = await this.prisma.user.findUnique({
      where: { phone_number: updatePhoneDto.phone_number },
    });

    if (userWithSamePhone && userWithSamePhone.id !== userId) {
      throw new ConflictException('Phone number already in use');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        phone_number: updatePhoneDto.phone_number,
        updated_at: new Date(),
      },
    });

    return this.toUserSafe(updatedUser);
  }

  async updateAvatar(
    userId: string,
    updateAvatarDto: UpdateAvatarDto,
  ): Promise<UserSafe> {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        avatar_url: updateAvatarDto.avatar_url || null,
        updated_at: new Date(),
      },
    });

    return this.toUserSafe(updatedUser);
  }

  async adminUpdateEmail(
    userId: string,
    updateEmailDto: UpdateEmailDto,
  ): Promise<UserSafe> {
    return this.updateEmail(userId, updateEmailDto);
  }

  async adminUpdatePhone(
    userId: string,
    updatePhoneDto: UpdatePhoneDto,
  ): Promise<UserSafe> {
    return this.updatePhone(userId, updatePhoneDto);
  }

  async adminUpdateAvatar(
    userId: string,
    updateAvatarDto: UpdateAvatarDto,
  ): Promise<UserSafe> {
    return this.updateAvatar(userId, updateAvatarDto);
  }
}
