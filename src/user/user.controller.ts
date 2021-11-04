import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './DTO/CreateUser.dto';
import { UserService } from './user.service';

@ApiTags('Autenticação')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Realizar login no sistema' })
  async create(@Body() user: CreateUserDTO) {
    return this.service.create(user);
  }

  @Get('/')
  @ApiOperation({ summary: 'Realizar login no sistema' })
  async list() {
    const result = await this.service.list();
console.log(result);

    return result;
  }
}
