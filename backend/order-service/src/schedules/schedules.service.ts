import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { MastersSchedule } from '@prisma-gen/client';

import { ScheduleCalendarDto } from './dto/schedule-calendar.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SetScheduleDto } from './dto/set-schedule.dto';

@Injectable()
export class SchedulesService {
  constructor(private readonly prisma: PrismaService) {}

  async setSchedule(
    master_id: string,
    dto: SetScheduleDto,
  ): Promise<MastersSchedule[]> {
    const master = await this.prisma.knownMasters.findUnique({
      where: { master_id },
    });
    if (!master) {
      throw new NotFoundException('Master not found');
    }

    for (const s of dto.schedules) {
      if (s.startMin >= s.endMin) {
        throw new BadRequestException('startMin must be less than endMin');
      }
    }

    await this.prisma.mastersSchedule.deleteMany({
      where: { master_id: master.id },
    });

    return this.prisma.mastersSchedule.createManyAndReturn({
      data: dto.schedules.map((s) => ({
        master_id: master.id,
        dayOfWeek: s.dayOfWeek,
        startMin: s.startMin,
        endMin: s.endMin,
      })),
    });
  }

  async addSchedule(
    master_id: string,
    dto: SetScheduleDto,
  ): Promise<MastersSchedule[]> {
    const master = await this.prisma.knownMasters.findUnique({
      where: { master_id },
    });
    if (!master) {
      throw new NotFoundException('Master not found');
    }

    const existing = await this.prisma.mastersSchedule.findMany({
      where: { master_id: master.id },
    });

    for (const s of dto.schedules) {
      if (s.startMin >= s.endMin) {
        throw new BadRequestException('startMin must be less than endMin');
      }

      const conflict = existing.find(
        (e) =>
          e.dayOfWeek === s.dayOfWeek &&
          s.startMin < e.endMin &&
          e.startMin < s.endMin,
      );
      if (conflict) {
        throw new BadRequestException('Schedule conflict detected');
      }
    }

    return this.prisma.mastersSchedule.createManyAndReturn({
      data: dto.schedules.map((s) => ({
        master_id: master.id,
        dayOfWeek: s.dayOfWeek,
        startMin: s.startMin,
        endMin: s.endMin,
      })),
    });
  }

  async removeSchedule(master_id: string, dayOfWeek: number): Promise<void> {
    const master = await this.prisma.knownMasters.findUnique({
      where: { master_id },
    });
    if (!master) {
      throw new NotFoundException('Master not found');
    }

    const deleted = await this.prisma.mastersSchedule.deleteMany({
      where: { master_id: master.id, dayOfWeek },
    });
    if (deleted.count === 0) {
      throw new NotFoundException('Schedule not found');
    }
  }

  async getSchedule(master_id: string): Promise<MastersSchedule[]> {
    const master = await this.prisma.knownMasters.findUnique({
      where: { master_id },
    });
    if (!master) {
      throw new NotFoundException('Master not found');
    }

    return this.prisma.mastersSchedule.findMany({
      where: { master_id: master.id },
      orderBy: { dayOfWeek: 'asc' },
    });
  }

  async getScheduleForCalendar(master_id: string): Promise<ScheduleCalendarDto[]> {
    const schedule = await this.getSchedule(master_id);

    return schedule.map((s) => ({
      daysOfWeek: [s.dayOfWeek % 7],
      startTime: this.minutesToTime(s.startMin),
      endTime: this.minutesToTime(s.endMin),
    }));
  }

  private minutesToTime(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  }
}
