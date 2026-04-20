import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UpdatePriceDto {
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  price: number;
}
