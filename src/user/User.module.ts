import { UserController } from './aplicacao/controller/User.controller';
import { UserService } from './aplicacao/service/User.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './infra/repository/monngoDb/Users.repository';
import { MailModule } from 'src/mail/Mail.module';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
