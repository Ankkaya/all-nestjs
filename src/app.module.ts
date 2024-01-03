import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { AaaMiddleware } from './aaa.middleware';

@Module({
  imports: [XxxModule, PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     // 全部路由
//     // consumer.apply(AaaMiddleware).forRoutes('*');
//     consumer
//       .apply(AaaMiddleware)
//       .forRoutes({ path: 'hello*', method: RequestMethod.GET });
//     consumer
//       .apply(AaaMiddleware)
//       .forRoutes({ path: 'world2', method: RequestMethod.GET });
//   }
// }
export class AppModule {}
