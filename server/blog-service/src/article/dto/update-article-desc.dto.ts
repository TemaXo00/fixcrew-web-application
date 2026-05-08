import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateArticleDescDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  short_desc: string;
}