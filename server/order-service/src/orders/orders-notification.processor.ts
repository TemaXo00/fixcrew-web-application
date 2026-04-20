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
      orderId: string;
      name: string;
      email: string;
      date: string;
      time: string;
    }>,
  ): Promise<void> {
    const { orderId, name, email, date, time } = job.data;
    this.mailClient.emit('order.reminder', {
      id: orderId,
      name,
      email,
      date,
      time,
    });
  }
}
