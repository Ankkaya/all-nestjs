import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AaaException } from './AaaException';
import { Request, Response } from 'express';

@Catch(AaaException)
export class AaaFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();

      response.status(500).json({
        aaa: exception['aaa'],
        bbb: exception['bbb'],
      });
    } else if (host.getType() === 'ws') {
    } else if (host.getType() === 'rpc') {
    }
  }
}
