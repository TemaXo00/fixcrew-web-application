import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
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
