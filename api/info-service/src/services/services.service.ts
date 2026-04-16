import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Service } from '@prisma-gen/client';

import { CategoriesService } from '../categories/categories.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { UpdateNameDto } from './dto/update-name.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateSalePercentDto } from './dto/update-sale-percent.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categories: CategoriesService,
  ) {}

  async getServices(): Promise<Service[]> {
    return this.prisma.service.findMany();
  }

  async getServicesByCategory(category_id: string): Promise<Service[]> {
    await this.categories.getById(category_id);

    return this.prisma.service.findMany({
      where: { category_id },
    });
  }

  async getActiveServices(): Promise<Service[]> {
    return this.prisma.service.findMany({
      where: { is_active: true },
    });
  }

  async getById(id: string): Promise<Service> {
    const existingService = await this.prisma.service.findUnique({
      where: { id },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
    });

    if (!existingService) {
      throw new NotFoundException('Service not found');
    }

    return existingService;
  }

  async createService(dto: CreateServiceDto): Promise<Service> {
    await this.categories.getById(dto.category_id);

    const existingName = await this.prisma.service.findUnique({
      where: { name: dto.name },
    });

    if (existingName) {
      throw new ConflictException('Service with this name already exists');
    }

    return this.prisma.service.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        sale_percent: dto.sale_percent ?? 0,
        avg_time: dto.avg_time,
        is_active: dto.is_active ?? true,
        category_id: dto.category_id,
      },
    });
  }

  async updatePrice(id: string, dto: UpdatePriceDto): Promise<Service> {
    await this.getById(id);

    return this.prisma.service.update({
      where: { id },
      data: { price: dto.price },
    });
  }

  async updateName(id: string, dto: UpdateNameDto): Promise<Service> {
    await this.getById(id);

    const existingName = await this.prisma.service.findFirst({
      where: {
        name: dto.name,
        id: { not: id },
      },
    });

    if (existingName) {
      throw new ConflictException('Service with this name already exists');
    }

    return this.prisma.service.update({
      where: { id },
      data: { name: dto.name },
    });
  }

  async updateDescription(id: string, dto: UpdateDescriptionDto): Promise<Service> {
    await this.getById(id);

    return this.prisma.service.update({
      where: {
        id
      },
      data: { description: dto.description },
    })
  }

  async updateSalePercent(
    id: string,
    dto: UpdateSalePercentDto,
  ): Promise<Service> {
    await this.getById(id);

    return this.prisma.service.update({
      where: { id },
      data: { sale_percent: dto.sale_percent },
    });
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Service> {
    await this.getById(id);
    await this.categories.getById(dto.category_id);

    return this.prisma.service.update({
      where: { id },
      data: { category_id: dto.category_id },
    });
  }

  async toggleActive(id: string): Promise<Service> {
    const service = await this.getById(id);

    return this.prisma.service.update({
      where: { id },
      data: { is_active: !service.is_active },
    });
  }

  async deleteService(id: string): Promise<Service> {
    await this.getById(id);

    return this.prisma.service.delete({
      where: { id },
    });
  }
}
