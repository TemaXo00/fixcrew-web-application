import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Query,
} from '@nestjs/common';
import { Article } from '@prisma-gen/client';

import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleContentDto } from './dto/update-article-content.dto';
import { UpdateArticleCoverDto } from './dto/update-article-cover.dto';
import { UpdateArticleDescDto } from './dto/update-article-desc.dto';
import { UpdateArticleNameDto } from './dto/update-article-name.dto';
import { UpdateArticleTagsDto } from './dto/update-article-tags.dto';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArticles(
    @Query() pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Article>> {
    return await this.articleService.getArticles(pagination);
  }

  @Get(':slug')
  async getArticle(@Param('slug') slug: string): Promise<Article> {
    return this.articleService.getArticleBySlug(slug);
  }

  @Post()
  async createArticle(@Body() dto: CreateArticleDto): Promise<Article> {
    return await this.articleService.createArticle(dto);
  }

  @Patch(':slug/name')
  async updateArticleName(
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleNameDto,
  ): Promise<Article> {
    return await this.articleService.updateArticleName(slug, dto);
  }

  @Patch(':slug/cover')
  async updateArticleCover(
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleCoverDto,
  ): Promise<Article> {
    return await this.articleService.updateArticleCover(slug, dto);
  }

  @Patch(':slug/description')
  async updateArticleDesc(
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleDescDto,
  ): Promise<Article> {
    return await this.articleService.updateArticleDesc(slug, dto);
  }

  @Patch(':slug/content')
  async updateArticleContent(
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleContentDto,
  ): Promise<Article> {
    return await this.articleService.updateArticleContent(slug, dto);
  }

  @Patch(':slug/tags')
  async updateArticleTags(
    @Param('slug') slug: string,
    @Body() dto: UpdateArticleTagsDto,
  ): Promise<Article> {
    return await this.articleService.updateArticleTags(slug, dto);
  }

  @Delete(':slug')
  async removeArticle(@Param('slug') slug: string): Promise<Article> {
    return await this.articleService.removeArticle(slug);
  }
}
