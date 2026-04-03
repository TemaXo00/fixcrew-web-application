import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateScheduleDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1440)
  from: number;
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(1440)
  to: number;
}