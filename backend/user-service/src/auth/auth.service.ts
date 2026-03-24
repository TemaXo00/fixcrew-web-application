import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { User } from '@prisma-gen/client';
import * as argon2 from 'argon2';

import { AuthorizationDto } from './dto/authorization.dto';
import { DateUtil } from '../common/utils/parse-data.util';
import { PrismaService } from '../prisma/prisma.service';
import { TokensService } from '../tokens/tokens.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RestorePasswordDto } from './dto/restore-password.dto';

import type { JwtPayload } from './interfaces/jwt.interface';
import type { CookieOptions, Response, Request } from 'express';
import type { StringValue } from 'ms';

@Injectable()
export class AuthService {
  private readonly ACCESS_TTL: StringValue;
  private readonly REFRESH_TTL: StringValue;
  private readonly COOKIE_DOMAIN: string;

  constructor(
    @Inject('ORDER_SERVICE') private readonly order: ClientProxy,
    @Inject('MAIL_SERVICE') private readonly mail: ClientProxy,
    private readonly prisma: PrismaService,
    protected readonly config: ConfigService,
    private readonly tokens: TokensService,
    private readonly jwt: JwtService,
    private readonly date: DateUtil,
  ) {
    this.ACCESS_TTL = config.getOrThrow<StringValue>('JWT_ACCESS_TTL');
    this.REFRESH_TTL = config.getOrThrow<StringValue>('JWT_REFRESH_TTL');
    this.COOKIE_DOMAIN = config.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(
    dto: RegisterDto,
    token: string,
    res: Response,
    ua: string
  ): Promise<AuthorizationDto> {
    const [existingEmail, existingPhoneNumber] = await Promise.all([
      this.prisma.user.findUnique({ where: { email: dto.email } }),
      this.prisma.user.findUnique({
        where: { phone_number: dto.phone_number },
      }),
    ]);

    if (existingEmail) {
      throw new ConflictException('User already exists');
    }

    if (existingPhoneNumber) {
      throw new ConflictException('User already exists');
    }

    await this.tokens.useToken(token, 'INVITE');

    const hashedPassword = await argon2.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        phone_number: dto.phone_number,
        password_hash: hashedPassword,
        avatar_url: dto.avatar_url || null,
      },
    });

    this.order.emit('user.created', {
      id: user.id,
      email: user.email,
      phone_number: user.phone_number,
    });

    this.mail.emit('user.register', {
      email: user.email,
      agent: ua
    })

    return this.auth(res, user.id, user.role);
  }

  async login(dto: LoginDto, res: Response, ua: string): Promise<AuthorizationDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const verifiedPassword = await argon2.verify(
      user.password_hash,
      dto.password,
    );

    if (!verifiedPassword || user.status === 'BANNED') {
      throw new NotFoundException('User not found');
    }

    this.mail.emit('user.login', {
      email: dto.email,
      agent: ua
    })

    return this.auth(res, user.id, user.role);
  }

  async refresh(req: Request, res: Response): Promise<AuthorizationDto> {
    const refreshToken = req.cookies?.['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    try {
      const payload: JwtPayload = await this.jwt.verifyAsync(refreshToken);

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        select: { id: true, role: true, status: true },
      });

      if (!user) {
        this.setCookies(res, '', new Date(0));
        throw new NotFoundException('User not found');
      }

      if (user.status === 'BANNED') {
        this.setCookies(res, '', new Date(0));
        throw new UnauthorizedException(`User ${user.status.toLowerCase()}`);
      }

      return this.auth(res, user.id, user.role);
    } catch (error) {
      if (
        error?.name === 'JsonWebTokenError' ||
        error?.name === 'TokenExpiredError'
      ) {
        this.setCookies(res, '', new Date(0));
        throw new UnauthorizedException('Invalid or expired refresh token');
      }
      throw error;
    }
  }

  async logout(res: Response): Promise<void> {
    this.setCookies(res, '', new Date(0));
  }

  async restorePassword(token: string, dto: RestorePasswordDto, ua: string): Promise<void> {
    const userToken = await this.tokens.getWorkingTokenByRaw(token, 'PASSWORD')

    const user = await this.prisma.user.findUnique({
      where: {
        email: userToken.email
      }
    })

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await argon2.hash(dto.password);

    await this.prisma.user.update({
      where: {id: user.id},
      data: {password_hash: hashedPassword},
    })

    this.mail.emit('user.password', {
      email: user.email,
      agent: ua
    })

    await this.tokens.useToken(token, 'PASSWORD')
  }

  async validate(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.status === 'BANNED') {
      throw new UnauthorizedException(`User banned}`);
    }

    return user;
  }

  private genTokens(
    id: string,
    role: string,
  ): { access_token: string; refresh_token: string } {
    const payload: JwtPayload = { id, role };

    const access_token = this.jwt.sign(payload, {
      expiresIn: this.ACCESS_TTL,
    });

    const refresh_token = this.jwt.sign(payload, {
      expiresIn: this.REFRESH_TTL,
    });

    return {
      access_token,
      refresh_token,
    };
  }

  private async auth(
    res: Response,
    id: string,
    role: string,
  ): Promise<AuthorizationDto> {
    const { access_token, refresh_token } = this.genTokens(id, role);

    const expiresIn: Date = this.date.parseTTL(this.REFRESH_TTL);

    this.setCookies(res, refresh_token, expiresIn);

    return { access_token };
  }

  private setCookies(res: Response, value: string, expires: Date): void {
    const options: CookieOptions = {
      domain: this.COOKIE_DOMAIN,
      httpOnly: true,
      expires,
      secure: false,
      sameSite: 'lax',
    };
    res.cookie(`refreshToken`, value, options);
  }
}
