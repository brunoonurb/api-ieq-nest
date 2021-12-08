import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from 'src/core/utils/Crypt';
import { MailService } from 'src/mail/aplicacao/service/Mail.service';
import { IForgotPasswordCommand } from 'src/mail/dominio/command/IContextRegisterUser.command';
import { SendMailCommand } from 'src/mail/dominio/command/SendMaill.command';
import { UsersRepository } from 'src/user/infra/repository/monngoDb/Users.repository';
import { AuthLoginCommand } from '../../dominio/command/auth-login.command';
import { ForgotPasswordCommand } from '../../dominio/command/ForgotPassword.command';
import { ValideCodePasswordCommand } from '../../dominio/command/ValideCodePassword.command';
import { AuthLoginQuery } from '../../dominio/query/auth-login.query';
import { ForgotPasswordQuery } from '../../dominio/query/ForgotPassword.query';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(emailValidate: string): Promise<any> {
    try {
      const user = await this.usersRepository.searchByEmail(emailValidate);

      if (user && user.email === emailValidate) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(userLogin: AuthLoginCommand): Promise<AuthLoginQuery> {
    const user = await this.usersRepository.searchByEmail(userLogin.email);

    if (!user)
      throw new HttpException('Email incorreto!', HttpStatus.UNAUTHORIZED);

    const { name, email, password, sector, profile, sectorsActuated, id } =
      user;

    const crypt = new Crypt();
    const passwordOk = await crypt.compareSync(userLogin.password, password);
    if (!user || !passwordOk)
      throw new HttpException('Senha incorreta!', HttpStatus.UNAUTHORIZED);

    const payload = {
      name,
      email,
      profile,
      sector,
      sectorsActuated,
      sub: id,
    };
    const token = this.jwtService.sign(payload);
    return new AuthLoginQuery(payload, token);
  }

  async forgotPassword(
    forgotPasswordCommand: ForgotPasswordCommand,
  ): Promise<ForgotPasswordQuery> {
    const { email } = forgotPasswordCommand;
    const user = await this.usersRepository.searchByEmail(email);

    if (!user) {
      throw new HttpException('Usário não encontrado', HttpStatus.NOT_FOUND);
    }

    const codePassword = `${Math.floor(Math.random() * 9999)}_${
      Math.floor(Math.random() * 999) * 999
    }`;

    this.usersRepository.mergeCuston(user, { codePassword });
    const result = await this.usersRepository.alter(user);

    if (!result) {
      throw new HttpException(
        'Não foi possível salvar codigo de verificação!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const context = {
      name: user.name,
      email,
      codePassword,
    };
    const sendEmailCommand = new SendMailCommand<IForgotPasswordCommand>(
      email,
      'Recuperar senha - IEQ-CENTENARIO',
      './forgotPassword',
      context,
    );
    const resultSendEmail = await this.mailService.sending(sendEmailCommand);

    if (!resultSendEmail) {
      throw new HttpException(
        'Não foi possivel realizar envio de email?',
        HttpStatus.BAD_REQUEST,
      );
    }

    return new ForgotPasswordQuery('Email enviado com sucesso!', email);
  }

  async validatePasswordCode(
    codePasswordCommand: ValideCodePasswordCommand,
  ): Promise<AuthLoginQuery> {
    const { email: emailRequest, code } = codePasswordCommand;
    const user = await this.usersRepository.searchByEmail(emailRequest);

    if (!user) {
      throw new HttpException('Usário não encontrado', HttpStatus.NOT_FOUND);
    }
    const { name, email, sector, profile, sectorsActuated, id, codePassword } =
      user;

    if (code !== codePassword) {
      throw new HttpException('Código incorreto(s)!', HttpStatus.NOT_FOUND);
    }

    const payload = {
      name,
      email,
      profile,
      sector,
      sectorsActuated,
      sub: id,
    };
    const token = this.jwtService.sign(payload);

    return new AuthLoginQuery(payload, token);
  }
}
