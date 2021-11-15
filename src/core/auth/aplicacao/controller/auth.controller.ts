import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginCommand } from '../../dominio/command/auth-login.command';
import { AuthService } from '../service/auth.service';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Log in to the system' })
  async login(@Body() authLoginDto: AuthLoginCommand) {
    return this.authService.login(authLoginDto);
  }
}
