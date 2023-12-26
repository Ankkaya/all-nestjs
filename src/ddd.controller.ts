import {
  Controller,
  Get,
  HostParam,
  Req,
  Res,
  Next,
  HttpCode,
  Header,
  Redirect,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Controller({ host: ':host.0.0.1', path: 'ddd' })
export class DddController {
  @Get('ddd')
  hello(@HostParam('host') host) {
    return host;
  }

  @Get('ddd2')
  hello2(@Req() req: Request) {
    console.log(req);
    console.log(req.hostname);
    console.log(req.url);
  }

  // 返回响应需要手动返回响应
  @Get('res')
  res(@Res() res: Response) {
    res.end('res');
  }

  // 通过 passthrough 返回响应
  @Get('passthrough')
  passthrough(@Res({ passthrough: true }) res: Response) {
    return 'passthrough';
  }

  // 有两个 handler 处理同一个路由，通过 next() 调用下一个 handler
  @Get('next')
  next(@Next() next: NextFunction) {
    console.log('next1');
    next();
    return '111';
  }

  @Get('next')
  // 修改返回的状态码
  @HttpCode(222)
  // 修改返回的响应头
  @Header('aaa', 'bbb')
  // 重定向
  @Redirect('http://juejin.cn')
  next2() {
    console.log('next2');
    return 'next2';
  }
}
