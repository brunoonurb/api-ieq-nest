import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolMemberModule } from './bibleSchool/SchoolMember.module';
import { AuthModule } from './core/auth/auth.module';
import { BadRequestExceptionFilter } from './core/exeptionFilters/BadRequestException.filter';
import { HttpExceptionFilter } from './core/exeptionFilters/HttpException.filter';
import { UnauthorizedExceptionFilter } from './core/exeptionFilters/UnauthorizedException.filter';
import { IsCpfValidoConstraint } from './core/validator/IsCpfValido.validator';
import { MailModule } from './mail/Mail.module';
import { UserModule } from './user/User.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    SchoolMemberModule,
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
  ],
  controllers: [AppController],
  providers: [
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
