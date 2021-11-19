import { Body, Controller, Get, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionQuery } from 'src/core/exeptionFilters/query/Exception.query';
import { PaginationDto } from 'src/core/pagination/dto/Pagination.dto';
import { Pagination } from 'src/core/pagination/Pagination';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { RequestDto } from 'src/core/request/DTO/Request.dto';
import { IContextRegisterUserCommand } from 'src/mail/dominio/command/IContextRegisterUser.command';
import { SendMailCommand } from 'src/mail/dominio/command/SendMaill.command';
import { Mail } from 'src/mail/dominio/Mail.entity';
import { MailService } from '../service/Mail.service';

@ApiTags('Mail')
@Controller({ path: 'mail', version: '1' })
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get('/sendRegisterUser')
  @ApiOperation({ summary: 'send email' })
  async sendRegisterUser(
    @Body() sendMailCommand: SendMailCommand<IContextRegisterUserCommand>,
  ) {
    // return 'hello'
    const result = await this.mailService.sendRegisterUser(sendMailCommand);
    console.log('resultado');
    console.log(result);
    return sendMailCommand;
  }

  @Get('/send')
  @ApiOperation({ summary: 'send email' })
  async send(@Body() ob) {
    const context = { name: 'string;', email: 'string', password: 'string' };
    const sendMailCommand = new SendMailCommand<IContextRegisterUserCommand>(
      'teste send ',
      ' string',
      ' string',
      context,
    );
    const result = await this.mailService.sendRegisterUser(sendMailCommand);
    console.log('resultado');
    console.log(result);

    return sendMailCommand;
  }

  @Get('/')
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List mail send' })
  @ApiResponse({ status: 200, description: 'Paged result', type: Pagination })
  @ApiResponse({
    status: 500,
    description: 'Exection error',
    type: ExceptionQuery,
  })
  async list(
    @Query() paginationDTO: PaginationDto,
    @Request() request: RequestDto,
  ): Promise<Pagination<Mail>> {
    const { pageActual, limit } = paginationDTO;

    const pageOptions = new PaginationOptions(pageActual, limit);

    const result = await this.mailService.list(pageOptions);

    return result;
  }
}
