import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MailService } from './mail.service';

@Controller()
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @MessagePattern('user.test')
  handleUserTest(@Payload() data: { msg: string }):object {
    return {
      "returned": true,
      "message": data.msg,
    }
  }
}
