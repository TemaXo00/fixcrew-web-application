import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KnownMasters } from '@prisma-gen/client';

import { CreateMasterDto } from './dto/create-master,dto';
import { SetRegionsDto } from './dto/set-regions.dto';
import { MastersService } from './masters.service';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';

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

  @Patch(':id/regions')
  async setRegions(
    @Param('id') master_id: string,
    @Body() dto: SetRegionsDto,
  ): Promise<KnownMasters> {
    return await this.mastersService.setRegions(master_id, dto.region_ids);
  }

  @Post(':id/regions')
  async addRegions(
    @Param('id') master_id: string,
    @Body() dto: SetRegionsDto,
  ): Promise<KnownMasters> {
    return await this.mastersService.addRegions(master_id, dto.region_ids);
  }

  @Delete(':id/regions/:regionId')
  async removeRegion(
    @Param('id') master_id: string,
    @Param('regionId') regionId: string,
  ): Promise<KnownMasters> {
    return await this.mastersService.removeRegion(master_id, regionId);
  }
}
