import { ArrayMaxSize, IsArray, IsOptional, IsUUID } from 'class-validator';

export class UpdateArticleTagsDto {
  @IsOptional()
  @IsArray()
  @IsUUID(4, { each: true })
  @ArrayMaxSize(10)
  tags: string[];
}