import { ArticleStatuses } from '@prisma-gen/enums';
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  cover_id: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  short_desc: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMaxSize(10)
  tags: string[];
  @IsNotEmpty()
  @IsEnum(ArticleStatuses)
  status: ArticleStatuses;
}