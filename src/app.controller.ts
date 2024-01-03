import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  HttpStatus,
  HttpException,
  ParseFloatPipe,
  ParseBoolPipe,
  ParseArrayPipe,
  Param,
  ParseEnumPipe,
  ParseUUIDPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AaaPipe } from './aaa.pipe';

enum Ggg {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(@Query('aa') aa: string): string {
  //   return aa;
  // }

  // 转为整数
  @Get()
  getHello(
    @Query(
      'aa',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_FOUND,
      }),
    )
    aa: string,
  ): string {
    return aa + 1;
  }

  // 自定义异常
  @Get('self')
  getSelf(
    @Query(
      'aa',
      new ParseIntPipe({
        exceptionFactory: (msg) => {
          console.log(msg);
          throw new HttpException('xxx' + msg, HttpStatus.NOT_IMPLEMENTED);
        },
      }),
    )
    aa: string,
  ): string {
    return aa + 1;
  }

  // 转换为浮点型
  @Get('float')
  getFloat(@Query('aa', ParseFloatPipe) aa: number): number {
    return aa + 1;
  }

  // boolean
  @Get('boolean')
  getBoolean(@Query('aa', ParseBoolPipe) aa: boolean): boolean {
    return aa;
  }

  // Array
  @Get('array')
  getArray(
    @Query(
      'aa',
      new ParseArrayPipe({
        items: Number,
      }),
    )
    aa: number[],
  ) {
    return aa.reduce((total, item) => total + item, 0);
  }

  // Array 指定分隔符
  @Get('array2')
  getArray2(
    @Query(
      'aa',
      new ParseArrayPipe({
        separator: '..',
        optional: true,
      }),
    )
    aa: number[],
  ) {
    return aa;
  }

  // 枚举 EnumPipe
  @Get('gg/:enum')
  gg(@Param('enum', new ParseEnumPipe(Ggg)) e: Ggg) {
    return e;
  }

  // uuid
  @Get('hh/:uuid')
  hh(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
    return uuid;
  }

  // DefaultValuePipe
  @Get('kkk')
  kkk(@Query('kkk', new DefaultValuePipe('aaa')) kkk: string) {
    return kkk;
  }

  // 自定义 pipe
  @Get('nnn/:bbb')
  nnn(@Query('aaa', AaaPipe) aaa: string, @Param('bbb', AaaPipe) bbb: number) {
    return aaa + bbb;
  }
}
