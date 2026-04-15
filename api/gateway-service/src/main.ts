import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
          scriptSrc: ["'self'", "https: 'unsafe-inline'"],
        },
      },
    }),
  );

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      message: 'Too many requests from this IP',
    }),
  );

  app.use(compression());

  const allowedOrigins = config
    .getOrThrow<string>('CORS_ALLOWED_ORIGINS')
    .split(',')
    .map((o) => o.trim());

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Authorization', 'Set-Cookie', 'Access-Control-Allow-Credentials'],
    maxAge: 86400,
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    next();
  });

  const serviceProxies: Record<string, string> = {
    blog: 'http://blog-service:3000',
    file: 'http://file-service:3000',
    info: 'http://info-service:3000',
    order: 'http://order-service:3000',
    user: 'http://user-service:3000',
  };

  Object.entries(serviceProxies).forEach(([path, target]) => {
    app.use(
      `/${path}`,
      createProxyMiddleware({
        target,
        changeOrigin: true,
      }),
    );
  });

  await app.listen(3000);
}

void bootstrap();
