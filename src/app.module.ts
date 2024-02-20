import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { ConfigModule } from '@nestjs/config';
import { BbbModule } from './bbb/bbb.module';
import * as path from 'path';
import config2 from 'config2';

@Module({
  imports: [
    XxxModule,
    PersonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        path.join(process.cwd(), '.aaa.env'),
        path.join(process.cwd(), '.env'),
      ],
      load: [config2],
    }),
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
