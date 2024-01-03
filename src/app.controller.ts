import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hello2')
  getHello2(): string {
    return this.appService.getHello();
  }

  @Get('hello3')
  getHello3(): string {
    return this.appService.getHello();
  }

  @Get('world')
  getWorld(): string {
    return this.appService.getHello();
  }

  @Get('world2')
  getWorld2(): string {
    return this.appService.getHello();
  }
}
