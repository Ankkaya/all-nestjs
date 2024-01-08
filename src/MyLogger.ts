import { LoggerService, ConsoleLogger } from '@nestjs/common';

// export class MyLogger implements LoggerService {
//   log(message: string, context: string) {
//     console.log(`-----log-----[${context}]-----`, message);
//   }
//   error(message: string, context: string) {
//     console.error(`-----error-----[${context}]-----`, message);
//   }
//   warn(message: string, context: string) {
//     console.warn(`-----warn-----[${context}]-----`, message);
//   }
//   debug(message: string) {
//     console.debug(message);
//   }
//   verbose(message: string) {
//     console.log(message);
//   }
// }

// 重写部分方法，ConsoleLogger 实现了 LoggerService 类
export class MyLogger extends ConsoleLogger {
  log(message: string, context: string) {
    console.log(`[${context}]`, message);
  }
}
