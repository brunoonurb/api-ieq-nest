import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordCommand {
  @ApiProperty()
  @IsString({ message: 'Email deve ser string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email precisa ser um endereço válido.' })
  email: string;
}
