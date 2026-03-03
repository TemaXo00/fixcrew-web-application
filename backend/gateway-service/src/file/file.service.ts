import { Inject, Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

import { FILE_SERVICE } from '../config/axios.instances';


@Injectable()
export class FileService {
  constructor(
    @Inject(FILE_SERVICE)
    private readonly fileService: axios.AxiosInstance,
  ) {}

  async getRoot():Promise<AxiosResponse> {
    const response = await this.fileService.get('/');
    return response.data;
  }
}
