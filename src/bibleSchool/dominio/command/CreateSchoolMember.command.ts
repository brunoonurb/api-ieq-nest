import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSchoolMemberCommand {
  @ApiProperty()
  @IsString({ message: 'Nome deve ser string' })
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString({ message: 'Classe deve ser string' })
  @IsNotEmpty({ message: 'Classe é obrigatório' })
  class: string;

  @ApiProperty()
  @IsString({ message: 'Perfil deve ser string' })
  @IsNotEmpty({ message: 'Perfil é obrigatório' })
  profile: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  visitor: boolean = false;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;

}
