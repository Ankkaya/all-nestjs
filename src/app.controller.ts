import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MyValidationPipe } from './my-validation.pipe';
import { Ppp, Ttt } from './dto/Ttt.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Post('ttt')
  // ooo2(@Body(MyValidationPipe) obj: Ttt) {
  //   console.log(obj);
  // }

  // 添加全局 interceptor 后，这里就不需要再使用自定义 pipe
  @Post('ttt')
  ooo2(@Body() obj: Ttt) {
    console.log(obj);
  }

  @Post('ppp')
  ppp(@Body() obj: Ppp) {
    console.log(obj);
  }
}
