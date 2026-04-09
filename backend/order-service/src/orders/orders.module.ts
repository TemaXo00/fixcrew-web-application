import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientProviderOptions,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

import { OrderNotificationProcessor } from './orders-notification.processor';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

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
        },
      },
    ]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get<string>('REDIS_URL'),
      }),
    }),
    BullModule.registerQueue({ name: 'order-notifications' }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrderNotificationProcessor],
})
export class OrdersModule {}
