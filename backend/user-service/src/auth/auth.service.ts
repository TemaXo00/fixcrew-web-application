import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject('MAIL_SERVICE') private readonly mail: ClientProxy) {
  }
  throwMessage(msg: string):Observable<object> {
    return this.mail.send('user.test', msg);
  }
}
