import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginCommand {

  @ApiProperty()
  @IsEmail({}, { message: 'Email precisa ser email válido.' })
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Senha é obrigatório ' })
  password: string;
}
