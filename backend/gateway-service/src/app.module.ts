import { Module } from '@nestjs/common';

import { AxiosModule } from './axios/axios.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { InfoModule } from './info/info.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [FileModule, AxiosModule, AuthModule, BlogModule, InfoModule, OrderModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
