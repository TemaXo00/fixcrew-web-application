import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateArticleCoverDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  cover_id: string;
}