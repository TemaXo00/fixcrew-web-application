import axios from 'axios';

export const AUTH_SERVICE = 'AUTH_SERVICE';
export const BLOG_SERVICE = 'BLOG_SERVICE';
export const FILE_SERVICE = 'FILE_SERVICE';
export const INFO_SERVICE = 'INFO_SERVICE';
export const ORDER_SERVICE = 'ORDER_SERVICE';
export const USER_SERVICE = 'USER_SERVICE';

export const AxiosInstances = [
  {
    provide: AUTH_SERVICE,
    useValue: axios.create({
      baseURL: 'http://auth-service:3000',
      timeout: 5000,
    }),
  },
  {
    provide: BLOG_SERVICE,
    useValue: axios.create({
      baseURL: 'http://blog-service:3000',
      timeout: 5000,
    })
  },
  {
    provide: INFO_SERVICE,
    useValue: axios.create({
      baseURL: 'http://info-service:3000',
      timeout: 5000,
    })
  },
  {
    provide: ORDER_SERVICE,
    useValue: axios.create({
      baseURL: 'http://order-service:3000',
    })
  },
  {
    provide: USER_SERVICE,
    useValue: axios.create({
      baseURL: 'http://user-service:3000',
      timeout: 5000,
    })
  },
  {
    provide: FILE_SERVICE,
    useValue: axios.create({
      baseURL: 'http://file-service:3000',
      timeout: 5000,
    }),
  },
];