import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule } from '@nestjs-modules/ioredis';

import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    TagModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'single',
        url: config.getOrThrow<string>('REDIS_URL')
      })
    })
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
