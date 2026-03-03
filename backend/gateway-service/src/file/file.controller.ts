import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  async getRoot(): Promise<AxiosResponse> {
    return await this.fileService.getRoot();
  }
}
