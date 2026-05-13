import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateArticleContentDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}