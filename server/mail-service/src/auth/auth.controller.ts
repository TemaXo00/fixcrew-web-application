import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth/auth.dto';
import { InviteDto } from './dto/auth/invite.dto';
import { RestoreDto } from './dto/auth/restore.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('invite.created')
  async sendInvite(@Payload() data: InviteDto): Promise<void> {
    await this.authService.sendInvite(data);
  }

  @MessagePattern('restore.created')
  async sendRestore(@Payload() data: RestoreDto): Promise<void> {
    await this.authService.sendRestore(data);
  }

  @MessagePattern('user.register')
  async notifyRegister(@Payload() data: AuthDto): Promise<void> {
    await this.authService.notifyRegister(data);
  }

  @MessagePattern('user.login')
  async notifyLogin(@Payload() data: AuthDto): Promise<void> {
    await this.authService.notifyLogin(data);
  }

  @MessagePattern('user.password')
  async notifyRestore(@Payload() data: AuthDto): Promise<void> {
    await this.authService.notifyRestore(data);
  }
}
