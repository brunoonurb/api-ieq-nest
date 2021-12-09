import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ResetPasswordCommand {
  @ApiProperty()
  @IsString({ message: 'Senha deve ser string' })
  password: string;
}
