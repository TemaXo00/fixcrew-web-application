import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class RegionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createRegion(dto: CreateRegionDto): Promise<void> {
    const existing = await this.prisma.region.findUnique({
      where: {
        region_id: dto.region_id,
        name: dto.name,
      }
    })

    if (existing) {
      return
    }

    await this.prisma.region.create({
      data: {
        region_id: dto.region_id,
        name: dto.name,
      }
    })
  }

  async removeRegion(region_id: string): Promise<void> {
    const existing = await this.prisma.region.findUnique({
      where: {
        region_id: region_id,
      }
    })

    if (!existing) {
      return
    }

    await this.prisma.region.delete({
      where: {
        region_id: region_id,
      }
    })
  }
}
