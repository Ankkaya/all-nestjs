import { LoggerService, LogLevel } from '@nestjs/common';
import { createLogger, format, Logger, transports } from 'winston';
import * as chalk from 'chalk';
import * as dayjs from 'dayjs';

export class MyLogger implements LoggerService {
  private logger: Logger;
  constructor(options) {
    this.logger = createLogger(options);
  }

  log(message: string, context: string) {
    // console.log(`-----log-----[${context}]-----`, message);
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context, time });
  }
  error(message: string, context: string) {
    // console.log(`-----error-----[${context}]-----`, message);
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('error', message, { context, time });
  }
  warn(message: string, context: string) {
    // console.log(`-----warn-----[${context}]-----`, message);
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('warn', message, { context, time });
  }
}
