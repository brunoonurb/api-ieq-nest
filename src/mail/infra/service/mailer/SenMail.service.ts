import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { SendMailCommand } from 'src/mail/dominio/command/SendMaill.command';

@Injectable()
export class SenMailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(mailOptions: SendMailCommand<object>) {
    try {
      const { response } = await this.mailerService.sendMail({
        to: mailOptions.to, // list of receivers
        from: 'IEQ-CENTENARIO" 🌏 " <ieqcentenario.ti@gmail.com>', // sender address
        subject: mailOptions.subject, // Subject line
        html: '<b>welcome html</b>', // HTML body content
      });

      return {
        responseCode: 250,
        response,
        to: mailOptions.to,
        subject: mailOptions.subject,
      };
    } catch (error) {
      const { response: result, responseCode: status } = error;
      const responseCode = status ? status : 500;
      const response = result ? result : error.message;
      return {
        responseCode,
        response,
        to: mailOptions.to,
        subject: mailOptions.subject,
      };
    }
  }

  public example2(): void {
    this.mailerService
      .sendMail({
        to: 'brupedroso17@gmail.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  public example3(): void {
    this.mailerService
      .sendMail({
        to: 'test@nestjs.com',
        from: 'noreply@nestjs.com',
        subject: 'Testing Nest Mailermodule with template ✔',
        template: '/index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
