import { Controller, Get } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async getRoot(): Promise<AxiosResponse> {
    return await this.authService.getRoot();
  }
}
