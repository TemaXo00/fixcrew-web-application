import { IsInt, IsNotEmpty, Min, Max } from 'class-validator';

export class UpdateSalePercentDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  sale_percent: number;
}
