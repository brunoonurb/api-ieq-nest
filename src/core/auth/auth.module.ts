import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/user/infra/repository/monngoDb/Users.repository';
import { AuthController } from './aplicacao/controller/auth.controller';
import { AuthService } from './aplicacao/service/auth.service';
import { JwtStrategy } from './jwt.strategy';

require('dotenv').config();

@Module({
  imports: [
    PassportModule,
    HttpModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
