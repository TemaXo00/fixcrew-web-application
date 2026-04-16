import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma-gen/client';

import { PrismaService } from '../prisma/prisma.service';
import { TypesService } from '../types/types.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';
import { UpdateCategoryTypeDto } from './dto/update-category-type.dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly types: TypesService,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        services: true,
        type: true
      }
    });
  }

  async getCategoriesByType(type_id: string): Promise<Category[]> {
    await this.types.getTypeById(type_id);

    return this.prisma.category.findMany({
      where: { type_id },
      include: {
        services: true,
        type: true
      },
    });
  }

  async getById(id: string): Promise<Category> {
    const existingCategory = await this.prisma.category.findUnique({
      where: { id },
      include: {
        type: true,
        services: true,
      },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category not found`);
    }

    return existingCategory;
  }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    await this.types.getTypeById(dto.type_id);

    const existingName = await this.prisma.category.findFirst({
      where: {
        name: dto.name,
        type_id: dto.type_id,
      },
    });

    if (existingName) {
      throw new ConflictException(`Category already exists`);
    }

    return this.prisma.category.create({
      data: {
        name: dto.name,
        type_id: dto.type_id,
      },
    });
  }

  async updateCategoryType(
    id: string,
    dto: UpdateCategoryTypeDto,
  ): Promise<Category> {
    const category = await this.getById(id);
    await this.types.getTypeById(dto.type_id);

    const existingCategory = await this.prisma.category.findFirst({
      where: {
        name: category.name,
        type_id: dto.type_id,
      },
    });

    if (existingCategory) {
      throw new ConflictException(
        `Category with name "${category.name}" already exists in target type`,
      );
    }

    return this.prisma.category.update({
      where: { id },
      data: { type_id: dto.type_id },
      include: {
        services: true,
        type: true,
      }
    });
  }

  async updateCategoryName(
    id: string,
    dto: UpdateCategoryNameDto,
  ): Promise<Category> {
    const category = await this.getById(id);

    const existingName = await this.prisma.category.findFirst({
      where: {
        name: dto.name,
        type_id: category.type_id,
        id: { not: id },
      },
    });

    if (existingName) {
      throw new ConflictException(`Category already exists in this type`);
    }

    return this.prisma.category.update({
      data: {
        name: dto.name,
      },
      where: {
        id,
      },
    });
  }

  async deleteCategory(id: string): Promise<Category> {
    await this.getById(id);

    return this.prisma.category.delete({
      where: {
        id,
      },
    });
  }
}
