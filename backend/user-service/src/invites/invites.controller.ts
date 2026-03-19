import {
  Body,
  Controller, Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Invite } from '@prisma-gen/client';

import { InviteCreateDto } from './dto/invite-create.dto';
import { InvitesService } from './invites.service';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Get()
  async getInvites(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Invite>> {
    return this.invitesService.getInvites(pagination);
  }

  @Get('stats')
  async getStats():Promise<object> {
    return await this.invitesService.getInvitesStats()
  }

  @Post()
  async createInvite(@Body() dto: InviteCreateDto): Promise<Invite> {
    return this.invitesService.createInvite(dto);
  }

  @Patch('use/:token')
  useToken(@Param('token') token: string): Promise<Invite> {
    return this.invitesService.useInvite(token);
  }

  @Patch('revoke/:token')
  async revokeInvite(@Param('token') token: string): Promise<Invite> {
    return this.invitesService.revokeInvite(token);
  }

  @Delete()
  async manuallyDelete(): Promise<void> {
    return await this.invitesService.manuallyDeleteExpiredInvites()
  }
}
