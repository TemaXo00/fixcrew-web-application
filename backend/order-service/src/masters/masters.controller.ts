import { Controller, Get, Param, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KnownMasters } from '@prisma-gen/client';

import { CreateMasterDto } from './dto/create-master,dto';
import { MastersService } from './masters.service';
import { PaginatedResponseDto, PaginationDto } from '../common/dto/pagination.dto';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @MessagePattern('user.created')
  async createMaster(@Payload() data: CreateMasterDto): Promise<void> {
    await this.mastersService.createMaster(data);
  }

  @MessagePattern('user.deleted')
  async removeMaster(@Payload() master_id: string): Promise<void> {
    return await this.mastersService.deleteMaster(master_id);
  }

  @Get()
  async getAllMasters(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<KnownMasters>> {
    return await this.mastersService.getMasters(pagination);
  }

  @Get(':id')
  async getMasterById(@Param('id') master_id: string): Promise<KnownMasters> {
    return await this.mastersService.getMasterById(master_id);
  }
}
