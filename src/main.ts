import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public', { prefix: '/static' });
  // 全局中间件，通过 app.use() 注册
  // app.use(function (req: Request, res: Response, next: NextFunction) {
  //   console.log('before', req.url);
  //   next();
  //   console.log('after');
  // });

  // 全局添加 Guard
  // app.useGlobalGuards(new LoginGuard());

  // 全局添加 Interceptor
  app.useGlobalInterceptors(new TimeInterceptor());
  // 全局添加 Pipe
  app.useGlobalPipes(new ValidatePipe());
  // 全局添加 ExceptionFilter
  app.useGlobalFilters(new TestFilter());
  await app.listen(3000);
}
bootstrap();
