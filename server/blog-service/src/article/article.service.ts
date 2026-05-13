import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Article } from '@prisma-gen/client';
import Redis from 'ioredis';
import slugify from 'slugify';

import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TagService } from '../tag/tag.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleContentDto } from './dto/update-article-content.dto';
import { UpdateArticleCoverDto } from './dto/update-article-cover.dto';
import { UpdateArticleDescDto } from './dto/update-article-desc.dto';
import { UpdateArticleNameDto } from './dto/update-article-name.dto';
import { UpdateArticleTagsDto } from './dto/update-article-tags.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    private readonly prisma: PrismaService,
    private readonly tag: TagService,
  ) {}

  async getArticles(
    pagination: PaginationDto,
  ): Promise<PaginatedResponseDto<Article>> {
    const [items, total] = await Promise.all([
      this.prisma.article.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: {
          created_at: 'desc',
        },
      }),
      this.prisma.article.count(),
    ]);

    return new PaginatedResponseDto<Article>(items, total, pagination);
  }

  async getArticleBySlug(slug: string): Promise<Article> {
    const existingInCache = await this.getArticleFromCache(slug);

    if (existingInCache) {
      return JSON.parse(existingInCache);
    }

    const existingInDB = await this.prisma.article.findUnique({
      where: { slug },
    });

    if (!existingInDB) {
      throw new NotFoundException(`Article not found`);
    }

    await this.setArticleInCache(slug, existingInDB);

    return existingInDB;
  }

  async createArticle(dto: CreateArticleDto): Promise<Article> {
    const slug = slugify(dto.name, { lower: true });

    for (const tagId of dto.tags || []) {
      await this.tag.getTagById(tagId);
    }

    const existingArticle = await this.prisma.article.findUnique({
      where: { slug },
    });

    if (existingArticle) {
      throw new ConflictException(`Article already exists`);
    }

    const article = await this.prisma.article.create({
      data: {
        name: dto.name,
        slug: slug,
        cover_id: dto.cover_id,
        content: dto.content,
        short_desc: dto.short_desc,
        status: dto.status,
        tags: dto.tags
          ? {
              connect: dto.tags.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        tags: true,
      },
    });

    await this.setArticleInCache(slug, article);

    return article;
  }

  async updateArticleName(
    slug: string,
    dto: UpdateArticleNameDto,
  ): Promise<Article> {
    await this.getArticleBySlug(slug);

    const newSlug = slugify(dto.name, { lower: true });

    const existingArticle = await this.prisma.article.findUnique({
      where: { slug: newSlug },
    });

    if (existingArticle && existingArticle.slug !== slug) {
      throw new ConflictException(
        `Article with name "${dto.name}" already exists`,
      );
    }

    const article = await this.prisma.article.update({
      where: { slug },
      data: {
        name: dto.name,
        slug: newSlug,
      },
      include: {
        tags: true,
      },
    });

    await this.removeArticleFromCache(slug);
    await this.setArticleInCache(newSlug, article);

    return article;
  }

  async updateArticleCover(
    slug: string,
    dto: UpdateArticleCoverDto,
  ): Promise<Article> {
    await this.getArticleBySlug(slug);

    const article = await this.prisma.article.update({
      where: { slug },
      data: {
        cover_id: dto.cover_id,
      },
      include: {
        tags: true,
      },
    });

    await this.removeArticleFromCache(slug);
    await this.setArticleInCache(slug, article);

    return article;
  }

  async updateArticleDesc(
    slug: string,
    dto: UpdateArticleDescDto,
  ): Promise<Article> {
    await this.getArticleBySlug(slug);

    const article = await this.prisma.article.update({
      where: { slug },
      data: {
        short_desc: dto.short_desc,
      },
      include: {
        tags: true,
      },
    });

    await this.removeArticleFromCache(slug);
    await this.setArticleInCache(slug, article);

    return article;
  }

  async updateArticleContent(
    slug: string,
    dto: UpdateArticleContentDto,
  ): Promise<Article> {
    await this.getArticleBySlug(slug);

    const article = await this.prisma.article.update({
      where: { slug },
      data: {
        content: dto.content,
      },
      include: {
        tags: true,
      },
    });

    await this.removeArticleFromCache(slug);
    await this.setArticleInCache(slug, article);

    return article;
  }

  async updateArticleTags(
    slug: string,
    dto: UpdateArticleTagsDto,
  ): Promise<Article> {
    await this.getArticleBySlug(slug);

    if (dto.tags) {
      for (const tagId of dto.tags) {
        await this.tag.getTagById(tagId);
      }
    }

    const article = await this.prisma.article.update({
      where: { slug },
      data: {
        tags: dto.tags
          ? {
              set: dto.tags.map((id) => ({ id })),
            }
          : undefined,
      },
      include: {
        tags: true,
      },
    });

    await this.removeArticleFromCache(slug);
    await this.setArticleInCache(slug, article);

    return article;
  }

  async removeArticle(slug: string): Promise<Article> {
    await this.getArticleBySlug(slug);

    const existingInCache = await this.getArticleFromCache(slug);

    if (existingInCache) {
      await this.removeArticleFromCache(slug);
    }

    return this.prisma.article.delete({
      where: { slug },
    });
  }

  private async getArticleFromCache(slug: string): Promise<string | null> {
    const data = await this.redis.get(`article:${slug}`);

    if (!data) {
      return null;
    }

    return data;
  }

  private async setArticleInCache(
    slug: string,
    article: Article,
  ): Promise<void> {
    await this.redis.set(`article:${slug}`, JSON.stringify(article), 'EX', 600);
  }

  private async removeArticleFromCache(slug: string): Promise<void> {
    await this.redis.del(`article:${slug}`);
  }
}
