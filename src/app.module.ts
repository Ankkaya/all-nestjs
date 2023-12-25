import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';

@Module({
  imports: [XxxModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
