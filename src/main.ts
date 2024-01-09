import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MyLogger } from './MyLogger';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static' });
  // app.useLogger(new MyLogger());
  // 按模块调用 winston
  app.useLogger(app.get(WINSTON_LOGGER_TOKEN));
  await app.listen(3000);
}
bootstrap();
