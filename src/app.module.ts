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
    JwtModule.register({
      secret: 'ankkaya',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
