import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pagination } from 'src/core/pagination/Pagination';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { Crypt } from 'src/core/utils/Crypt';
import { MailService } from 'src/mail/aplicacao/service/Mail.service';
import {
  IContextRegisterUserCommand
} from 'src/mail/dominio/command/IContextRegisterUser.command';
import { SendMailCommand } from 'src/mail/dominio/command/SendMaill.command';
import { UpdateUserCommand } from 'src/user/dominio/command/UpdateUser.command';
import { User } from 'src/user/dominio/user.entity';
import { CreateUserCommand } from '../../dominio/command/CreateUser.command';
import { UsersRepository } from '../../infra/repository/monngoDb/Users.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailService: MailService,
  ) {}

  async list(pageOptions: PaginationOptions): Promise<Pagination<User>> {
    const [data, totalRecords] = await this.usersRepository.list(pageOptions);

    if (!data)
      throw new HttpException(
        'Nenhum usuário encontrado',
        HttpStatus.NOT_FOUND,
      );

    const dataPaginado = new Pagination({
      data,
      totalRecords,
      pageOptions,
    });
    return dataPaginado;
  }

  async create(createUser: CreateUserCommand): Promise<any> {
    const { email, password, ...restUser } = createUser;
    const userAlreadyExists = await this.usersRepository.searchByEmail(email);

    if (userAlreadyExists) {
      throw new HttpException('Usário já existente', HttpStatus.CONFLICT);
    }

    const crypt = new Crypt();
    const passwordHash = await crypt.hash(password, 10);

    const user = {
      password: passwordHash,
      email,
      ...restUser,
    };
    const result = await this.usersRepository.include(user);

    if (!result) {
      throw new HttpException(
        'Não possível cadastrar usuário',
        HttpStatus.NOT_FOUND,
      );
    }

    const context = {
      name: 'bruno',
      title: 'Seja Bem Vindo',
      description: 'Esse email foi cadastrado no sistema IEQ-CENTENARIO!',
      password: password,
      email: email,
      link: process.env.URL_WELCOME,
    };

    const sendEmailCommand = new SendMailCommand<IContextRegisterUserCommand>(
      email,
      'Email Casdastrado no sistema IEQ-CENTENARIO',
      './welcomeMail',
      context,
    );

    const resultSendEmail = this.mailService.sending(sendEmailCommand);

    return result;
  }

  async update(id: string, updateUser: UpdateUserCommand): Promise<any> {
    const userAlreadyExists = await this.usersRepository.search(id);

    if (!userAlreadyExists) {
      throw new HttpException('Usário não encotrado', HttpStatus.NOT_FOUND);
    }

    const crypt = new Crypt();
    const { password, email } = updateUser;

    if (email !== undefined && email !== userAlreadyExists.email) {
      const userEmailAlreadyExists = await this.usersRepository.searchByEmail(
        updateUser.email,
      );
      if (userEmailAlreadyExists) {
        throw new HttpException('Email já cadastrado', HttpStatus.NOT_FOUND);
      }
    }

    if (password !== undefined) {
      const passwordHash = await crypt.hash(password, 10);
      updateUser.password = passwordHash;
    }
    const updateUserMerge = this.usersRepository.mergeCuston(
      userAlreadyExists,
      updateUser,
    );

    const result = await this.usersRepository.alter(updateUserMerge);

    if (!result) {
      throw new HttpException(
        'Não possível cadastrar usuário',
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async search(id: string): Promise<User> {
    const user = await this.usersRepository.search(id);

    if (!user) {
      throw new HttpException('Usário não encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async delete(id: string): Promise<void> {
    const userAlreadyExists = await this.usersRepository.search(id);

    if (!userAlreadyExists) {
      throw new HttpException('Usário não encotrado', HttpStatus.NOT_FOUND);
    }

    const result = await this.usersRepository.deleteCuston(id);

    if (!result) {
      throw new HttpException(
        'Não possível excluir usuário',
        HttpStatus.NOT_FOUND,
      );
    }
    throw new HttpException('Usuário excluido com sucesso', HttpStatus.OK);
  }

}
