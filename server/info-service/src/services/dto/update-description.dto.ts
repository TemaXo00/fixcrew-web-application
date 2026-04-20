import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateDescriptionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(15)
  description: string;
}