import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProviderOptions, ClientsModule, Transport } from '@nestjs/microservices';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { InvitesModule } from '../invites/invites.module';


@Module({
  imports: [
    InvitesModule,
    ClientsModule.registerAsync([{
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
      }
    }])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
