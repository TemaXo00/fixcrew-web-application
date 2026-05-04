import {Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Tag } from '@prisma-gen/client';

import { ManipulateTagDto } from './dto/manipulate-tag.dto';
import { TagService } from './tag.service';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAllTags(@Query() pagination: PaginationDto): Promise<PaginatedResponseDto<Tag>> {
    return await this.tagService.getAllTags(pagination);
  }

  @Get(':id')
  async getTagById(@Param('id') id: string): Promise<Tag> {
    return await this.tagService.getTagById(id);
  }

  @Post()
  async createTag(@Body() dto: ManipulateTagDto): Promise<Tag> {
    return await this.tagService.createTag(dto)
  }

  @Put(':id')
  async updateTag(@Param('id') id: string, @Body() dto: ManipulateTagDto): Promise<Tag> {
    return await this.tagService.updateTagName(id, dto)
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: string): Promise<Tag> {
    return await this.tagService.deleteTag(id)
  }
}
