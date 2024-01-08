import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MyLogger } from './MyLogger';
import { MyLogger3 } from './MyLogger3';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: false,
    // logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    // logger: new MyLogger(),

    // new 对象无法注入依赖
    // 先不打印日志，把它放到 buffer 缓冲区，直到用 useLogger 指定了 Logger 并且应用初始化完毕
    bufferLogs: true,
  });
  app.useLogger(app.get(MyLogger3));
  app.useStaticAssets('public', { prefix: '/static' });
  await app.listen(3000);
}
bootstrap();
