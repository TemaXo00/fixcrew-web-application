import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { File } from '@prisma-gen/client';

import { DeleteFileDto } from './dto/delete-file.dto';
import { GetFileUrlDto } from './dto/get-file-url.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { FilesService } from './files.service';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @MessagePattern({ cmd: 'upload_file' })
  uploadFile(@Payload() dto: UploadFileDto): Promise<File> {
    return this.filesService.uploadFile(dto);
  }

  @MessagePattern({ cmd: 'get_file_url' })
  getFileUrl(@Payload() dto: GetFileUrlDto): Promise<string> {
    return this.filesService.getFileUrl(dto.id, dto.isAdmin);
  }

  @MessagePattern({ cmd: 'delete_file' })
  deleteFile(@Payload() dto: DeleteFileDto): Promise<{ success: boolean } | void> {
    return this.filesService.deleteFile(dto.id);
  }
}
