import { Readable } from 'stream';

import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

@Injectable()
export class MinioService implements OnModuleInit {
  private client: Minio.Client;

  constructor(private configService: ConfigService) {}

  onModuleInit(): void {
    this.client = new Minio.Client({
      endPoint: this.configService.getOrThrow<string>('MINIO_ENDPOINT'),
      port: 9000,
      useSSL: false,
      accessKey: this.configService.getOrThrow<string>('MINIO_USER'),
      secretKey: this.configService.getOrThrow<string>('MINIO_PASSWORD'),
    });
  }

  async upload(bucket: string, key: string, buffer: Buffer, mimeType: string): Promise<void> {
    await this.client.putObject(bucket, key, buffer, buffer.length, { 'Content-Type': mimeType });
  }

  async getObject(bucket: string, key: string): Promise<Readable> {
    return this.client.getObject(bucket, key);
  }

  async getPresignedUrl(bucket: string, key: string, expires = 300): Promise<string> {
    return this.client.presignedUrl('GET', bucket, key, expires);
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    await this.client.removeObject(bucket, key);
  }

  async ensureBucket(bucket: string): Promise<void> {
    const exists = await this.client.bucketExists(bucket);
    if (!exists) {
      await this.client.makeBucket(bucket);
    }
  }
}
