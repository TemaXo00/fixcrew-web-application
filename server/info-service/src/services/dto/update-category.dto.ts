import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}
