import { createHash, randomBytes } from 'node:crypto';

import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
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

  async getWorkingInvites(
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Invite>> {
    const [invites, total] = await Promise.all([
      this.prisma.invite.findMany({
        where: {
          status: 'CREATED',
        },
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.invite.count({
        where: {
          status: 'CREATED',
        },
      }),
    ]);

    return new PaginatedResponseDto(invites, total, pagination);
  }

  async createInvite(dto: InviteCreateDto): Promise<Invite> {
    const token = randomBytes(20).toString('hex');
    const hashToken = createHash('sha256').update(token).digest('hex');

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const invite = await this.prisma.invite.create({
      data: {
        token: hashToken,
        email: dto.email,
        expires_at: expiresAt,
      },
    });

    this.mail.emit('invite.created', {
      ...invite,
      rawToken: token,
    });

    return invite;
  }

  async getInviteByToken(token: string): Promise<Invite | null> {
    const hashToken = createHash('sha256').update(token).digest('hex');

    const invite = await this.prisma.invite.findUnique({
      where: { token: hashToken },
    });

    if (!invite) {return null;}

    if (invite.expires_at < new Date()) {
      await this.prisma.invite.update({
        where: { id: invite.id },
        data: { status: 'EXPIRED' },
      });
      return null;
    }

    return invite;
  }
}
