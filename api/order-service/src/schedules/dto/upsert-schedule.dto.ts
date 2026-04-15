import { IsInt, Min, Max } from 'class-validator';

export class UpsertScheduleDto {
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;

  @IsInt()
  @Min(0)
  @Max(1440)
  startMin: number;

  @IsInt()
  @Min(0)
  @Max(1440)
  endMin: number;
}
