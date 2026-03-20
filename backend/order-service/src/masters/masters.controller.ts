import { Controller } from '@nestjs/common';
import { MastersService } from './masters.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('masters')
export class MastersController {
  constructor(private readonly mastersService: MastersService) {}

  @MessagePattern('user.created')
  test(@Payload() data: any) {
    console.log(data);
    return {
      "data": data
    }
  }
}
