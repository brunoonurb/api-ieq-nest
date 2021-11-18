import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypt } from 'src/core/utils/Crypt';
import { UsersRepository } from 'src/user/infra/repository/monngoDb/Users.repository';
import { AuthLoginCommand } from '../../dominio/command/auth-login.command';
import { AuthLoginQuery } from '../../dominio/query/auth-login.query';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService,
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
    return {
      user: payload,
      token,
    };
  }
}
