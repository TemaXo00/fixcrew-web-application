import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { KnownMasters } from '@prisma-gen/client';

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
  ): Promise<PaginatedResponseDto<KnownMasters>> {
    const [items, total] = await Promise.all([
      await this.prisma.knownMasters.findMany({
        skip: dto.skip,
        take: dto.take,
        orderBy: {
          created_at: 'desc',
        },
      }),
      await this.prisma.knownMasters.count(),
    ]);

    return new PaginatedResponseDto(items, total, dto);
  }

  async getMasterById(master_id: string): Promise<KnownMasters> {
    const master = await this.prisma.knownMasters.findUnique({
      where: {
        master_id: master_id,
      },
      include: {
        schedules: true,
        regions: true,
        orders: {
          take: 10,
          orderBy: {
            created_at: 'desc'
          }
        }
      },
    });

    if (!master) {
      throw new NotFoundException('Master not found');
    }

    return master;
  }

  async createMaster(dto: CreateMasterDto): Promise<void> {
    const master = await this.prisma.knownMasters.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (master) {
      throw new ConflictException('Master already exists');
    }

    await this.prisma.knownMasters.create({
      data: {
        master_id: dto.master_id,
        email: dto.email,
        phone_number: dto.phone_number,
      },
    });
  }

  async deleteMaster(master_id: string): Promise<void> {
    await this.getMasterById(master_id);

    await this.prisma.knownMasters.delete({
      where: {
        master_id: master_id,
      },
    });
  }

  async setRegions(
    master_id: string,
    region_ids: string[],
  ): Promise<KnownMasters> {
    await this.getMasterById(master_id);

    const regions = await this.prisma.region.findMany({
      where: {
        id: {
          in: region_ids,
        },
      },
    });

    if (regions.length !== region_ids.length) {
      throw new NotFoundException('Some regions not found');
    }

    return this.prisma.knownMasters.update({
      where: { id: master_id },
      data: {
        regions: {
          set: region_ids.map((id) => ({ id })),
        },
      },
      include: {
        regions: true,
      },
    });
  }

  async addRegions(
    master_id: string,
    region_ids: string[],
  ): Promise<KnownMasters> {
    await this.getMasterById(master_id);

    const regions = await this.prisma.region.findMany({
      where: {
        id: {
          in: region_ids,
        },
      },
    });

    if (regions.length !== region_ids.length) {
      throw new NotFoundException('Some regions not found');
    }

    return this.prisma.knownMasters.update({
      where: { id: master_id },
      data: {
        regions: {
          connect: region_ids.map((id) => ({ id })),
        },
      },
      include: {
        regions: true,
      },
    });
  }

  async removeRegion(
    master_id: string,
    region_id: string,
  ): Promise<KnownMasters> {
    await this.getMasterById(master_id);

    const region = await this.prisma.region.findUnique({
      where: {
        id: region_id,
      },
    });

    if (!region) {
      throw new NotFoundException('Region not found');
    }

    return this.prisma.knownMasters.update({
      where: { id: master_id },
      data: {
        regions: {
          disconnect: { id: region_id },
        },
      },
      include: {
        regions: true,
      },
    });
  }
}
