import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Optional,
  UseFilters,
  Headers,
  Ip,
  Session,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaFilter } from './aaa.filter';

@Controller()
export class AppController {
  // 可选注入，如果找不到依赖，也不会报错
  @Optional()
  @Inject('Ankkaya')
  private readonly ankkaya: string;

  constructor(private readonly appService: AppService) {}

  @Get()
  @UseFilters(AaaFilter)
  // 获取某个请求头或全部请求头
  getHello(
    @Headers('Accept') accept: string,
    @Headers() headers: Record<string, any>,
  ): string {
    throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }

  @Get('/ip')
  ip(@Ip() ip: string) {
    console.log(ip);
  }

  @Get('/session')
  session(@Session() session) {
    console.log(session);
    if (!session.count) {
      session.count = 0;
    }
    session.count = session.count + 1;
    return session.count;
  }

  @Get('/user')
  @Render('user')
  user() {
    return {
      name: 'ankkaya',
      age: 18,
    };
  }
}
