import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Region } from '@prisma-gen/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

@Injectable()
export class RegionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('ORDER_SERVICE') private readonly order: ClientProxy
  ) {}

  async getAll(): Promise<Region[]> {
    return this.prisma.region.findMany()
  }

  async createRegion(dto: CreateRegionDto): Promise<Region> {
    const existingRegion = await this.prisma.region.findUnique({
      where: {
        name: dto.name,
      }
    })

    if (existingRegion) {
      throw new ConflictException('Region already exists')
    }

    const newRegion = await this.prisma.region.create({
      data: {
        name: dto.name,
        avg_response: dto.avg_response,
      }
    })

    this.order.emit('region.created',
      {
        region_id: newRegion.id,
        name: newRegion.name
      })

    return newRegion
  }

  async updateRegion(id: string, dto: UpdateRegionDto): Promise<Region> {
    await this.getRegionById(id);

    return this.prisma.region.update({
      where: {
        id
      },
      data: {
        avg_response: dto.avg_response,
      }
    })
  }

  async deleteRegion(id: string): Promise<Region> {
    await this.getRegionById(id)

    const removedRegion = await this.prisma.region.delete({
      where: {id}
    })

    this.order.emit('region.deleted', {
      region_id: removedRegion.id
    })

    return removedRegion
  }

  async getRegionById(id: string): Promise<Region> {
    const region = await this.prisma.region.findUnique({
      where: {
        id: id
      }
    })

    if (!region) {
      throw new NotFoundException('Region not found')
    }

    return region
  }
}
