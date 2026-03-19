import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerModule } from 'nestjs-pino';

import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    PrometheusModule.register({
      path: '/metrics',
      defaultLabels: {
        app: 'mail-service',
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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
