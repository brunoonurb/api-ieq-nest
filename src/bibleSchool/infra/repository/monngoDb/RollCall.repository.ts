import { Injectable } from '@nestjs/common';
import { RollCall } from 'src/bibleSchool/dominio/RollCall.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(RollCall)
class RollCallsRepository extends Repository<RollCall> {
 
}

export { RollCallsRepository };

