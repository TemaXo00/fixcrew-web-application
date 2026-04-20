import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { LoggerModule } from 'nestjs-pino';

import { FilesModule } from './files/files.module';
import { MinioModule } from './minio/minio.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultLabels: {
        app: 'order-service',
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
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
    MinioModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
