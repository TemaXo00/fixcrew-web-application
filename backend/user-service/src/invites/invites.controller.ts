import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Invite } from '@prisma-gen/client';

import { InviteCreateDto } from './dto/invite-create.dto';
import { InvitesService } from './invites.service';
import { PaginatedResponseDto, PaginationDto } from '../common/dto/pagination.dto';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get()
  async getInvites(@Query() pagination: PaginationDto): Promise<PaginatedResponseDto<Invite>> {
    return this.invitesService.getWorkingInvites(pagination);
  }

  @Get(':token')
  async getInviteByToken(@Param('token') token: string): Promise<Invite|null> {
    return this.invitesService.getInviteByToken(token);
  }

  @Post()
  async createInvite(@Body() dto: InviteCreateDto): Promise<Invite> {
    return this.invitesService.createInvite(dto);
  }
}
