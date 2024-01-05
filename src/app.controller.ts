import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  HttpException,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { storage } from './storage';
import { FileSizeValidationPipePipe } from './file-size-validation-pipe.pipe';
import { MyFileValidator } from './MyFileValidator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('aaa')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    console.log('file', file);
    console.log('body', body);
  }

  @Post('bbb')
  @UseInterceptors(
    FilesInterceptor('bbb', 3, {
      dest: 'uploads',
    }),
  )
  uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('files', files);
    console.log('body', body);
  }

  @Post('ccc')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'aaa',
          maxCount: 1,
        },
        {
          name: 'bbb',
          maxCount: 3,
        },
      ],
      {
        dest: 'uploads',
      },
    ),
  )
  uploadFiles2(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('files', files);
    console.log('body', body);
  }

  // 不指定 file 字段
  @Post('ddd')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: storage,
    }),
  )
  uploadFiles3(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body,
  ) {
    console.log('files', files);
    console.log('body', body);
  }

  // 自定义 pipe
  @Post('eee')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile4(
    @UploadedFile(FileSizeValidationPipePipe) file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('file', file);
    console.log('body', body);
  }

  // 内置文件校验逻辑
  @Post('fff')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile5(
    @UploadedFile(
      new ParseFilePipe({
        exceptionFactory: (err) => {
          throw new HttpException('xxx' + err, 404);
        },
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('file', file);
    console.log('body', body);
  }

  // 自定义 validator
  @Post('ggg')
  @UseInterceptors(
    FileInterceptor('aaa', {
      dest: 'uploads',
    }),
  )
  uploadFile6(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MyFileValidator({})],
      }),
    )
    file: Express.Multer.File,
    @Body() body,
  ) {
    console.log('file', file);
    console.log('body', body);
  }
}
