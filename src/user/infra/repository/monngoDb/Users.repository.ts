import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()

@EntityRepository(User)
class UsersRepository extends Repository<User> {

}

export { UsersRepository };

// @EntityRepository(Cnh)
// export class CnhRepository extends Repository<Cnh> //implements ICnhRepository 
// {
// @EntityRepository(User)
// class UsersRepository extends Repository<User> {

// }

// export { UsersRepository };

// }
