import { InjectQueue } from '@nestjs/bull';
import {
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Statuses } from '@prisma-gen/client';

import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateDateDto } from './dto/update-date.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CalendarInterface } from './interfaces/calendar.interface';

import type { Order, KnownMasters } from '@prisma-gen/client';
import type { Queue } from 'bull';

type MasterWithRelations = KnownMasters & {
  schedules: { dayOfWeek: number; startMin: number; endMin: number }[];
  regions: { id: string }[];
};

type OrderWithMaster = Order & {
  master: KnownMasters | null;
};

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('MAIL_SERVICE') private readonly mailClient: ClientProxy,
    @InjectQueue('order-notifications')
    private readonly notificationQueue: Queue,
  ) {}

  async getAllOrders(
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Order>> {
    const { search, dateFrom, dateTo, sortBy, sortOrder } = pagination;

    const where: {
      OR?: { name?: object; phone?: object; email?: object }[];
      date?: { gte?: string; lte?: string };
    } = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) {
        where.date.gte = dateFrom;
      }
      if (dateTo) {
        where.date.lte = dateTo;
      }
    }

    const orderBy: Record<string, 'asc' | 'desc' | { name: 'asc' | 'desc' }> =
      {};
    if (sortBy && sortOrder) {
      if (sortBy === 'region') {
        orderBy.region = { name: sortOrder };
      } else {
        orderBy[sortBy] = sortOrder;
      }
    } else {
      orderBy.created_at = 'desc';
    }

    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy,
        include: { region: true, master: true },
      }),
      this.prisma.order.count({ where }),
    ]);

    return new PaginatedResponseDto(items, total, pagination);
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { region: true, master: true },
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async getPendingOrdersByMaster(
    master_id: string,
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<CalendarInterface>> {
    const { search, dateFrom, dateTo, sortBy, sortOrder } = pagination;

    const where: {
      master_id: string;
      status: 'PENDING';
      OR?: { name?: object; phone?: object; email?: object }[];
      date?: { gte?: string; lte?: string };
    } = {
      master_id,
      status: 'PENDING',
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (dateFrom || dateTo) {
      where.date = {};
      if (dateFrom) {
        where.date.gte = dateFrom;
      }
      if (dateTo) {
        where.date.lte = dateTo;
      }
    }

    const orderBy: Record<string, 'asc' | 'desc'> = {};
    if (sortBy && sortOrder) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.date = 'asc';
    }

    const [items, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy,
      }),
      this.prisma.order.count({ where }),
    ]);

    const calendarItems = items.map((order) => this.parseDataToCalendar(order));

    return new PaginatedResponseDto(calendarItems, total, pagination);
  }

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    if (dto.photo_ids.length > 5) {
      throw new BadRequestException('Max 5 photos allowed');
    }

    return this.prisma.order.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        address: dto.address,
        message: dto.message,
        region_id: dto.region_id,
        photo_ids: dto.photo_ids,
        status: Statuses.CREATED,
      },
    });
  }

  async updateOrder(id: string, dto: UpdateOrderDto): Promise<Order> {
    const order = await this.getOrderById(id);
    if (order.status !== Statuses.CREATED) {
      throw new BadRequestException('Order already processed');
    }

    const duration = dto.endMin - dto.startMin;
    if (duration <= 0) {
      throw new BadRequestException('endMin must be greater than startMin');
    }

    const master = await this.prisma.knownMasters.findUnique({
      where: { master_id: dto.master_id },
      include: { regions: true, schedules: true },
    });
    if (!master) {
      throw new NotFoundException('Master not found');
    }

    await this.validateMasterAvailability(
      master as MasterWithRelations,
      dto.date,
      dto.startMin,
      dto.endMin,
      order.region_id,
    );

    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: {
        date: dto.date,
        startMin: dto.startMin,
        endMin: dto.endMin,
        duration,
        master_id: master.id,
        status: Statuses.PENDING,
      },
      include: { master: true, region: true },
    });

    await this.sendOrderPendingNotification(updatedOrder as OrderWithMaster);
    await this.scheduleReminder(updatedOrder);

    return updatedOrder;
  }

  async updateStatus(id: string, status: Statuses): Promise<Order> {
    await this.getOrderById(id);
    const updated = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: { master: true },
    });
    await this.sendStatusNotification(updated);
    return updated;
  }

  async updateDate(id: string, dto: UpdateDateDto): Promise<Order> {
    const order = await this.getOrderById(id);
    if (!order.master_id) {
      throw new BadRequestException('Master not assigned yet');
    }
    if (
      order.date === null ||
      order.startMin === null ||
      order.endMin === null ||
      order.region_id === null
    ) {
      throw new BadRequestException('Order date, time or region not set');
    }

    const duration = dto.endMin - dto.startMin;
    if (duration <= 0) {
      throw new BadRequestException('endMin must be greater than startMin');
    }

    const master = await this.prisma.knownMasters.findUnique({
      where: { id: order.master_id },
      include: { schedules: true },
    });
    if (!master) {
      throw new NotFoundException('Master not found');
    }

    await this.validateMasterAvailability(
      { ...master, regions: [] } as MasterWithRelations,
      dto.date,
      dto.startMin,
      dto.endMin,
      order.region_id,
      id,
    );

    const updated = await this.prisma.order.update({
      where: { id },
      data: {
        date: dto.date,
        startMin: dto.startMin,
        endMin: dto.endMin,
        duration,
      },
      include: { master: true },
    });

    await this.sendDateChangeNotification(updated as OrderWithMaster);
    if (order.reminder_job_id) {
      await this.rescheduleReminder(updated, order.reminder_job_id);
    } else {
      await this.scheduleReminder(updated);
    }

    return updated;
  }

  async updateMaster(id: string, newMasterId: string): Promise<Order> {
    const order = await this.getOrderById(id);
    if (
      !order.date ||
      order.startMin === null ||
      order.endMin === null ||
      order.region_id === null
    ) {
      throw new BadRequestException('Order date, time or region not set');
    }

    const oldMasterId = order.master_id;
    const newMaster = await this.prisma.knownMasters.findUnique({
      where: { master_id: newMasterId },
      include: { regions: true, schedules: true },
    });
    if (!newMaster) {
      throw new NotFoundException('Master not found');
    }

    await this.validateMasterAvailability(
      newMaster as MasterWithRelations,
      order.date,
      order.startMin,
      order.endMin,
      order.region_id,
      id,
    );

    const updated = await this.prisma.order.update({
      where: { id },
      data: { master_id: newMaster.id },
      include: { master: true },
    });

    if (oldMasterId) {
      const oldMaster = await this.prisma.knownMasters.findUnique({
        where: { id: oldMasterId },
      });
      if (oldMaster) {
        await this.sendMasterReplacedNotification(
          oldMaster,
          updated as OrderWithMaster,
        );
      }
    }
    await this.sendOrderPendingNotification(updated as OrderWithMaster);

    return updated;
  }

  async updatePrice(id: string, price: number): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { price },
    });
  }

  private async validateMasterAvailability(
    master: MasterWithRelations,
    date: string,
    startMin: number,
    endMin: number,
    regionId: string | null,
    excludeOrderId?: string,
  ): Promise<void> {
    if (!regionId) {
      throw new BadRequestException('Region not set');
    }

    const dayOfWeek = new Date(date).getDay();
    const schedule = master.schedules.find((s) => s.dayOfWeek === dayOfWeek);
    if (!schedule) {
      throw new BadRequestException('Master does not work on this day');
    }
    if (startMin < schedule.startMin || endMin > schedule.endMin) {
      throw new BadRequestException('Time outside master working hours');
    }

    const regionIds = master.regions.map((r) => r.id);
    if (!regionIds.includes(regionId)) {
      throw new BadRequestException('Master does not serve this region');
    }

    const conflictingOrder = await this.prisma.order.findFirst({
      where: {
        master_id: master.id,
        date,
        id: { not: excludeOrderId },
        AND: [{ startMin: { lt: endMin } }, { endMin: { gt: startMin } }],
      },
    });
    if (conflictingOrder) {
      throw new ConflictException('Master already booked at this time');
    }
  }

  private async sendOrderPendingNotification(
    order: OrderWithMaster,
  ): Promise<void> {
    if (
      !order.master ||
      order.date === null ||
      order.startMin === null ||
      order.endMin === null
    ) {
      return;
    }
    const startTime = this.minutesToTime(order.startMin);
    const endTime = this.minutesToTime(order.endMin);

    this.mailClient.emit('order.pending', {
      id: order.id,
      name: order.master.name,
      email: order.email,
      date: order.date,
      time: `${startTime} - ${endTime}`,
    });

    if (order.email) {
      this.mailClient.emit('order.pending', {
        id: order.id,
        name: order.master.name,
        email: order.email,
        date: order.date,
        time: `${startTime} - ${endTime}`,
      });
    }
  }

  private async sendMasterReplacedNotification(
    oldMaster: KnownMasters,
    order: Order,
  ): Promise<void> {
    this.mailClient.emit('order.master', {
      id: order.id,
      email: oldMaster.email,
    });
  }

  private async sendDateChangeNotification(
    order: OrderWithMaster,
  ): Promise<void> {
    if (
      order.date === null ||
      order.startMin === null ||
      order.endMin === null
    ) {
      return;
    }
    const startTime = this.minutesToTime(order.startMin);
    const endTime = this.minutesToTime(order.endMin);
    const message = { date: order.date, time: `${startTime} - ${endTime}` };

    if (order.master?.email) {
      this.mailClient.emit('order.date', {
        name: order.master.name,
        email: order.master.email,
        ...message,
      });
    }
    if (order.email) {
      this.mailClient.emit('order.date', {
        name: order.name,
        email: order.email,
        ...message,
      });
    }
  }

  private async scheduleReminder(order: Order): Promise<void> {
    if (!order.email || !order.date || order.startMin === null) {
      return;
    }
    const orderDate = new Date(order.date);
    const reminderDate = new Date(orderDate);
    reminderDate.setDate(orderDate.getDate() - 1);
    const delay = reminderDate.getTime() - Date.now();
    if (delay <= 0) {
      return;
    }

    const job = await this.notificationQueue.add(
      'send-day-before-reminder',
      {
        orderId: order.id,
        name: order.name,
        email: order.email,
        date: order.date,
        time: this.minutesToTime(order.startMin),
      },
      { delay },
    );
    await this.prisma.order.update({
      where: { id: order.id },
      data: { reminder_job_id: String(job.id) },
    });
  }

  private async rescheduleReminder(
    order: Order,
    oldJobId: string,
  ): Promise<void> {
    await this.notificationQueue.removeJobs(oldJobId);
    await this.scheduleReminder(order);
  }

  private async sendStatusNotification(order: Order): Promise<void> {
    if (order.email) {
      this.mailClient.emit('order.status', {
        email: order.email,
        status: order.status,
      });
    }
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:00`;
  }

  private parseDataToCalendar(order: Order): CalendarInterface {
    if (order.startMin === null || order.endMin === null) {
      throw new BadRequestException('Start or end min are not assigned');
    }

    const start = this.minutesToTime(order.startMin);
    const end = this.minutesToTime(order.endMin);

    return {
      id: order.id,
      client_name: order.name,
      client_email: order.email ? order.email : undefined,
      client_phone: order.phone,
      start: `${order.date}T${start}`,
      end: `${order.date}T${end}`,
    };
  }
}
