import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Service } from '@prisma-gen/client';
import slugify from 'slugify';

import { CategoriesService } from '../categories/categories.service';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateCoverDto } from './dto/update-cover.dto';
import { UpdateDescriptionDto } from './dto/update-description.dto';
import { UpdateNameDto } from './dto/update-name.dto';

@Injectable()
export class ServicesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categories: CategoriesService,
  ) {}

  async getServices(
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Service>> {
    const [items, total] = await Promise.all([
      this.prisma.service.findMany({
        skip: pagination.skip,
        take: pagination.take,
        include: {
          category: {
            include: {
              type: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.service.count(),
    ]);

    return new PaginatedResponseDto(items, total, pagination);
  }

  async getActiveServices(): Promise<Service[]> {
    return this.prisma.service.findMany({
      where: { is_active: true },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
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

  async getBySlug(slug: string): Promise<Service> {
    const existingService = await this.prisma.service.findUnique({
      where: { slug },
    })

    if (!existingService) {
      throw new NotFoundException('Service not found');
    }

    if (!existingService.is_active) {
      throw new NotFoundException('Service not active');
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
        slug: slugify(dto.name, {lower: true}),
        cover_id: dto.cover_id,
        description: dto.description,
        avg_time: dto.avg_time,
        is_active: dto.is_active ?? true,
        category_id: dto.category_id,
      },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
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
      data: { name: dto.name, slug: slugify(dto.name, {lower: true}), },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
    });
  }

  async updateDescription(
    id: string,
    dto: UpdateDescriptionDto,
  ): Promise<Service> {
    await this.getById(id);

    return this.prisma.service.update({
      where: { id },
      data: { description: dto.description },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
    });
  }

  async updateCover(id: string, dto: UpdateCoverDto): Promise<Service> {
    await this.getById(id)

    return this.prisma.service.update({
      where: { id },
      data: {
        cover_id: dto.cover_id,
      },
      include: {
        category: {
          include: {
            type: true,
          }
        }
      }
    })
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Service> {
    await this.getById(id);
    await this.categories.getById(dto.category_id);

    return this.prisma.service.update({
      where: { id },
      data: { category_id: dto.category_id },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
    });
  }

  async toggleActive(id: string): Promise<Service> {
    const service = await this.getById(id);

    return this.prisma.service.update({
      where: { id },
      data: { is_active: !service.is_active },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
    });
  }

  async deleteService(id: string): Promise<Service> {
    await this.getById(id);

    return this.prisma.service.delete({
      where: { id },
      include: {
        category: {
          include: {
            type: true,
          },
        },
      },
    });
  }
}
