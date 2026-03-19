import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerModule } from 'nestjs-pino';

import { AuthModule } from './auth/auth.module';
import { InvitesModule } from './invites/invites.module';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';

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
    RedisModule,
    InvitesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
