import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Get,
} from '@nestjs/common';
import { MastersSchedule } from '@prisma-gen/client';

import { ScheduleCalendarDto } from './dto/schedule-calendar.dto';
import { SetScheduleDto } from './dto/set-schedule.dto';
import { SchedulesService } from './schedules.service';

@Controller('masters/:id/schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Patch()
  async setSchedule(
    @Param('id') master_id: string,
    @Body() dto: SetScheduleDto,
  ): Promise<MastersSchedule[]> {
    return this.schedulesService.setSchedule(master_id, dto);
  }

  @Post()
  async addSchedule(
    @Param('id') master_id: string,
    @Body() dto: SetScheduleDto,
  ): Promise<MastersSchedule[]> {
    return this.schedulesService.addSchedule(master_id, dto);
  }

  @Delete(':dayOfWeek')
  async removeSchedule(
    @Param('id') master_id: string,
    @Param('dayOfWeek') dayOfWeek: number,
  ): Promise<void> {
    return this.schedulesService.removeSchedule(master_id, Number(dayOfWeek));
  }

  @Get()
  async getSchedule(
    @Param('id') master_id: string,
  ): Promise<MastersSchedule[]> {
    return this.schedulesService.getSchedule(master_id);
  }

  @Get('calendar')
  async getScheduleForCalendar(
    @Param('id') master_id: string,
  ): Promise<ScheduleCalendarDto[]> {
    return this.schedulesService.getScheduleForCalendar(master_id);
  }
}
