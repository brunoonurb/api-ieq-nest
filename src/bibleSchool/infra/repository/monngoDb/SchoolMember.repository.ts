import { Injectable } from '@nestjs/common';
import { CreateSchoolMemberCommand } from 'src/bibleSchool/dominio/command/CreateSchoolMember.command';
import { UpdateSchoolMemberCommand } from 'src/bibleSchool/dominio/command/UpdateSchoolMember.command';
import { SchoolMember } from 'src/bibleSchool/dominio/SchoolMember.entity';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';

@Injectable()
@EntityRepository(SchoolMember)
class SchoolMembersRepository extends Repository<SchoolMember> {
  include(
    SchoolMember: CreateSchoolMemberCommand,
  ): Promise<SchoolMember> | Boolean {
    try {
      const createSchoolMember = this.create(SchoolMember);
      return this.save(createSchoolMember);
    } catch (e) {
      return false;
    }
  }

  alter(
    SchoolMember: UpdateSchoolMemberCommand,
  ): Promise<SchoolMember> | Boolean {
    try {
      return this.save(SchoolMember);
    } catch (e) {
      return false;
    }
  }

  list(pageOptions: PaginationOptions): Promise<[SchoolMember[], number]> {
    return this.findAndCount({
      skip: pageOptions.pageActual,
      take: pageOptions.limit,
    });
  }

  search(id: string): Promise<SchoolMember> {
    return this.findOne({
      where: { id },
    });
  }

  searchName(name: string): Promise<SchoolMember> {
    return this.findOne({
      where: { name },
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

  mergeCuston(mergeIntoEntity: SchoolMember, entityLikes): SchoolMember {
    return this.merge(mergeIntoEntity, entityLikes);
  }
}

export { SchoolMembersRepository };

