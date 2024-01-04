import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HelloFilter } from './hello.filter';
import { Ooo } from './dto/ooo.dto';
import { UnLoginException } from './unlogin.filter';

// controller 层的过滤器
// @UseFilters(HelloFilter)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // 单个 handler 的过滤器
  // @UseFilters(HelloFilter)
  getHello(): string {
    // 内置错误码
    // throw new HttpException('xxxx', HttpStatus.BAD_REQUEST);

    // 抛出登录异常
    throw new UnLoginException();

    // 抛出具体错误
    // throw new BadRequestException('xxxx1');
    return this.appService.getHello();
  }

  @Post('aaa')
  aaa(@Body() aaaDto: Ooo) {
    return 'success';
  }
}
