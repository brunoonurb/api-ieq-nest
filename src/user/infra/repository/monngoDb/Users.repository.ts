import { Injectable } from '@nestjs/common';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { CreateUserCommand } from 'src/user/dominio/command/CreateUser.command';
import { UpdateUserCommand } from 'src/user/dominio/command/UpdateUser.command';
import { User } from 'src/user/dominio/user.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository
} from 'typeorm';

@Injectable()
@EntityRepository(User)
class UsersRepository extends Repository<User> {
  include(user: CreateUserCommand): Promise<User> | Boolean {
    try {
      const createUser = this.create(user);
      return this.save(createUser);
    } catch (e) {
      return false;
    }
  }

  alter(user: UpdateUserCommand): Promise<User> | Boolean {
    try {
      return this.save(user);
    } catch (e) {
      return false;
    }
  }

  list(pageOptions: PaginationOptions): Promise<[User[], number]> {
    return this.findAndCount({
      skip: pageOptions.pageActual,
      take: pageOptions.limit,
    });
  }

  search(id: string): Promise<User> {
    return this.findOne({
      where: { id },
    });
  }

  searchByEmail(email: string): Promise<User> {
    return this.findOne({
      where: { email },
    });
  }

  searchByEmailPassword(email: string, password: string): Promise<User> {
    return this.findOne({
      where: { email, password },
    });
  }

  deleteCuston(id: string): Promise<DeleteResult> | boolean {
    try {
      return this.delete({
        id,
      });
    } catch (e) {
      return false;
    }
  }

  mergeCuston(mergeIntoEntity: User, entityLikes): User {
    return this.merge(mergeIntoEntity, entityLikes);
  }
}

export { UsersRepository };
