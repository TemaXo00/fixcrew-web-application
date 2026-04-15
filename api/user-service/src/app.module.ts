import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { TokensModule } from './tokens/tokens.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TerminusModule,
    PrometheusModule.register({
      path: '/metrics',
      defaultLabels: {
        app: 'user-service',
      },
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'warn',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            singleLine: false,
            translateTime: 'yyyy-mm-dd HH:MM:ss.l',
          },
        },
      },
    }),
    PrismaModule,
    AuthModule,
    ProfileModule,
    TokensModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
