import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

class PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  limit: number;

  @ApiPropertyOptional()
  @IsOptional()
  pageActual: number;
}

export { PaginationDto };
