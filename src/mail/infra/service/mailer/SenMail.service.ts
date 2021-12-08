import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailCommand } from 'src/mail/dominio/command/SendMaill.command';

@Injectable()
export class SenMailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(mailOptions: SendMailCommand<object>) {
    const { to, subject, template, context } = mailOptions;
    try {
      const { response } = await this.mailerService.sendMail({
        to: to, // list of receivers
        from: 'IEQ-CENTENARIO" 🌏 " <ieqcentenario.ti@gmail.com>', // sender address
        subject: subject, // Subject line
        // html: '<b>welcome html</b>', // HTML body content
        template: template, // The `.pug` or `.hbs` extension is appended automatically.
        context: context,
      });

      return {
        responseCode: 250,
        response,
        to: to,
        subject: subject,
      };
    } catch (error) {
      const { response: result, responseCode: status } = error;
      const responseCode = status ? status : 500;
      const response = result ? result : error.message;
      return {
        responseCode,
        response,
        to: to,
        subject: subject,
      };
    }
  }
}
