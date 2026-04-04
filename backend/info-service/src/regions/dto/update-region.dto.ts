import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class UpdateRegionDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(1440)
  avg_response: number;
}