import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

class ExceptionQuery {
  @ApiPropertyOptional()
  timestamp: Date;

  @ApiPropertyOptional()
  status: number;

  @ApiPropertyOptional()
  message: string;

  @ApiPropertyOptional()
  path: string;
}

export { ExceptionQuery };
