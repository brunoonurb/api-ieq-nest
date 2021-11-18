import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionQuery } from 'src/core/exeptionFilters/query/Exception.query';
import { AuthLoginCommand } from '../../dominio/command/auth-login.command';
import { AuthLoginQuery } from '../../dominio/query/auth-login.query';
import { AuthService } from '../service/auth.service';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Log in to the system' })
  @ApiResponse({
    status: 200,
    description: 'Autentication success',
    type: AuthLoginQuery,
  })
  @ApiResponse({
    status: 500,
    description: 'Exection error',
    type: ExceptionQuery,
  })
  async login(@Body() authLoginDto: AuthLoginCommand) {
    return this.authService.login(authLoginDto);
  }
}
