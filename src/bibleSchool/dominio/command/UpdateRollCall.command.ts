import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateRollCallCommand {
  @ApiProperty()
  @IsString({ message: 'Nome deve ser string' })
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsString({ message: 'Classe deve ser string' })
  @IsOptional()
  class: string;

  @ApiProperty()
  @IsString({ message: 'Perfil deve ser string' })
  @IsOptional()
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
