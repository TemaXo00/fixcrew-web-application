import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ChangeMasterDto } from './dto/change-master.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { SetOrderDto } from './dto/set-order.dto';

@Injectable()
export class OrderService {

  constructor(
    private readonly mailSender: MailerService,
  ) {}

  async sendPendingNotification(dto: SetOrderDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: "Order created",
      template: 'pending',
      context: {
        id: dto.id,
        name: dto.name,
        date: dto.date,
        time: dto.time,
      }
    })
  }

  async sendDateNotification(dto: SetOrderDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: "Date of order changed",
      template: 'date',
      context: {
        id: dto.id,
        name: dto.name,
        date: dto.date,
        time: dto.time,
      }
    })
  }

  async sendReminderNotification(dto: SetOrderDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: "Remind for order",
      template: 'reminder',
      context: {
        id: dto.id,
        name: dto.name,
        date: dto.date,
        time: dto.time,
      }
    })
  }

  async sendMasterChangeNotification(dto: ChangeMasterDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: "You reassigned from order",
      template: 'master',
      context: {
        id: dto.id,
      }
    })
  }

  async sendStatusChangeNotification(dto: ChangeStatusDto): Promise<void> {
    await this.mailSender.sendMail({
      to: dto.email,
      subject: "Status of order changed",
      template: 'status',
      context: {
        orderId: dto.orderId,
        status: dto.status,
      }
    })
  }
}
