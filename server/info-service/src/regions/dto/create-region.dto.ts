import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  name: string
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(1440)
  avg_response: number
}