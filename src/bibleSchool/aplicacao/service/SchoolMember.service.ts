import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateSchoolMemberCommand } from 'src/bibleSchool/dominio/command/UpdateSchoolMember.command';
import { SchoolMember } from 'src/bibleSchool/dominio/SchoolMember.entity';
import { SchoolMembersRepository } from 'src/bibleSchool/infra/repository/monngoDb/SchoolMember.repository';
import { Pagination } from 'src/core/pagination/Pagination';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { CreateSchoolMemberCommand } from '../../dominio/command/CreateSchoolMember.command';

@Injectable()
export class SchoolMemberService {
  constructor(
    private readonly SchoolMembersRepository: SchoolMembersRepository,
  ) {}

  async list(
    pageOptions: PaginationOptions,
  ): Promise<Pagination<SchoolMember>> {
    const [data, totalRecords] = await this.SchoolMembersRepository.list(
      pageOptions,
    );

    if (!data)
      throw new HttpException(
        'Nenhum aluno/professor encontrado',
        HttpStatus.NOT_FOUND,
      );

    const dataPaginado = new Pagination({
      data,
      totalRecords,
      pageOptions,
    });
    return dataPaginado;
  }

  async create(createSchoolMember: CreateSchoolMemberCommand): Promise<any> {
    const { name, ...restSchoolMember } = createSchoolMember;
    const SchoolMemberAlreadyExists =
      await this.SchoolMembersRepository.searchName(name);

    if (SchoolMemberAlreadyExists) {
      throw new HttpException(
        'Aluno/Professor com esse nome já existente',
        HttpStatus.CONFLICT,
      );
    }

    const result = await this.SchoolMembersRepository.include(
      createSchoolMember,
    );

    if (!result) {
      throw new HttpException(
        'Não possível cadastrar aluno/professor',
        HttpStatus.BAD_REQUEST,
      );
    }

    return result;
  }

  async update(
    id: string,
    updateSchoolMember: UpdateSchoolMemberCommand,
  ): Promise<any> {
    const SchoolMemberAlreadyExists = await this.SchoolMembersRepository.search(
      id,
    );

    if (!SchoolMemberAlreadyExists) {
      throw new HttpException(
        'Aluno/Professor não encotrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateSchoolMemberMerge = this.SchoolMembersRepository.mergeCuston(
      SchoolMemberAlreadyExists,
      updateSchoolMember,
    );

    const result = await this.SchoolMembersRepository.alter(
      updateSchoolMemberMerge,
    );

    if (!result) {
      throw new HttpException(
        'Não foi possível atualizar aluno/professor',
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async search(id: string): Promise<SchoolMember> {
    const SchoolMember = await this.SchoolMembersRepository.search(id);

    if (!SchoolMember) {
      throw new HttpException(
        'Aluno/Professor não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    return SchoolMember;
  }

  async delete(id: string): Promise<void> {
    const SchoolMemberAlreadyExists = await this.SchoolMembersRepository.search(
      id,
    );

    if (!SchoolMemberAlreadyExists) {
      throw new HttpException(
        'Aluno/Professor não encotrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const result = await this.SchoolMembersRepository.deleteCuston(id);

    if (!result) {
      throw new HttpException(
        'Não possível excluir aluno/professor',
        HttpStatus.BAD_REQUEST,
      );
    }
    throw new HttpException(
      'Aluno/professor excluido com sucesso',
      HttpStatus.OK,
    );
  }
}
