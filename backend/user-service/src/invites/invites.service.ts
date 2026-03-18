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

  async getInviteByToken(rawToken: string): Promise<Invite> {
    const hashedToken = this.hashToken(rawToken);

    const invite = await this.prisma.invite.findFirst({
      where: {
        token: hashedToken,
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

    if (existing !== null) {
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

    return this.prisma.$transaction(async (tx) => {
      const invite = await tx.invite.findFirst({
        where: {
          token: hashedToken,
        },
      });

      if (!invite) {
        throw new NotFoundException('Invite not found');
      }

      if (invite.status !== 'CREATED') {
        throw new ConflictException('Invite already used/revoked');
      }

      if (invite.expires_at < new Date()) {
        await tx.invite.update({
          where: { id: invite.id },
          data: { status: 'EXPIRED' },
        });

        throw new ConflictException('Invite expired');
      }

      return tx.invite.update({
        where: { id: invite.id },
        data: { status: 'USED' },
      });
    });
  }

  async revokeInvite(rawToken: string): Promise<Invite> {
    const hashedToken = this.hashToken(rawToken);

    const invite = await this.prisma.invite.findFirst({
      where: {
        token: hashedToken,
      },
    });

    if (!invite) {
      throw new NotFoundException('Invite not found');
    }

    if (invite.status !== 'CREATED') {
      throw new ConflictException('Cannot revoke this invite');
    }

    return this.prisma.invite.update({
      where: { id: invite.id },
      data: { status: 'REVOKED' },
    });
  }

  @Cron(CronExpression.EVERY_WEEK)
  async deleteExpiredInvites(): Promise<void> {
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
