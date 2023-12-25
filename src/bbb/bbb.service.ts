import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { AaaService } from 'src/aaa/aaa.service';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';

@Injectable()
export class BbbService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private aaaService: AaaService) {}

  onModuleInit() {
    console.log('bbbService onModuleInit');
  }

  onApplicationBootstrap() {
    console.log('bbbService onApplicationBootstrap');
  }

  onModuleDestroy() {
    console.log('bbbService onModuleDestroy');
  }

  beforeApplicationShutdown() {
    console.log('bbbService beforeApplicationShutdown');
  }

  onApplicationShutdown() {
    console.log('bbbService onApplicationShutdown');
  }

  create(createBbbDto: CreateBbbDto) {
    return 'This action adds a new bbb';
  }

  findAll() {
    return `This action returns all bbb` + this.aaaService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb`;
  }

  update(id: number, updateBbbDto: UpdateBbbDto) {
    return `This action updates a #${id} bbb`;
  }

  remove(id: number) {
    return `This action removes a #${id} bbb`;
  }
}
