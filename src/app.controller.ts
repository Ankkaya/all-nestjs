import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { MyLogger } from './MyLogger';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // private logger = new MyLogger();

  // 全局声明 winston 模块，直接注入，不需要 new
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger;

  @Get()
  getHello(): string {
    this.logger.log('Hello World!', AppController.name);
    return this.appService.getHello();
  }
}
