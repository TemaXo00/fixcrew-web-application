import { Module } from '@nestjs/common';

import { FilesController } from './files.controller';
import { FilesHttpController } from './files.controller-http';
import { FilesService } from './files.service';

@Module({
  controllers: [FilesController, FilesHttpController],
  providers: [FilesService],
})
export class FilesModule {}
