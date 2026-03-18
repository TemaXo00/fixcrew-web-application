import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Invite } from '@prisma-gen/client';

import { InviteCreateDto } from './dto/invite-create.dto';
import { InvitesService } from './invites.service';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get(':token')
  async getInviteByToken(@Param('token') token: string): Promise<Invite|null> {
    return this.invitesService.getInviteByToken(token);
  }

  @Post()
  async createInvite(@Body() dto: InviteCreateDto): Promise<Invite> {
    return this.invitesService.createInvite(dto);
  }

  @Patch('use/:token')
  useToken(@Param('token') token: string): Promise<Invite> {
    return this.invitesService.useInvite(token);
  }

  @Patch(':token')
  async revokeInvite(@Param('token') token: string): Promise<Invite> {
    return this.invitesService.revokeInvite(token);
  }
}
