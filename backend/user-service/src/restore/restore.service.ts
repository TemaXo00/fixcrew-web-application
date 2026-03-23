import { createHash, randomBytes } from 'node:crypto';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as argon2 from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRestoreDto } from './dto/create-restore.dto';
import { UseRestoreDto } from './dto/use-restore.dto';

@Injectable()
export class RestoreService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('MAIL_SERVICE') private readonly mail: ClientProxy,
  ) {}

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async setRestore(dto: CreateRestoreDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        status: 'ACTIVE',
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activeToken = await this.prisma.token.findFirst({
      where: {
        email: dto.email,
        status: 'CREATED',
        type: 'PASSWORD'
      },
    });

    if (activeToken) {
      return
    }

    const rawToken = this.generateToken();
    const hashedToken = this.hashToken(rawToken);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    await this.prisma.token.create({
      data: {
        hash: hashedToken,
        email: dto.email,
        expires_at: expiresAt,
        status: 'CREATED',
        type: 'PASSWORD',
      },
    });

    this.mail.send('user.restore', {
      email: dto.email,
      token: rawToken,
    });
  }

  async useRestore(rawToken: string, dto: UseRestoreDto): Promise<void> {
    const hashedToken = this.hashToken(rawToken);

    const validToken = await this.prisma.token.findUnique({
      where: {
        hash: hashedToken,
        status: 'CREATED',
        type: 'PASSWORD',
      },
    });

    if (!validToken) {
      throw new NotFoundException('Token not found');
    }

    if (validToken.expires_at < new Date()) {
      await this.prisma.token.update({
        where: { id: validToken.id },
        data: { status: 'EXPIRED' },
      });
      throw new ConflictException('Token has expired');
    }

    await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: {
          email: validToken.email,
          status: 'ACTIVE',
        },
      });

      if (!user) {
        throw new NotFoundException('User not found or inactive');
      }

      const hashedPassword = await argon2.hash(dto.password);

      await tx.user.update({
        where: { email: validToken.email },
        data: { password_hash: hashedPassword },
      });

      await tx.token.update({
        where: { id: validToken.id },
        data: {
          status: 'USED',
        },
      });
    });
  }
}
