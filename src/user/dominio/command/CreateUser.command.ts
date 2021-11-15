import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserCommand {
  @ApiProperty()
  @IsString({ message: 'Nome deve ser string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Email deve ser string' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail({}, { message: 'Email precisa ser um endereço válido.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'SEnha deve ser string' })
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  password: string;

  @ApiProperty()
  @IsString({ message: 'perfil deve ser string' })
  @IsNotEmpty({ message: 'Perfil é obrigatório' })
  profile: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sector: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Setores de atuação é obrigatório' })
  @IsArray({ message: 'Setor Atuação deve ser array' })
  @Type(() => String)
  @ArrayMinSize(1, { message: 'Setor Atuação deve conter minino uma escolha' })
  sectorsActuated: string[];

  @ApiProperty()
  @IsString({ message: 'Telefone deve ser string' })
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  codePassword: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;

  @ApiProperty()
  @IsString()
  @IsOptional()
  pwdToken: string;

  @ApiProperty()
  @IsDate({ message: 'pwdExpires deve ter formado data' })
  @Type(() => Date)
  @IsOptional()
  pwdExpires: Date;

  @ApiProperty()
  @IsDate({ message: 'created_at deve ter formado data' })
  @IsOptional()
  @Type(() => Date)
  created_at: Date;
}
