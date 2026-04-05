import { createHash, randomBytes } from 'node:crypto';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Token, TokenTypes } from '@prisma-gen/client';

import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TokenCreateDto } from './dto/token-create.dto';

@Injectable()
export class TokensService {
  constructor(
    @Inject('MAIL_SERVICE') private readonly mail: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  private generateToken(): string {
    return randomBytes(48).toString('hex');
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async getTokens(
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Token>> {
    const [invites, total] = await Promise.all([
      this.prisma.token.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: {
          status: 'asc',
        },
      }),
      this.prisma.token.count({}),
    ]);

    return new PaginatedResponseDto(invites, total, pagination);
  }

  async getTokensStats(): Promise<object> {
    const [all, created, used, revoked, expired] = await Promise.all([
      this.prisma.token.count(),
      this.prisma.token.count({ where: { status: 'CREATED' } }),
      this.prisma.token.count({ where: { status: 'USED' } }),
      this.prisma.token.count({ where: { status: 'REVOKED' } }),
      this.prisma.token.count({ where: { status: 'EXPIRED' } }),
    ]);

    return {
      all: all,
      created: created,
      used: used,
      revoked: revoked,
      expired: expired,
    };
  }

  private async getWorkingTokenByEmail(
    email: string,
    type: TokenTypes,
  ): Promise<Token | null> {
    const existingToken = await this.prisma.token.findFirst({
      where: { email: email, type: type, status: 'CREATED' },
    });

    if (existingToken && existingToken.expires_at < new Date()) {
      await this.prisma.token.update({
        where: {
          id: existingToken.id,
        },
        data: {
          status: 'EXPIRED',
        },
      });

      throw new NotFoundException('Token not found');
    }

    return existingToken;
  }

  async getWorkingTokenByRaw(raw: string, type: TokenTypes): Promise<Token> {
    const hashed = this.hashToken(raw);
    const existingToken = await this.prisma.token.findFirst({
      where: { hash: hashed, status: 'CREATED', type: type },
    });

    if (!existingToken) {
      throw new NotFoundException('Token not found');
    }

    if (existingToken.expires_at < new Date()) {
      await this.prisma.token.update({
        where: {
          id: existingToken.id,
        },
        data: {
          status: 'EXPIRED',
        },
      });

      throw new NotFoundException('Token not found');
    }

    return existingToken;
  }

  async createToken(dto: TokenCreateDto, type: TokenTypes): Promise<Token> {
    const existingToken = await this.getWorkingTokenByEmail(dto.email, type);

    if (existingToken !== null) {
      throw new ConflictException('Token already exists');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (user && type === 'INVITE') {
      throw new UnauthorizedException('User already registered');
    }

    if (!user && type === 'PASSWORD') {
      throw new NotFoundException('User not found');
    }

    const rawToken = this.generateToken();
    const hashToken = this.hashToken(rawToken);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const token = await this.prisma.token.create({
      data: {
        hash: hashToken,
        email: dto.email,
        status: 'CREATED',
        type: type,
        expires_at: expiresAt,
      },
    });

    if (token.type === 'INVITE') {
      this.mail.emit('invite.created', {
        email: dto.email,
        token: rawToken,
      });
    } else {
      this.mail.emit('restore.created', {
        email: dto.email,
        token: rawToken,
      });
    }

    return token;
  }

  async useToken(raw: string, type: TokenTypes): Promise<Token> {
    const token = await this.getWorkingTokenByRaw(raw, type);

    return this.prisma.token.update({
      where: {
        hash: token.hash,
      },
      data: {
        status: 'USED',
      },
    });
  }

  async revokeUserToken(id: string): Promise<Token> {
    return this.prisma.token.update({
      where: {
        id: id,
      },
      data: {
        status: 'REVOKED',
      },
    });
  }

  async manuallyDeleteExpiredTokens(): Promise<void> {
    await this.prisma.token.deleteMany({
      where: {
        OR: [
          { status: 'EXPIRED' },
          { status: 'USED' },
          { status: 'REVOKED' },
          {
            expires_at: {
              lt: new Date(),
            },
          },
        ],
      },
    });
  }

  @Cron(CronExpression.EVERY_WEEK)
  async automaticDeleteExpiredTokens(): Promise<void> {
    await this.manuallyDeleteExpiredTokens();
  }
}
