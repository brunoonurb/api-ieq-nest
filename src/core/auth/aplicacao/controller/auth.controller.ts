import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AuthService } from '../service/auth.service';
import { AuthLoginDto } from '../../dominio/dto/auth-login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Realizar login no sistema' })
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }
}
