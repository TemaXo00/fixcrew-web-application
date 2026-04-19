import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  description: string;

  @IsOptional()
  @IsString()
  @IsUUID(4)
  cover_id?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  sale_percent?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  avg_time?: number;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  @IsNotEmpty()
  @IsUUID()
  category_id: string;
}
