import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  Query,
  UseFilters,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
// 作用整个 Controller
// @UseInterceptors(TimeInterceptor)
// @UsePipes(ValidatePipe)
// @UseFilters(TestFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  // 作用单个 handler
  @UseInterceptors(TimeInterceptor)
  getHello2(): string {
    console.log('hello');
    return 'Hello World!';
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  getHello3(@Query('num') num: number): string {
    console.log('aaa');
    return 'Hello World!';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number) {
    return num + 1;
  }
}
