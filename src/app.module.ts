import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { BadRequestExceptionFilter } from './core/exeptionFilters/BadRequestException.filter';
import { HttpExceptionFilter } from './core/exeptionFilters/HttpException.filter';
import { UnauthorizedExceptionFilter } from './core/exeptionFilters/UnauthorizedException.filter';
import { IsCpfValidoConstraint } from './core/validator/IsCpfValido.validator';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
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
