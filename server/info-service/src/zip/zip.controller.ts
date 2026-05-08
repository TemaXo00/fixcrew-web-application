import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Zip } from '@prisma-gen/client';

import { AssignRegionDto } from './dto/assign-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';
import { ZipService } from './zip.service';

@Controller('zip')
export class ZipController {
  constructor(private readonly zipService: ZipService) {}

  @Get('/region/:region_id')
  async getZipsByRegion(@Param('region_id') region_id: string): Promise<Zip[]> {
    return await this.zipService.getZipsByRegion(region_id)
  }

  @Get(':code')
  async getZipByCode(@Param('code', ParseIntPipe) code: number): Promise<Zip> {
    return this.zipService.getZipByCode(code)
  }

  @Post()
  async createZip(@Body() dto: CreateRegionDto): Promise<Zip> {
    return await this.zipService.createZip(dto);
  }

  @Patch(':code')
  async assignZipToNewRegion(@Param('code', ParseIntPipe) code: number, @Body() dto: AssignRegionDto): Promise<Zip> {
    return await this.zipService.assignZipToNewRegion(code, dto)
  }

  @Delete(':code')
  async deleteZip(@Param('code', ParseIntPipe) code: number): Promise<Zip> {
    return this.zipService.deleteZipByCode(code)
  }
}
