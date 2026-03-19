import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client!: Redis;
  private readonly defaultTtl: number;

  constructor(private readonly config: ConfigService) {
    this.defaultTtl = this.config.get<number>('REDIS_TTL', 60);
  }

  onModuleInit(): void {
    this.client = new Redis({
      host: this.config.get<string>('REDIS_HOST', 'localhost'),
      port: this.config.get<number>('REDIS_PORT', 6379),
    });
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.quit();
  }

  async set(key: string, value: string, ttl?: number): Promise<'OK'> {
    return this.client.set(key, value, 'EX', ttl ?? this.defaultTtl);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }

  async exists(key: string): Promise<boolean> {
    const result = await this.client.exists(key);
    return result === 1;
  }

  async expire(key: string, ttl: number): Promise<boolean> {
    const result = await this.client.expire(key, ttl);
    return result === 1;
  }

  async ttl(key: string): Promise<number> {
    return this.client.ttl(key);
  }

  async setJson<T>(key: string, value: T, ttl?: number): Promise<'OK'> {
    return this.set(key, JSON.stringify(value), ttl);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const data = await this.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  async keys(pattern: string): Promise<string[]> {
    return this.client.keys(pattern);
  }

  async flush(): Promise<'OK'> {
    return this.client.flushall();
  }
}
