import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/mail/Mail.module';
import { SchoolMemberController } from './aplicacao/controller/SchoolMember.controller';
import { SchoolMemberService } from './aplicacao/service/SchoolMember.service';
import { SchoolMembersRepository } from './infra/repository/monngoDb/SchoolMember.repository';

@Module({
  imports: [MailModule, TypeOrmModule.forFeature([SchoolMembersRepository])],
  controllers: [SchoolMemberController],
  providers: [SchoolMemberService],
})
export class SchoolMemberModule {}
