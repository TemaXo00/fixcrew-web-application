import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { AuthDto } from './dto/auth/auth.dto';
import { InviteDto } from './dto/auth/invite.dto';
import { RestoreDto } from './dto/auth/restore.dto';

@Injectable()
export class AuthService {
  private readonly UI_LINK: string;

  constructor(
    private readonly mailSender: MailerService,
    protected config: ConfigService,
  ) {
    this.UI_LINK = config.getOrThrow<string>('MAIL_UI_LINK');
  }

  async sendInvite(dto: InviteDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: 'Invitation to FixCrew admin service',
      template: 'invite',
      context: {
        ui_link: this.UI_LINK,
        token: dto.token,
      },
    });
  }

  async sendRestore(dto: RestoreDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: 'Restore your password',
      template: 'restore',
      context: {
        ui_link: this.UI_LINK,
        token: dto.token,
      },
    });
  }

  async notifyRegister(dto: AuthDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: 'Register to FixCrew',
      template: 'register-notification',
      context: {
        ui_link: this.UI_LINK,
        agent: dto.agent,
      },
    });
  }

  async notifyLogin(dto: AuthDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: 'Login',
      template: 'login-notification',
      context: {
        ui_link: this.UI_LINK,
        agent: dto.agent,
      },
    });
  }

  async notifyRestore(dto: AuthDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: 'Successfully restore password',
      template: 'restore-notification',
      context: {
        ui_link: this.UI_LINK,
        agent: dto.agent,
      },
    });
  }
}
