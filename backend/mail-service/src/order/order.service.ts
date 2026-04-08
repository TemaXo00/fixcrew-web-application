import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class OrderService {
  private readonly UI_LINK: string;

  constructor(
    private readonly mailSender: MailerService,
    protected config: ConfigService,
  ) {
    this.UI_LINK = config.getOrThrow<string>('MAIL_UI_LINK');
  }


}
