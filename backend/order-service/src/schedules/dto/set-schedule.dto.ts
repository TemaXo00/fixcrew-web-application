import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { UpsertScheduleDto } from './upsert-schedule.dto';

export class SetScheduleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpsertScheduleDto)
  schedules: UpsertScheduleDto[];
}
