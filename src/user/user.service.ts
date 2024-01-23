import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private manager: EntityManager;

  @InjectRepository(User)
  private userRepository: Repository<User>;

  create(createUserDto: CreateUserDto) {
    // return 'This action adds a new user';
    // this.manager.save(User, createUserDto);

    this.manager.getRepository(User).save(createUserDto);
  }

  findAll() {
    // return `This action returns all user`;
    return this.manager.find(User);
  }

  findOne(id: number) {
    // return `This action returns a #${id} user`;
    return this.manager.findOne(User, {
      where: { id },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return `This action updates a #${id} user`;
    return this.manager.save(User, {
      id: id,
      ...updateUserDto,
    });
  }

  remove(id: number) {
    // return `This action removes a #${id} user`;
    return this.manager.delete(User, id);
  }
}
