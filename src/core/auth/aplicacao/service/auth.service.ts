import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    try {
      // const user = buscar dados no bnco de daodos;
      const user = {
        email: 'dev10@lwtecnologia.com.br',
        name: 'bruno',
        profile: 'Adm',
        sector: 'Adm',
        sectorsActuated: ['ebd', 'adm'],
        sub: '212321324',
      };

      if (user && user.email === email) {
        return user;
      }
      return null;
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = {
      email: 'dev10@lwtecnologia.com.br',
      name: 'bruno',
      profile: 'Adm',
      sector: 'Adm',
      sectorsActuated: ['ebd', 'adm'],
      sub: '212321324',
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
