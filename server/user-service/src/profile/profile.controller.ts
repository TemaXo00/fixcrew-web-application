import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from '@prisma-gen/client';
import { Roles as PrismaRoles } from '@prisma-gen/enums';

import { BanUserDto } from './dto/ban-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UpdateAvatarDto } from './dto/update-avatar.dto';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { ProfileService } from './profile.service';
import { Authorization } from '../common/decorators/authorization.decorator';
import { Authorized } from '../common/decorators/authorized.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { PaginationDto , PaginatedResponseDto } from '../common/dto/pagination.dto';

type UserSafe = Omit<User, 'password_hash'>;

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @Authorization()
  async getCurrentUser(@Authorized('id') userId: string): Promise<UserSafe> {
    return this.profileService.findById(userId);
  }

  @Patch('me/email')
  @Authorization()
  @HttpCode(HttpStatus.OK)
  async updateMyEmail(
    @Authorized('id') userId: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ): Promise<UserSafe> {
    return this.profileService.updateEmail(userId, updateEmailDto);
  }

  @Patch('me/password')
  @Authorization()
  @HttpCode(HttpStatus.OK)
  async updateMyPassword(
    @Authorized('id') userId: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    return this.profileService.updatePassword(userId, updatePasswordDto);
  }

  @Patch('me/phone')
  @Authorization()
  @HttpCode(HttpStatus.OK)
  async updateMyPhone(
    @Authorized('id') userId: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ): Promise<UserSafe> {
    return this.profileService.updatePhone(userId, updatePhoneDto);
  }

  @Patch('me/avatar')
  @Authorization()
  @HttpCode(HttpStatus.OK)
  async updateMyAvatar(
    @Authorized('id') userId: string,
    @Body() updateAvatarDto: UpdateAvatarDto,
  ): Promise<UserSafe> {
    return this.profileService.updateAvatar(userId, updateAvatarDto);
  }

  @Get('users')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  async findAllUsers(
    @Query() pagination: PaginationDto,
    @Query() search: SearchUsersDto,
  ): Promise<PaginatedResponseDto<UserSafe>> {
    return this.profileService.findAllUsers(pagination, search);
  }

  @Get('users/:id')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  async findById(@Param('id') id: string): Promise<UserSafe> {
    return this.profileService.findById(id);
  }

  @Patch('users/:id/ban')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  @HttpCode(HttpStatus.OK)
  async banUser(
    @Param('id') id: string,
    @Body() banUserDto: BanUserDto,
  ): Promise<UserSafe> {
    return this.profileService.banUser(id, banUserDto);
  }

  @Patch('users/:id/unban')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  @HttpCode(HttpStatus.OK)
  async unbanUser(@Param('id') id: string): Promise<UserSafe> {
    return this.profileService.unbanUser(id);
  }

  @Patch('users/:id/email')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  @HttpCode(HttpStatus.OK)
  async adminUpdateEmail(
    @Param('id') id: string,
    @Body() updateEmailDto: UpdateEmailDto,
  ): Promise<UserSafe> {
    return this.profileService.adminUpdateEmail(id, updateEmailDto);
  }

  @Patch('users/:id/phone')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  @HttpCode(HttpStatus.OK)
  async adminUpdatePhone(
    @Param('id') id: string,
    @Body() updatePhoneDto: UpdatePhoneDto,
  ): Promise<UserSafe> {
    return this.profileService.adminUpdatePhone(id, updatePhoneDto);
  }

  @Patch('users/:id/avatar')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  @HttpCode(HttpStatus.OK)
  async adminUpdateAvatar(
    @Param('id') id: string,
    @Body() updateAvatarDto: UpdateAvatarDto,
  ): Promise<UserSafe> {
    return this.profileService.adminUpdateAvatar(id, updateAvatarDto);
  }

  @Delete('users/:id')
  @Authorization()
  @Roles(PrismaRoles.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.profileService.deleteUser(id);
  }
}
