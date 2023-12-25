import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { BbbService } from './bbb.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

@Controller('bbb')
export class BbbController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(
    private readonly bbbService: BbbService,
    private moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    console.log('bbbcontroller onModuleInit');
  }
  onApplicationBootstrap() {
    console.log('bbbcontroller onApplicationBootstrap');
  }
  onModuleDestroy() {
    console.log('bbbcontroller onModuleDestroy');
  }
  beforeApplicationShutdown() {
    console.log('bbbcontroller beforeApplicationShutdown');
  }
  onApplicationShutdown() {
    const bbbService = this.moduleRef.get<BbbService>(BbbService);
    console.log('-----------------', bbbService.findAll());
    console.log('bbbcontroller onApplicationShutdown');
  }

  @Post()
  create(@Body() createBbbDto: CreateBbbDto) {
    return this.bbbService.create(createBbbDto);
  }

  @Get()
  findAll() {
    return this.bbbService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bbbService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBbbDto: UpdateBbbDto) {
    return this.bbbService.update(+id, updateBbbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bbbService.remove(+id);
  }
}
