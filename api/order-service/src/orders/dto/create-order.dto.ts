import {
  ArrayMaxSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsOptional()
  message?: string;

  @IsString()
  @IsOptional()
  @IsUUID(4)
  region_id?: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  photo_ids: string[];
}
