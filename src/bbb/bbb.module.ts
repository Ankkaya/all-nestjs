import {
  Module,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { BbbService } from './bbb.service';
import { BbbController } from './bbb.controller';
import { AaaModule } from 'src/aaa/aaa.module';

@Module({
  // 导入 AaaModule, 设置未全局引入，可去掉 AaaModule，也可以正常引入
  imports: [AaaModule],
  controllers: [BbbController],
  providers: [BbbService],
})
export class BbbModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('bbbmodule onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('bbbmodule onApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log('bbbmodule onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('bbbmodule beforeApplicationShutdown');
  }
  onApplicationShutdown() {
    console.log('bbbmodule onApplicationShutdown');
  }
}
