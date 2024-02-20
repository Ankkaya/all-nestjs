import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XxxModule } from './xxx/xxx.module';
import { PersonModule } from './person/person.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createClient } from 'redis';
import { Aaa } from './aaa.entity';

@Module({
  imports: [
    XxxModule,
    PersonModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '10.10.10.250',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'aaa',
      synchronize: true,
      logging: true,
      entities: [Aaa],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: '10.10.10.250',
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
