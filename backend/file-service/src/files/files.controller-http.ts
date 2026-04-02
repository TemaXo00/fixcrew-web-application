import { Controller, Get, Param, Res } from '@nestjs/common';
import express from 'express';

import { FilesService } from './files.service';

@Controller('files')
export class FilesHttpController {
  constructor(private readonly filesService: FilesService) {}

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
}
