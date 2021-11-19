import { Injectable } from '@nestjs/common';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import {
  CreateSendMailCommand
} from 'src/mail/dominio/command/CreateSendMail.command';
import { Mail } from 'src/mail/dominio/Mail.entity';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(Mail)
class MailRepository extends Repository<Mail> {
  include(mail: CreateSendMailCommand): Promise<Mail> | Boolean {
    try {
      const createMail = this.create(mail);
      return this.save(createMail);
    } catch (e) {
      return false;
    }
  }

  list(pageOptions: PaginationOptions): Promise<[Mail[], number]> {
    return this.findAndCount({
      skip: pageOptions.pageActual,
      take: pageOptions.limit,
    });
  }

  search(id: string): Promise<Mail> {
    return this.findOne({
      where: { id },
    });
  }
}

export { MailRepository };
