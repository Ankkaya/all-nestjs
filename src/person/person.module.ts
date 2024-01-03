import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { AaaMiddleware } from '../aaa.middleware';

@Module({
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AaaMiddleware).forRoutes('*');
  }
}
