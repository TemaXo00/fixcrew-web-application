import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateRegionDto } from './dto/create-region.dto';
import { RegionsService } from './regions.service';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @MessagePattern('region.created')
  async createRegion(@Payload() data: CreateRegionDto): Promise<void> {
    await this.regionsService.createRegion(data);
  }

  @MessagePattern('region.deleted')
  async deleteRegion(@Payload() data: {region_id: string}): Promise<void> {
    await this.regionsService.removeRegion(data.region_id)
  }
}
