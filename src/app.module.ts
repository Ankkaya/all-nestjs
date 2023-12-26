import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE, APP_FILTER } from '@nestjs/core';
import { LoginGuard } from './login.guard';
import { LogMiddleware } from './log.middleware';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Module({
  imports: [XxxModule, PersonModule],
  controllers: [AppController],
  providers: [
    AppService,
    // 全局添加 Guard
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
    },
    // 全局添加 Interceptor
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TimeInterceptor,
    // },
    // 全局添加 Pipe
    {
      provide: APP_PIPE,
      useClass: ValidatePipe,
    },
    // 全局添加 ExceptionFilter
    {
      provide: APP_FILTER,
      useClass: TestFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LogMiddleware).forRoutes('hello*');
  }
}
