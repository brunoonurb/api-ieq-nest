import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail, IsOptional,
  IsString
} from 'class-validator';

export class UpdateUserCommand {
  @ApiProperty()
  @IsString({ message: 'Nome deve ser string' })
  @IsOptional()
  id: string;

  @ApiProperty()
  @IsString({ message: 'Nome deve ser string' })
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString({ message: 'Email deve ser string' })
  @IsOptional()
  @IsEmail({}, { message: 'Email precisa ser um endereço válido.' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'SEnha deve ser string' })
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsString({ message: 'perfil deve ser string' })
  @IsOptional()
  profile: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sector: string;

  @ApiProperty()
  @IsOptional()
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
