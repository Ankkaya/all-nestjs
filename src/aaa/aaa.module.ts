import { Module, Global } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';

// 设定为全局引入
@Global()
@Module({
  controllers: [AaaController],
  providers: [AaaService],
  // 指定导出的 provider
  exports: [AaaService],
})
export class AaaModule {}
