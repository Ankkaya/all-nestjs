import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';

@Module({
  imports: [
    XxxModule,
    PersonModule,
    BbbModule.register({
      aaa: 1,
      bbb: 2,
    }),
    CccModule.register({
      aaa: 1,
      bbb: 4,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
