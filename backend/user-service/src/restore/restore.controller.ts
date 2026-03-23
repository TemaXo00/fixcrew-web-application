import { Body, Controller, Param, Patch, Post } from '@nestjs/common';

import { CreateRestoreDto } from './dto/create-restore.dto';
import { UseRestoreDto } from './dto/use-restore.dto';
import { RestoreService } from './restore.service';

@Controller('restore')
export class RestoreController {
  constructor(private readonly restoreService: RestoreService) {}

  @Post()
  async setRestore(@Body() createRestoreDto: CreateRestoreDto): Promise<void> {
    return await this.restoreService.setRestore(createRestoreDto)
  }

  @Patch(':token')
  async useRestore(@Param('token') token: string, @Body() dto: UseRestoreDto): Promise<void> {
    return await this.restoreService.useRestore(token, dto);
  }
}
