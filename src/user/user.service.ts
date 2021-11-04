import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './DTO/CreateUser.dto';
import { UsersRepository } from './infra/repository/monngoDb/Users.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async list(): Promise<User[]> {

    return await this.usersRepository.find();


    
  }

  async create(user: CreateUserDTO): Promise<any> {
    return this.usersRepository.save(user);
  }
}
