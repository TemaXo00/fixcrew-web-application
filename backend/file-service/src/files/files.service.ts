import { randomUUID } from 'crypto';
import * as path from 'path';
import { Readable } from 'stream';

import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Visibility, File } from '@prisma-gen/client';

import { MinioService } from '../minio/minio.service';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FilesService {
  private readonly GATEWAY_URL: string;

  constructor(
    private prisma: PrismaService,
    private minioService: MinioService,
    protected config: ConfigService,
  ) {
    this.GATEWAY_URL = config.getOrThrow<string>('GATEWAY_URL');
  }

  private generateKey(filename: string): string {
    const ext = path.extname(filename);
    return `${randomUUID()}${ext}`;
  }

  private isPublicBucket(bucket: string): boolean {
    return bucket !== 'order';
  }

  async uploadFile(dto: UploadFileDto): Promise<File> {
    if (!dto.buffer || !Buffer.isBuffer(dto.buffer)) {
      throw new Error('Invalid buffer');
    }

    const bucket = dto.bucket;
    const isPublic = this.isPublicBucket(bucket);
    const extension = path.extname(dto.filename).replace('.', '');
    const key = this.generateKey(dto.filename);

    await this.minioService.ensureBucket(bucket, isPublic);
    await this.minioService.upload(bucket, key, dto.buffer, dto.mimeType);

    return this.prisma.file.create({
      data: {
        filename: dto.filename,
        extension,
        mimeType: dto.mimeType,
        size: dto.size,
        bucket,
        key,
        visibility: isPublic ? Visibility.PUBLIC : Visibility.PRIVATE,
      },
    });
  }

  async getFileUrl(fileId: string, isAdmin: boolean): Promise<string> {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      throw new Error('File not found');
    }

    if (file.visibility === Visibility.PRIVATE && !isAdmin) {
      throw new ForbiddenException();
    }

    if (file.visibility === Visibility.PUBLIC) {
      return `${this.GATEWAY_URL}/file/public/${file.id}`;
    }

    return `${this.GATEWAY_URL}/file/private/${file.id}`;
  }

  async deleteFile(fileId: string): Promise<{ success: boolean } | void> {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      return;
    }

    await this.minioService.deleteObject(file.bucket, file.key);
    await this.prisma.file.delete({ where: { id: fileId } });
    return { success: true };
  }

  async getPublicFileStream(id: string): Promise<{ stream: Readable; mimeType: string } | null> {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file || file.visibility !== Visibility.PUBLIC) {
      return null;
    }

    const stream = await this.minioService.getObject(file.bucket, file.key);
    return { stream, mimeType: file.mimeType };
  }

  async getPrivateFileStream(id: string): Promise<{ stream: Readable; mimeType: string } | null> {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file || file.visibility !== Visibility.PRIVATE) {
      return null;
    }

    const stream = await this.minioService.getObject(file.bucket, file.key);
    return { stream, mimeType: file.mimeType };
  }
}
