import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { MailService } from './mail.service';
import { MailerService } from '@nestjs-modules/mailer';

@Controller()
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly mail: MailerService
  ) {}

  @MessagePattern('invite.created')
  async sendInviteMail(@Payload() data: any) {
    await this.mail.sendMail({
      to: 'nuweby345@gmail.com',
      subject: 'Invite',
      text: data.email,
    })
  }
}
