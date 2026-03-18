import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const rabbitUser = configService.get<string>('RABBIT_MQ_USER');
  const rabbitPass = configService.get<string>('RABBIT_MQ_PASSWORD');
  const rabbitHost = 'rabbitmq';
  const mailQueue = configService.get<string>('MAIL_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${rabbitUser}:${rabbitPass}@${rabbitHost}:5672`],
      queue: mailQueue,
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}
void bootstrap();
