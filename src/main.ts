import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static' });
  app.use(
    session({
      secret: 'ankkaya',
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(3000);
}
bootstrap();
