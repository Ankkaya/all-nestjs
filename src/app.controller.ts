import { Controller, Get, Request, Response } from '@nestjs/common';
import { AppService } from './app.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { PassThrough } from 'stream';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(
  //   @Request() request: FastifyRequest,
  //   @Response() reply: FastifyReply,
  // ) {
  //   reply.header('url', request.url);
  //   reply.send('hello');
  // }

  // 设置 passthrough: true, 可 return 请求结果
  @Get()
  getHello(
    @Request() request: FastifyRequest,
    @Response({ passthrough: true }) reply: FastifyReply,
  ) {
    reply.header('url', request.url);
    return 'hello';
  }
}
