import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { RedisModule } from './redis/redis.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [XxxModule, PersonModule, RedisModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
