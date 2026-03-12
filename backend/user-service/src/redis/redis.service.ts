import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private client: Redis;
  private readonly ttl: number;

  constructor(private config: ConfigService) {
    this.ttl = this.config.get<number>('REDIS_TTL', 60);

    this.client = new Redis({
      host: this.config.get<string>('REDIS_HOST', 'localhost'),
      port: this.config.get<number>('REDIS_PORT', 6379),
    });
  }

  async set(key: string, value: string) {
    return this.client.set(key, value, 'EX', this.ttl);
  }

  async get(key: string) {
    return this.client.get(key);
  }

  async delete(key: string) {
    return this.client.del(key);
  }
}
