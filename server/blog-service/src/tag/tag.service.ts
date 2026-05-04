import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Tag } from '@prisma-gen/client';

import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ManipulateTagDto } from './dto/manipulate-tag.dto';

@Injectable()
export class TagService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTags(pagination: PaginationDto): Promise<PaginatedResponseDto<Tag>> {
    const [items, total] = await Promise.all([
      this.prisma.tag.findMany({
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prisma.tag.count()
    ]);

    return new PaginatedResponseDto(items, total, pagination);
  }

  async getTagById(id: string): Promise<Tag> {
    const tag = await this.prisma.tag.findUnique({
      where: {
        id
      },
      include: {
        articles: {
          take: 10,
          orderBy: {
            views_count: 'desc'
          }
        }
      }
    })

    if (!tag) {
      throw new NotFoundException(`Tag with id ${id} not found`);
    }

    return tag
  }

  async createTag(dto: ManipulateTagDto): Promise<Tag> {
    await this.getTagByName(dto.name)

    return this.prisma.tag.create({
      data: {
        name: dto.name,
      }
    })
  }

  async updateTagName(id: string, dto: ManipulateTagDto): Promise<Tag> {
    await this.getTagById(id)
    await this.getTagByName(dto.name)

    return this.prisma.tag.update({
      where: {
        id
      },
      data: {
        name: dto.name,
      }
    })
  }

  async deleteTag(id: string): Promise<Tag> {
    await this.getTagById(id)

    return this.prisma.tag.delete({
      where: {
        id
      }
    })
  }

  private async getTagByName(name: string): Promise<void> {
    const existingName = await this.prisma.tag.findUnique({
      where: { name: name },
    })

    if (existingName) {
      throw new ConflictException('Tag with this name already exists');
    }
  }
}
