import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Invite, Roles as UserRoles } from '@prisma-gen/client';

import { InviteCreateDto } from './dto/invite-create.dto';
import { InvitesService } from './invites.service';
import { Authorization } from '../common/decorators/authorization.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @UseGuards(RolesGuard)
  @Authorization()
  @Roles(UserRoles.ADMIN)
  @Get()
  async getInvites(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Invite>> {
    return this.invitesService.getInvites(pagination);
  }

  @UseGuards(RolesGuard)
  @Authorization()
  @Roles(UserRoles.ADMIN)
  @Get('stats')
  async getStats(): Promise<object> {
    return await this.invitesService.getInvitesStats();
  }

  @UseGuards(RolesGuard)
  @Authorization()
  @Roles(UserRoles.ADMIN)
  @Post()
  async createInvite(@Body() dto: InviteCreateDto): Promise<Invite> {
    return this.invitesService.createInvite(dto);
  }

  @Patch('use/:token')
  useToken(@Param('token') token: string): Promise<Invite> {
    return this.invitesService.useInvite(token);
  }

  @UseGuards(RolesGuard)
  @Authorization()
  @Roles(UserRoles.ADMIN)
  @Patch('revoke/:token')
  async revokeInvite(@Param('token') token: string): Promise<Invite> {
    return this.invitesService.revokeInvite(token);
  }

  @UseGuards(RolesGuard)
  @Authorization()
  @Roles(UserRoles.ADMIN)
  @Delete()
  async manuallyDelete(): Promise<void> {
    return await this.invitesService.manuallyDeleteExpiredInvites();
  }
}
