import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

// @Catch(BadRequestException)
// export class HelloFilter implements ExceptionFilter {
//   catch(exception: BadRequestException, host: ArgumentsHost) {
//     const http = host.switchToHttp();
//     const response = http.getResponse<Response>();

//     const statusCode = exception.getStatus();

//     response.status(statusCode).json({
//       code: statusCode,
//       message: exception.message,
//       error: 'Bad Request',
//       xxx: 111,
//     });
//   }
// }

// 处理其他异常，因为 HttpException 是 BadRequestException 和 BadGateWayException 父类

@Catch(HttpException)
export class HelloFilter implements ExceptionFilter {
  @Inject(AppService)
  private service: AppService;

  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();

    const statusCode = exception.getStatus();
    // 适配自定义 filter 时，对 pipe 异常处理
    const res = exception.getResponse() as { message: string[] };

    response.status(statusCode).json({
      code: statusCode,
      message: res?.message?.join ? res?.message?.join(',') : exception.message,
      error: 'Bad Request',
      xxx: 111,
      yyy: this.service.getHello(),
    });
  }
}
