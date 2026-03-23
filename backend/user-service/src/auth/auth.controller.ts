import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthorizationDto } from './dto/authorization.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';

import type { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Query('token') token: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizationDto> {
    return this.authService.register(dto, token, res);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizationDto> {
    return this.authService.login(dto, res);
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthorizationDto> {
    return this.authService.refresh(req, res);
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(res);
  }

  @Patch('restore/:token')
  async restorePassword(@Param('token') token: string, @Body() dto: RestorePasswordDto): Promise<void> {
    await this.authService.restorePassword(token, dto);
  }
}
