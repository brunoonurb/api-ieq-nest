import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { BadRequestExceptionFilter } from './core/exeptionFilters/BadRequestException.filter';
import { HttpExceptionFilter } from './core/exeptionFilters/HttpException.filter';
import { UnauthorizedExceptionFilter } from './core/exeptionFilters/UnauthorizedException.filter';
import { IsCpfValidoConstraint } from './core/validator/IsCpfValido.validator';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ExampleService } from './mail/aplicacao/service/mail.service';
import { MailController } from './mail/aplicacao/controller/mail.controller';
import { UserModule } from './user/uuser.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGODB_URL'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        useNewUrlParser: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    // BullModule.forRoot({
    //   redis: {
    //     host: 'localhost',
    //     port: 6379,
    //   },
    // }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory:async (configService: ConfigService) => ({
        transport: {
          port: 587,
          host:configService.get<string>('MAIL_HOST'),
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
          dir: process.cwd() + '/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            secure: true, // use SSL
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, MailController],
  providers: [
    ExampleService,
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: UnauthorizedExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: BadRequestExceptionFilter,
    },
    IsCpfValidoConstraint,
  ],
})
export class AppModule {}
