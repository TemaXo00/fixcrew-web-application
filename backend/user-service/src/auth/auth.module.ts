import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DateUtil } from '../common/utils/parse-data.util';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [
    TokensModule,
    ClientsModule.registerAsync([
      {
        name: 'ORDER_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): ClientProviderOptions => {
          const rabbitUser = configService.get<string>('RABBIT_MQ_USER');
          const rabbitPass = configService.get<string>('RABBIT_MQ_PASSWORD');
          const rabbitHost = 'rabbitmq';
          const orderQueue = configService.get<string>('ORDER_QUEUE');

          return {
            name: 'ORDER_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${rabbitUser}:${rabbitPass}@${rabbitHost}:5672`],
              queue: orderQueue,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: 'MAIL_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService): ClientProviderOptions => {
          const rabbitUser = configService.get<string>('RABBIT_MQ_USER');
          const rabbitPass = configService.get<string>('RABBIT_MQ_PASSWORD');
          const rabbitHost = 'rabbitmq';
          const mailQueue = configService.get<string>('MAIL_QUEUE');

          return {
            name: 'MAIL_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${rabbitUser}:${rabbitPass}@${rabbitHost}:5672`],
              queue: mailQueue,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          algorithm: 'HS256',
        },
        verifyOptions: {
          algorithms: ['HS256'],
          ignoreExpiration: false,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DateUtil],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
