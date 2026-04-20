import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Type } from '@prisma-gen/client';

import { TypeDto } from './dto/type.dto';
import { TypesService } from './types.service';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Get()
  async getAll(): Promise<Type[]> {
    return await this.typesService.getTypes();
  }

  @Post()
  async createType(@Body() dto: TypeDto): Promise<Type> {
    return await this.typesService.createType(dto);
  }

  @Put(':id')
  async updateType(
    @Param('id') id: string,
    @Body() dto: TypeDto,
  ): Promise<Type> {
    return await this.typesService.updateType(id, dto);
  }

  @Delete(':id')
  async deleteType(@Param('id') id: string): Promise<Type> {
    return await this.typesService.deleteType(id);
  }
}
