import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Region } from '@prisma-gen/client';

import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  async getAllRegions(): Promise<Region[]> {
    return await this.regionsService.getAll()
  }

  @Post()
  async create(@Body() dto: CreateRegionDto): Promise<Region> {
    return await this.regionsService.createRegion(dto);
  }

  @Patch(':id')
  async updateRegion(@Param('id') id: string, @Body() dto: UpdateRegionDto): Promise<Region> {
    return await this.regionsService.updateRegion(id, dto);
  }

  @Delete(':id')
  async deleteRegion(@Param('id') id: string): Promise<Region> {
    return await this.regionsService.deleteRegion(id);
  }
}
