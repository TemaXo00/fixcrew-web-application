import {
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class UpdateCategoryNameDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  name: string;
}
