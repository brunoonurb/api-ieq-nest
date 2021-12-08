import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty, IsString
} from 'class-validator';

export class ValideCodePasswordCommand {
  @ApiProperty()
  @IsString({ message: 'Email deve ser string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email precisa ser um endereço válido.' })
  email: string;

  @ApiProperty()
  // @IsString({ message: 'codigo deve ser string' })
  @IsNotEmpty({ message: 'Codigo é obrigatório' })
  code: string;
}
