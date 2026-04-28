import { Module } from '@nestjs/common';

import { ZipController } from './zip.controller';
import { ZipService } from './zip.service';
import { RegionsModule } from '../regions/regions.module';

@Module({
  imports: [RegionsModule],
  controllers: [ZipController],
  providers: [ZipService],
})
export class ZipModule {}
