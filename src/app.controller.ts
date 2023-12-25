import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // 构造器注入，指定类
  // constructor(private readonly appService: AppService) {}

  // 属性注入
  // @Inject(AppService)
  // private readonly appService: AppService

  // token 是字符串，注入时候需要手动指定注入对象的 token
  // constructor(@Inject('app_service') private readonly appService: AppService) {}

  // 获取通过 useValue 注入的对象
  // constructor(
  //   @Inject('app_service') private readonly appService: AppService,
  //   @Inject('person') private readonly person: { name: string; age: number },
  // ) {}

  // 获取 useFactory 动态注入对象
  constructor(
    @Inject('app_service') private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('random') private readonly random: number,
    @Inject('async') private readonly async: { name: string; desc: string }, // 异步注入
    @Inject('alias') private readonly alias: { name: string; desc: string }, // 别名
  ) {}

  @Get()
  getHello(): string {
    console.log(this.alias);
    console.log(this.random);
    console.log(this.async);
    console.log(this.person);
    return this.appService.getHello();
  }
}
