import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { DddController } from './ddd.controller';

// @Global 把模块标记为全局模块，这样 exports 的 provider 可以直接注入
@Global()
@Module({
  imports: [XxxModule, PersonModule],
  controllers: [AppController, DddController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
