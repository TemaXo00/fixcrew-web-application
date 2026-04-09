import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  region_id: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  name: string
}