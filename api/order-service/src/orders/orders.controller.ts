import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Order } from '@prisma-gen/client';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { UpdateMasterDto } from './dto/update-master.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CalendarInterface } from './interfaces/calendar.interface';
import { OrdersService } from './orders.service';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getAllOrders(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Order>> {
    return this.ordersService.getAllOrders(pagination);
  }

  @Get('master/:master_id/pending')
  async getPendingOrdersByMaster(
    @Param('master_id') master_id: string,
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<CalendarInterface>> {
    return this.ordersService.getPendingOrdersByMaster(master_id, pagination);
  }

  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<Order> {
    return this.ordersService.getOrderById(id);
  }

  @Post()
  async createOrder(@Body() dto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(dto);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.updateOrder(id, dto);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
  ): Promise<Order> {
    return this.ordersService.updateStatus(id, dto.status);
  }

  @Patch(':id/date')
  async updateDate(
    @Param('id') id: string,
    @Body() dto: UpdateDateDto,
  ): Promise<Order> {
    return this.ordersService.updateDate(id, dto);
  }

  @Patch(':id/master')
  async updateMaster(
    @Param('id') id: string,
    @Body() dto: UpdateMasterDto,
  ): Promise<Order> {
    return this.ordersService.updateMaster(id, dto.master_id);
  }

  @Patch(':id/price')
  async updatePrice(
    @Param('id') id: string,
    @Body() dto: UpdatePriceDto,
  ): Promise<Order> {
    return this.ordersService.updatePrice(id, dto.price);
  }
}
