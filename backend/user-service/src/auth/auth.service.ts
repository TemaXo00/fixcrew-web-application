import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('ORDER_SERVICE') private readonly order: ClientProxy
  ) {}

  getTest() {
    return this.order.send('user.created', 2);
  }
}
