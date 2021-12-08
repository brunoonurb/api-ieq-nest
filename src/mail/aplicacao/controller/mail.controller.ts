import {
  Body,
  Controller,
  Get,
  Query,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
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

  @Get('/send')
  @ApiOperation({ summary: 'send email ' })
  @UseGuards(JwtAuthGuard)
  async sending(
    @Body() sendMailCommand: SendMailCommand<IContextRegisterUserCommand>,
  ) {
    const result = await this.mailService.sending(sendMailCommand);
    return result;
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List mail send' })
  @ApiResponse({ status: 200, description: 'Paged result', type: Pagination })
  @ApiResponse({
    status: 500,
    description: 'Exection error',
    type: ExceptionQuery,
  })
  async list(
    @Query() paginationDTO: PaginationDto,
  ): Promise<Pagination<Mail>> {
    const { pageActual, limit } = paginationDTO;

    const pageOptions = new PaginationOptions(pageActual, limit);

    const result = await this.mailService.list(pageOptions);

    return result;
  }
}
