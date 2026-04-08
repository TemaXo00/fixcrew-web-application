import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ChangeMasterDto } from './dto/change-master.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { SetOrderDto } from './dto/set-order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern('order.pending')
  async sendPending(@Payload() data: SetOrderDto): Promise<void> {
    await this.orderService.sendPendingNotification(data)
  }

  @MessagePattern('order.date')
  async sendDate(@Payload() data: SetOrderDto): Promise<void> {
    await this.orderService.sendDateNotification(data)
  }

  @MessagePattern('order.reminder')
  async remindOrder(@Payload() data: SetOrderDto): Promise<void> {
    await this.orderService.sendReminderNotification(data)
  }

  @MessagePattern('order.master')
  async changeMaster(@Payload() data: ChangeMasterDto): Promise<void> {
    await this.orderService.sendMasterChangeNotification(data)
  }

  @MessagePattern('order.status')
  async changeStatus(@Payload() data: ChangeStatusDto): Promise<void> {
    await this.orderService.sendStatusChangeNotification(data)
  }
}
