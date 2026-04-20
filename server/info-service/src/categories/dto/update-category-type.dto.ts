import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateCategoryTypeDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  type_id: string;
}
