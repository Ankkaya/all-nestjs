import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { APP_FILTER } from '@nestjs/core';
import { HelloFilter } from './hello.filter';
import { UnLoginFilter } from './unlogin.filter';

@Module({
  imports: [XxxModule, PersonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HelloFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnLoginFilter,
    },
  ],
})
export class AppModule {}
