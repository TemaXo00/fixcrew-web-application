import { ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Mail Service',
    }),
    bufferLogs: true,
  });
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

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices();
  await app.listen(3000);
}
void bootstrap();
