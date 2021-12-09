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
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { ExceptionQuery } from 'src/core/exeptionFilters/query/Exception.query';
import { PaginationDto } from 'src/core/pagination/dto/Pagination.dto';
import { Pagination } from 'src/core/pagination/Pagination';
import { PaginationOptions } from 'src/core/pagination/Pagination.options';
import { RequestDto } from 'src/core/request/DTO/Request.dto';
import { ResetPasswordCommand } from 'src/user/dominio/command/resetPassword.command';
import { UpdateUserCommand } from 'src/user/dominio/command/UpdateUser.command';
import { User } from 'src/user/dominio/user.entity';
import { CreateUserCommand } from '../../dominio/command/CreateUser.command';
import { ListUserCommand } from '../../dominio/command/ListUser.command';
import { UserService } from '../service/User.service';

@ApiTags('User')
@ApiBearerAuth()
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Register user' })
  async create(@Body() user: CreateUserCommand) {
    return this.service.create(user);
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user' })
  async update(@Param('id') id: string, @Body() user: UpdateUserCommand) {
    return this.service.update(id, user);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List users' })
  @ApiResponse({ status: 200, description: 'Paged result', type: Pagination })
  @ApiResponse({
    status: 500,
    description: 'Exection error',
    type: ExceptionQuery,
  })
  async list(
    @Query() paginationDTO: PaginationDto,
    @Query() filtros: ListUserCommand,
    @Request() request: RequestDto,
  ): Promise<Pagination<User>> {
    const { pageActual, limit } = paginationDTO;

    const pageOptions = new PaginationOptions(pageActual, limit);

    const result = await this.service.list(pageOptions);

    return result;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search user' })
  @ApiResponse({ status: 200, description: 'User', type: User })
  @ApiResponse({
    status: 500,
    description: 'Exection error',
    type: ExceptionQuery,
  })
  async search(
    @Param('id') id: string,
    @Request() request: RequestDto,
  ): Promise<User> {
    const result = await this.service.search(id);

    return result;
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete user' })
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  @Put('/:id/resetPassword')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'reset Password user' })
  async resetPassword(
    @Param('id') id: string,
    @Body() resetPasswordCommand: ResetPasswordCommand,
  ) {
    return this.service.resetPassword(id, resetPasswordCommand);
  }
}
