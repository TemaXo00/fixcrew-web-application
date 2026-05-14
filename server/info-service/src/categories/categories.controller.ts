import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Category } from '@prisma-gen/client';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryNameDto } from './dto/update-category-name.dto';
import { UpdateCategoryTypeDto } from './dto/update-category-type.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getCategories(@Query('type_id') type_id?: string): Promise<Category[]> {
    if (type_id) {
      return this.categoriesService.getCategoriesByType(type_id);
    }
    return this.categoriesService.getCategories();
  }

  @Get(':id')
  async getCategoryById(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.getById(id)
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(dto);
  }

  @Put(':id/type')
  async updateCategoryType(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryTypeDto,
  ): Promise<Category> {
    return this.categoriesService.updateCategoryType(id, dto);
  }

  @Patch(':id/name')
  async updateCategoryName(
    @Param('id') id: string,
    @Body() dto: UpdateCategoryNameDto,
  ): Promise<Category> {
    return this.categoriesService.updateCategoryName(id, dto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.deleteCategory(id);
  }
}
