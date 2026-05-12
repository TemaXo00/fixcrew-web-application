import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles, Token } from '@prisma-gen/client';

import { TokenCreateDto } from './dto/token-create.dto';
import { TokensService } from './tokens.service';
import { Roles as RolesDecorator } from '../common/decorators/roles.decorator';
import {
  PaginatedResponseDto,
  PaginationDto,
} from '../common/dto/pagination.dto';
import { JwtGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

@Controller('tokens')
@UseGuards(JwtGuard, RolesGuard)
@RolesDecorator(Roles.ADMIN)
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  async getTokens(
    @Query() dto: PaginationDto,
  ): Promise<PaginatedResponseDto<Token>> {
    return await this.tokensService.getTokens(dto);
  }

  @Get('stats')
  async getTokenStats(): Promise<object> {
    return await this.tokensService.getTokensStats();
  }

  @Post('password')
  async createPasswordToken(
    @Body() dto: TokenCreateDto,
  ): Promise<Token | null> {
    return await this.tokensService.createToken(dto, 'PASSWORD');
  }

  @Post('invite')
  async createInviteToken(@Body() dto: TokenCreateDto): Promise<Token | null> {
    return await this.tokensService.createToken(dto, 'INVITE');
  }

  @Put(':id')
  async revokeToken(@Param('id') id: string): Promise<Token> {
    return await this.tokensService.revokeUserToken(id);
  }

  @Delete()
  async deleteTokens(): Promise<void> {
    await this.tokensService.manuallyDeleteExpiredTokens();
  }
}
