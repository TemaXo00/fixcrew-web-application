import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  type_id: string;
}