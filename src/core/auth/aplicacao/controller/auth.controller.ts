import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionQuery } from 'src/core/exeptionFilters/query/Exception.query';
import { AuthLoginCommand } from '../../dominio/command/auth-login.command';
import { ForgotPasswordCommand } from '../../dominio/command/ForgotPassword.command';
import { ValideCodePasswordCommand } from '../../dominio/command/ValideCodePassword.command';
import { AuthLoginQuery } from '../../dominio/query/auth-login.query';
import { ForgotPasswordQuery } from '../../dominio/query/ForgotPassword.query';
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

  @Post('/forgotPassword')
  @ApiOperation({ summary: 'Send password code' })
  @ApiResponse({
    status: 200,
    description: 'Retonr sucesso',
    type: ForgotPasswordQuery,
  })
  async forgotPassword(
    @Body() forgotPasswordCommand: ForgotPasswordCommand,
  ): Promise<ForgotPasswordQuery> {
    return this.authService.forgotPassword(forgotPasswordCommand);
  }

  @Post('/validatePasswordCode')
  @ApiOperation({ summary: 'Validate code sent to user' })
  @ApiResponse({
    status: 200,
    description: 'Retonr sucesso',
    type: AuthLoginQuery,
  })
  async validatePasswordCode(
    @Body() codePasswordCommand: ValideCodePasswordCommand,
  ): Promise<AuthLoginQuery> {
    return this.authService.validatePasswordCode(codePasswordCommand);
  }
}
