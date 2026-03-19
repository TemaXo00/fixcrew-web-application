import { randomBytes, createHash } from 'node:crypto';

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Invite } from '@prisma-gen/client';

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
  ): Promise<PaginatedResponseDto<Invite>> {
    const [invites, total] = await Promise.all([
      this.prisma.invite.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.invite.count({}),
    ]);

    return new PaginatedResponseDto(invites, total, pagination);
  }

  async getInvitesStats(): Promise<object> {
    const [created, used, revoked, expired] = await Promise.all([
      this.prisma.invite.count({ where: {status: 'CREATED'}}),
      this.prisma.invite.count({where: {status: 'USED'}}),
      this.prisma.invite.count({where: {status: 'REVOKED'}}),
      this.prisma.invite.count({where: {status: 'EXPIRED'}}),
    ])

    return {
      "Created": created,
      "Used": used,
      "Revoked": revoked,
      "Expired": expired,
    }
  }

  private async getInviteByToken(token: string): Promise<Invite> {
    const invite = await this.prisma.invite.findFirst({
      where: {
        token: token,
        status: 'CREATED',
      },
    });

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    if (invite.expires_at < new Date()) {
      await this.prisma.invite.update({
        where: { id: invite.id },
        data: { status: 'EXPIRED' },
      });

      throw new ConflictException('Invite expired');
    }

    return invite;
  }

  async createInvite(dto: InviteCreateDto): Promise<Invite> {
    const rawToken = this.generateToken();
    const hashedToken = this.hashToken(rawToken);

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    const existing = await this.prisma.invite.findFirst({
      where: {
        email: dto.email,
        status: 'CREATED',
      },
    });

    if (existing) {
      throw new ConflictException('Invite for this email already exists');
    }

    const invite = await this.prisma.invite.create({
      data: {
        token: hashedToken,
        email: dto.email,
        expires_at: expiresAt,
      },
    });

    this.mail.emit('invite.created', {
      email: dto.email,
      token: rawToken,
      expiresAt,
    });

    return invite;
  }

  async useInvite(rawToken: string): Promise<Invite> {
    const hashedToken = this.hashToken(rawToken);

    const invite = await this.getInviteByToken(hashedToken);

      return this.prisma.invite.update({
        where: { id: invite.id },
        data: { status: 'USED' },
      });
  }

  async revokeInvite(rawToken: string): Promise<Invite> {
    const hashedToken = this.hashToken(rawToken);

    const invite = await this.getInviteByToken(hashedToken)

    return this.prisma.invite.update({
      where: { id: invite.id },
      data: { status: 'REVOKED' },
    });
  }

  async manuallyDeleteExpiredInvites(): Promise<void> {
    await this.prisma.invite.deleteMany({
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
    await this.prisma.invite.deleteMany({
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
