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
import { Service } from '@prisma-gen/client';

import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCoverDto } from './dto/update-cover.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { ServicesService } from './services.service';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async getServices(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Service>> {
    return this.servicesService.getServices(pagination);
  }

  @Get('active')
  async getActiveServices(): Promise<Service[]> {
    return await this.servicesService.getActiveServices();
  }

  @Get(':slug')
  async getServiceBySlug(@Param('slug') slug: string): Promise<Service> {
    return await this.servicesService.getBySlug(slug)
  }

  @Post()
  async createService(@Body() dto: CreateServiceDto): Promise<Service> {
    return await this.servicesService.createService(dto);
  }

  @Patch(':id/name')
  async updateName(
    @Param('id') id: string,
    @Body() dto: UpdateNameDto,
  ): Promise<Service> {
    return await this.servicesService.updateName(id, dto);
  }

  @Patch(':id/description')
  async updateDescription(
    @Param('id') id: string,
    @Body() dto: UpdateDescriptionDto,
  ): Promise<Service> {
    return await this.servicesService.updateDescription(id, dto);
  }

  @Patch(':id/cover')
  async updateCover(
    @Param('id') id: string,
    @Body() dto: UpdateCoverDto,
  ): Promise<Service> {
    return await this.servicesService.updateCover(id, dto);
  }

  @Patch(':id/category')
  async updateCategory(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<Service> {
    return await this.servicesService.updateCategory(id, dto);
  }

  @Patch(':id/toggle')
  async toggleActive(@Param('id') id: string): Promise<Service> {
    return await this.servicesService.toggleActive(id);
  }

  @Delete(':id')
  async deleteService(@Param('id') id: string): Promise<Service> {
    return await this.servicesService.deleteService(id);
  }
}
