import { Controller, Get, Param } from '@nestjs/common';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get(':msg')
  test(@Param() msg: string):Observable<object> {
    return this.authService.throwMessage(msg)
  }
}
