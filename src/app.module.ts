import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    XxxModule,
    PersonModule,
    //   JwtModule.register({
    //   secret: 'ankkaya',
    //   signOptions: {
    //     expiresIn: '7d'
    //   }
    // })
    // 使用 registerAsync，通过 useFactory 异步拿到 option 传入
    JwtModule.registerAsync({
      async useFactory() {
        await 111;
        return {
          secret: 'ankkaya',
          signOptions: {
            expiresIn: '7d',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
