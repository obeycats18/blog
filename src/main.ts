import { ResponseInterceptor } from './interceptors/response.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
