import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pagination } from 'src/core/pagination/Pagination';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { IContextRegisterUserCommand } from 'src/mail/dominio/command/IContextRegisterUser.command';
import { SendMailCommand } from 'src/mail/dominio/command/SendMaill.command';
import { MailRepository } from 'src/mail/infra/repository/monngoDb/Mail.repository';
import { SenMailService } from 'src/mail/infra/service/mailer/SenMail.service';

@Injectable()
export class MailService {
  constructor(
    private readonly senMailService: SenMailService,
    private readonly mailRepository: MailRepository,
  ) {}

  async sendRegisterUser(
    mailOptions: SendMailCommand<IContextRegisterUserCommand>,
  ) {
    const resultSend = await this.senMailService.send(mailOptions);

    const createSendMail = {
      to: resultSend.to,
      subject: resultSend.subject,
      responseCode: resultSend.responseCode,
      response: resultSend.response,
      type: 'envio_email',
    };

    const resultInsert = await this.mailRepository.include(createSendMail);

    return resultInsert;
  }
  async list(pageOptions: PaginationOptions): Promise<Pagination<any>> {
    const [data, totalRecords] = await this.mailRepository.list(pageOptions);

    if (!data)
      throw new HttpException(
        'Nenhum registro encontrado',
        HttpStatus.NOT_FOUND,
      );

    const dataPaginado = new Pagination({
      data,
      totalRecords,
      pageOptions,
    });
    return dataPaginado;
  }
}
