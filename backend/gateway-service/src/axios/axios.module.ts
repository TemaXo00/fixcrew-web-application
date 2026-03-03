import { Global, Module } from '@nestjs/common';

import { AxiosInstances } from '../config/axios.instances';

@Global()
@Module({
  providers: [...AxiosInstances],
  exports: [...AxiosInstances],
})
export class AxiosModule {}
