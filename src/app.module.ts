import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [XxxModule, PersonModule],
  controllers: [AppController],
  // AppService 是 class 也是 token
  // providers: [AppService],
  // 字符串指定 token，useClass 指定 class

  providers: [
    AppService,
    // 通过参数注入其他 provider
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      // 声明两个 token， 一个是字符串 token 的 person，一个是类 token 的 AppService
      // 上面的 person 和 appService 注入
      inject: ['person', AppService],
    },
    {
      provide: 'app_service',
      useClass: AppService,
    },
    // 注入指定值
    {
      provide: 'person',
      useValue: {
        name: 'ankkaya',
        age: 20,
      },
    },
    // 动态提供 provide 的值
    {
      provide: 'random',
      useFactory: () => {
        return Math.random();
      },
    },
    // 异步操作
    {
      provide: 'async',
      useFactory: async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve('async');
          }, 2000);
        });
        return {
          name: 'async',
          desc: 'async',
        };
      },
    },
    // 设置别名
    {
      provide: 'alias',
      useExisting: 'person',
    },
  ],
})
export class AppModule {}
