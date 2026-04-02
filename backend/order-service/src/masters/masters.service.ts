import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { knownMasters } from '@prisma-gen/client';

import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMasterDto } from './dto/create-master,dto';

@Injectable()
export class MastersService {
  constructor(private readonly prisma: PrismaService) {}

  async getMasters(
    dto: PaginationDto,
  ): Promise<PaginatedResponseDto<knownMasters>> {

    const [items, total] = await Promise.all([
      await this.prisma.knownMasters.findMany({
        skip: dto.skip,
        take: dto.take,
        orderBy: {
          created_at: 'desc'
        }
      }),
      await this.prisma.knownMasters.count()
    ])

    return new PaginatedResponseDto(items, total, dto)
  }

  async getMasterById(master_id: string): Promise<knownMasters> {
    const master = await this.prisma.knownMasters.findUnique({
      where: { master_id: master_id }
    })

    if (!master) {
      throw new NotFoundException('Master not found')
    }

    return master;
  }

  async createMaster(dto: CreateMasterDto): Promise<void> {
    const master = await this.prisma.knownMasters.findUnique(
      {
        where: {
          email: dto.email,
        }
      }
    )

    if (master) {
      throw new ConflictException('Master already exists')
    }

    await this.prisma.knownMasters.create({
      data: {
        master_id: dto.master_id,
        email: dto.email,
        phone_number: dto.phone_number
      }
    })
  }
}