import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Visibility } from '@prisma-gen/client';
import express from 'express';

import { FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('bucket') bucket: string,
    @Body('visibility') visibility: string,
  ): Promise<{ id: string }> {
    const result = await this.filesService.uploadFile({
      buffer: file.buffer,
      filename: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      visibility: visibility === 'PUBLIC' ? Visibility.PUBLIC : Visibility.PRIVATE,
      bucket: bucket,
    });
    return { id: result.id };
  }

  @Get('public/:id')
  async getPublic(@Param('id') id: string, @Res() res: express.Response): Promise<void> {
    const result = await this.filesService.getPublicFileStream(id);
    if (!result) {
      res.status(404).send();
      return;
    }
    res.setHeader('Content-Type', result.mimeType);
    result.stream.pipe(res);
  }

  @Get('private/:id')
  async getPrivate(@Param('id') id: string, @Res() res: express.Response): Promise<void> {
    const result = await this.filesService.getPrivateFileStream(id);
    if (!result) {
      res.status(404).send();
      return;
    }
    res.setHeader('Content-Type', result.mimeType);
    result.stream.pipe(res);
  }

  @Delete(':id')
  async deleteFile(@Param('id') id: string): Promise<{ success: boolean }> {
    const result = await this.filesService.deleteFile(id);
    return result || { success: false };
  }
}
