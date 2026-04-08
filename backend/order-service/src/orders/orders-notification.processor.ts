import { Processor, Process } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import bull from 'bull';

@Processor('order-notifications')
export class OrderNotificationProcessor {
  constructor(
    @Inject('MAIL_SERVICE') private readonly mailClient: ClientProxy,
  ) {}

  @Process('send-day-before-reminder')
  async handleDayBeforeReminder(
    job: bull.Job<{
      email: string;
      date: string;
      time: string;
      orderId: string;
    }>,
  ): Promise<void> {
    const { email, date, time } = job.data;
    this.mailClient.emit('order.pending.client', { email, date, time });
  }
}
