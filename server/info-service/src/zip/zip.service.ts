import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Zip } from '@prisma-gen/client';

import { PrismaService } from '../prisma/prisma.service';
import { RegionsService } from '../regions/regions.service';
import { AssignRegionDto } from './dto/assign-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';

@Injectable()
export class ZipService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly region: RegionsService,
  ) {}

  async getZipsByRegion(region_id: string): Promise<Zip[]> {
    await this.region.getRegionById(region_id);

    return this.prisma.zip.findMany({
      where: {
        region_id: region_id,
      },
    });
  }

  async getZipByCode(code: number): Promise<Zip> {
    const zip = await this.prisma.zip.findUnique({
      where: {
        code,
      },
      include: {
        region: true
      }
    });

    if (!zip) {
      throw new NotFoundException('Zip not found');
    }

    return zip;
  }

  async createZip(dto: CreateRegionDto): Promise<Zip> {
    await this.region.getRegionById(dto.region_id);

    const code = await this.prisma.zip.findUnique({
      where: {
        code: dto.code,
      },
    })

    if (code) {
      throw new ConflictException('This zip already exists');
    }

    return this.prisma.zip.create({
      data: {
        code: dto.code,
        region_id: dto.region_id,
      },
      include: {
        region: true,
      }
    })
  }

  async assignZipToNewRegion(code: number, dto: AssignRegionDto): Promise<Zip> {
    await this.region.getRegionById(dto.region_id);
    await this.getZipByCode(code)

    return this.prisma.zip.update({
      data: {
        region_id: dto.region_id
      },
      where: {
        code: code
      },
      include: {
        region: true,
      }
    })
  }

  async deleteZipByCode(code: number): Promise<Zip> {
    await this.getZipByCode(code)
    return this.prisma.zip.delete({
      where: {
        code
      },
      include: {
        region: true
      }
    })
  }
}
