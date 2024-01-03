import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  // 全局 interceptor 无法注入 service，需要在模块中引入 APP_INTERCEPTOR token
  constructor(private appService: AppService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(this.appService.getHello());
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After ... ${Date.now() - now}ms`)));
  }
}
