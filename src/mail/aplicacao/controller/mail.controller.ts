import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginQuery } from 'src/core/auth/dominio/query/auth-login.query';
import { ExceptionQuery } from 'src/core/exeptionFilters/query/Exception.query';
import { ExampleService } from '../service/mail.service';


@ApiTags('Mail')
@Controller({ path: 'mail', version: '1' })
export class MailController {
  constructor(private readonly mailService: ExampleService) {}


  @Get('/teste')
  @ApiOperation({ summary: 'send email' })
  async email() {
// return 'hello'
    return this.mailService.example();
  }
}
