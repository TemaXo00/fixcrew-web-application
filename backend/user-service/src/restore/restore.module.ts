import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';

import { RestoreController } from './restore.controller';
import { RestoreService } from './restore.service';

@Module({
  imports: [
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
        }
      },
    ]),
  ],
  controllers: [RestoreController],
  providers: [RestoreService],
})
export class RestoreModule {}
