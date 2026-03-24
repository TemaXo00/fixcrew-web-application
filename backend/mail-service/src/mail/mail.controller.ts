import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth/auth.dto';
import { InviteDto } from './dto/auth/invite.dto';
import { RestoreDto } from './dto/auth/restore.dto';

@Controller()
export class MailController {

  constructor(private readonly auth: AuthService) {}

  @MessagePattern('invite.created')
  async sendInvite(@Payload() data: InviteDto): Promise<void> {
    await this.auth.sendInvite(data);
  }

  @MessagePattern('restore.created')
  async sendRestore(@Payload() data: RestoreDto): Promise<void> {
    await this.auth.sendRestore(data);
  }

  @MessagePattern('user.register')
  async notifyRegister(@Payload() data: AuthDto): Promise<void> {
    await this.auth.notifyRegister(data);
  }

  @MessagePattern('user.login')
  async notifyLogin(@Payload() data: AuthDto): Promise<void> {
    await this.auth.notifyLogin(data);
  }

  @MessagePattern('user.password')
  async notifyRestore(@Payload() data: AuthDto): Promise<void> {
    await this.auth.notifyRestore(data);
  }
}
