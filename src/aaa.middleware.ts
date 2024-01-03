import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { PersonService } from './person/person.service';

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  // 构造器注入
  constructor(private readonly personService: PersonService) {}

  use(req: any, res: any, next: () => void) {
    console.log('before');
    console.log('------------' + this.personService.findAll());
    next();
    console.log('after');
  }
}
