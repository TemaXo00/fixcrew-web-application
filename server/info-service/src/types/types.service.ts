import {
  NotFoundException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { Type } from '@prisma-gen/client';

import { PrismaService } from '../prisma/prisma.service';
import { TypeDto } from './dto/type.dto';

@Injectable()
export class TypesService {
  constructor(private readonly prisma: PrismaService) {}

  async getTypes(): Promise<Type[]> {
    return this.prisma.type.findMany({
      include: {
        categories: true,
      }
    });
  }

  async getTypeById(id: string): Promise<Type> {
    const existingType = await this.prisma.type.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });

    if (!existingType) {
      throw new NotFoundException('Type not found');
    }

    return existingType;
  }

  async createType(dto: TypeDto): Promise<Type> {
    const existingName = await this.prisma.type.findUnique({
      where: { name: dto.name },
    });

    if (existingName) {
      throw new ConflictException('Type with this name already exists');
    }

    return this.prisma.type.create({
      data: {
        name: dto.name,
      },
    });
  }

  async updateType(id: string, dto: TypeDto): Promise<Type> {
    await this.getTypeById(id);

    try {
      return await this.prisma.type.update({
        where: { id },
        data: { name: dto.name },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Type with this name already exists');
      }
      throw error;
    }
  }

  async deleteType(id: string): Promise<Type> {
    await this.getTypeById(id);

    return this.prisma.type.delete({
      where: {
        id,
      },
    });
  }
}
