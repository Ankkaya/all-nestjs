import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { existsSync } from 'fs';
import * as sharp from 'sharp';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: 'uploads',
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
  }

  @Get('compression')
  async compression(
    @Query('path') filePath: string,
    @Query('color', ParseIntPipe) color: number,
    @Res() res: Response,
  ) {
    console.log('filePath', filePath);
    console.log('color', color);

    if (!existsSync(filePath)) {
      throw new BadRequestException('File not found');
    }

    const data = await sharp(filePath, {
      animated: true,
      limitInputPixels: false,
    })
      .gif({
        colours: color,
      })
      .toBuffer();

    res.set('Content-Disposition', `attachment; filename="dest.gif"`);
    res.send(data);
    // return 'success';
  }
}
