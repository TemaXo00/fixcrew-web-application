import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { InviteDto } from './dto/invite.dto';
import { MailService } from './mail.service';

@Controller()
export class MailController {

  constructor(private readonly mailService: MailService) {}

  @MessagePattern('invite.created')
  async sendInviteMail(@Payload() data: InviteDto): Promise<void> {
    await this.mailService.sendInviteMail(data);
  }
}
