import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailController } from './aplicacao/controller/Mail.controller';
import { MailService } from './aplicacao/service/Mail.service';
import { MailRepository } from './infra/repository/monngoDb/Mail.repository';
import { SenMailService } from './infra/service/mailer/SenMail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MailRepository]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          port: 587,
          host: configService.get<string>('MAIL_HOST'),
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: 'IEQ-CENTENARIO" 🌏 " <ieqcentenario.ti@gmail.com>',
        },
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            secure: true, // use SSL
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, SenMailService],
  exports: [MailService],
})
export class MailModule {}