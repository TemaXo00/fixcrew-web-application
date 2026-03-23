import { randomBytes, createHash } from 'node:crypto';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Token } from '@prisma-gen/client';

import { InviteCreateDto } from './dto/invite-create.dto';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InvitesService {
  constructor(
    @Inject('MAIL_SERVICE') private readonly mail: ClientProxy,
    private readonly prisma: PrismaService,
  ) {}

  private generateToken(): string {
    return randomBytes(32).toString('hex');
  }

  private hashToken(token: string): string {
    return createHash('sha256').update(token).digest('hex');
  }

  async getInvites(
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Token>> {
    const [invites, total] = await Promise.all([
      this.prisma.token.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.token.count({}),
    ]);

    return new PaginatedResponseDto(invites, total, pagination);
  }

  async getInvitesStats(): Promise<object> {
    const [created, used, revoked, expired] = await Promise.all([
      this.prisma.token.count({ where: { status: 'CREATED' } }),
      this.prisma.token.count({ where: { status: 'USED' } }),
      this.prisma.token.count({ where: { status: 'REVOKED' } }),
      this.prisma.token.count({ where: { status: 'EXPIRED' } }),
    ]);

    return {
      Created: created,
      Used: used,
      Revoked: revoked,
      Expired: expired,
    };
  }

  private async getInviteByToken(token: string): Promise<Token> {
    const invite = await this.prisma.token.findFirst({
      where: {
        hash: token,
        status: 'CREATED',
      },
    });

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    if (invite.expires_at < new Date()) {
      await this.prisma.token.update({
        where: { id: invite.id },
        data: { status: 'EXPIRED' },
      });

      throw new ConflictException('Invite expired');
    }

    return invite;
  }

  async createInvite(dto: InviteCreateDto): Promise<void> {
    const rawToken = this.generateToken();
    const hashedToken = this.hashToken(rawToken);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const existing = await this.prisma.token.findFirst({
      where: {
        email: dto.email,
        status: 'CREATED',
      },
    });

    if (existing) {
      throw new ConflictException('Invite for this email already exists');
    }

    await this.prisma.token.create({
      data: {
        hash: hashedToken,
        email: dto.email,
        expires_at: expiresAt,
      },
    });

    this.mail.emit('invite.created', {
      email: dto.email,
      token: rawToken,
    });
  }

  async useInvite(rawToken: string): Promise<void> {
    const hashedToken = this.hashToken(rawToken);

    const invite = await this.getInviteByToken(hashedToken);

    this.prisma.token.update({
      where: { id: invite.id },
      data: { status: 'USED' },
    });
  }

  async revokeInvite(rawToken: string): Promise<void> {
    const hashedToken = this.hashToken(rawToken);

    const invite = await this.getInviteByToken(hashedToken);

    this.prisma.token.update({
      where: { id: invite.id },
      data: { status: 'REVOKED' },
    });
  }

  async manuallyDeleteExpiredInvites(): Promise<void> {
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
  async automatedDeleteExpiredInvites(): Promise<void> {
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
}
