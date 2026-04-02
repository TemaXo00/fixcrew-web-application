import { Controller, Get, Param, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { knownMasters } from '@prisma-gen/client';

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

  @Get()
  async getAllMasters(@Query() pagination: PaginationDto): Promise<PaginatedResponseDto<knownMasters>> {
    return await this.mastersService.getMasters(pagination);
  }

  @Get(':id')
  async getMasterById(@Param("id")master_id: string):Promise<knownMasters> {
    return await this.mastersService.getMasterById(master_id);
  }
}
