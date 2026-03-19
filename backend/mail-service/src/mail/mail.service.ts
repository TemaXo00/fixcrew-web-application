import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { InviteDto } from './dto/invite.dto';

@Injectable()
export class MailService {
  private readonly UI_LINK: string;

  constructor(
    private readonly mailSender: MailerService,
    private config: ConfigService,
  ) {
    this.UI_LINK = config.getOrThrow<string>("MAIL_UI_LINK");
  }

  async sendInviteMail(dto: InviteDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: 'Invitation to FixCrew admin service',
      template: 'invite-mail',
      context: {
        ui_link: `${this.UI_LINK}/user/invite`,
        token: dto.token,
      }
    });
  }
}
