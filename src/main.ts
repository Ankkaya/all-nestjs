import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: 'guang',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useStaticAssets('public', { prefix: '/static' });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
