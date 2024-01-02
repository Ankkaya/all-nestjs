import { Injectable } from '@nestjs/common';
import { DddService } from './ddd.service';
import { CccService } from './ccc.service';

@Injectable()
export class AppService {
  constructor(
    private dddService: DddService,
    private cccService: CccService,
  ) {}

  getHello(): string {
    return this.dddService.ddd() + this.cccService.ccc();
  }
}
