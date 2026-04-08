import { randomUUID } from 'crypto';
import * as path from 'path';
import { Readable } from 'stream';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Visibility, File } from '@prisma-gen/client';

import { MinioService } from '../minio/minio.service';
import { PrismaService } from '../prisma/prisma.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private minioService: MinioService,
    protected config: ConfigService,
  ) {}

  private generateKey(filename: string): string {
    const ext = path.extname(filename);
    return `${randomUUID()}${ext}`;
  }

  async uploadFile(dto: UploadFileDto): Promise<File> {
    if (!dto.buffer || !Buffer.isBuffer(dto.buffer)) {
      throw new Error('Invalid buffer');
    }

    const bucket = dto.bucket;
    const extension = path.extname(dto.filename).replace('.', '');
    const key = this.generateKey(dto.filename);

    await this.minioService.ensureBucket(bucket);
    await this.minioService.upload(bucket, key, dto.buffer, dto.mimeType);

    return this.prisma.file.create({
      data: {
        filename: dto.filename,
        extension,
        mimeType: dto.mimeType,
        size: dto.size,
        bucket,
        key,
        visibility: dto.visibility,
      },
    });
  }

  async deleteFile(fileId: string): Promise<{ success: boolean }> {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
    if (!file) {
      return { success: false };
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
