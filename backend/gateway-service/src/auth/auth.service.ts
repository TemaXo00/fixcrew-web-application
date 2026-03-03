import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

import { AUTH_SERVICE } from '../config/axios.instances';


@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private auth: axios.AxiosInstance) {}

  async getRoot(): Promise<AxiosResponse> {
    const response = await this.auth.get('/');
    return response.data;
  }
}
