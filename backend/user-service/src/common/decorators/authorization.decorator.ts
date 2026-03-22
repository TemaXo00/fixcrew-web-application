import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtGuard } from '../guards/auth.guard';

export function Authorization(): MethodDecorator {
  return applyDecorators(UseGuards(JwtGuard));
}
