import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { createClient } from 'redis';

@Module({
  imports: [XxxModule, PersonModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6380,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
})
export class AppModule {}
