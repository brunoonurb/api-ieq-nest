import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateSchoolMemberCommand } from 'src/bibleSchool/dominio/command/UpdateSchoolMember.command';
import { SchoolMember } from 'src/bibleSchool/dominio/SchoolMember.entity';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { ExceptionQuery } from 'src/core/exeptionFilters/query/Exception.query';
import { PaginationDto } from 'src/core/pagination/dto/Pagination.dto';
import { Pagination } from 'src/core/pagination/Pagination';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { RequestDto } from 'src/core/request/DTO/Request.dto';
import { CreateSchoolMemberCommand } from '../../dominio/command/CreateSchoolMember.command';
import { ListSchoolMemberCommand } from '../../dominio/command/ListSchoolMember.command';
import { SchoolMemberService } from '../service/SchoolMember.service';

@ApiTags('SchoolMember')
@ApiBearerAuth()
@Controller({ path: 'bibleSchool/SchoolMembers', version: '1' })
export class SchoolMemberController {
  constructor(private readonly service: SchoolMemberService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Register SchoolMember' })
  async create(@Body() SchoolMember: CreateSchoolMemberCommand) {
    return this.service.create(SchoolMember);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update SchoolMember' })
  async update(
    @Param('id') id: string,
    @Body() SchoolMember: UpdateSchoolMemberCommand,
  ) {
    return this.service.update(id, SchoolMember);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List SchoolMembers' })
  @ApiResponse({ status: 200, description: 'Paged result', type: Pagination })
  @ApiResponse({
    status: 500,
    description: 'Exection error',
    type: ExceptionQuery,
  })
  async list(
    @Query() paginationDTO: PaginationDto,
    @Query() filtros: ListSchoolMemberCommand,
    @Request() request: RequestDto,
  ): Promise<Pagination<SchoolMember>> {
    const { pageActual, limit } = paginationDTO;

    const pageOptions = new PaginationOptions(pageActual, limit);

    const result = await this.service.list(pageOptions);

    return result;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search SchoolMember' })
  @ApiResponse({ status: 200, description: 'SchoolMember', type: SchoolMember })
  @ApiResponse({
    status: 500,
    description: 'Exection error',
    type: ExceptionQuery,
  })
  async search(
    @Param('id') id: string,
    @Request() request: RequestDto,
  ): Promise<SchoolMember> {
    const result = await this.service.search(id);

    return result;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete SchoolMember' })
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
