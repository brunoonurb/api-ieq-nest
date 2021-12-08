import { ApiProperty } from '@nestjs/swagger';

export class IPayloadQuery {
  email: string;
  name: string;
  profile: string;
  sector: string;
  sectorsActuated: Array<string>;
  sub: string;
}

export class AuthLoginQuery {
  @ApiProperty()
  user: IPayloadQuery;

  @ApiProperty()
  token: string;

  constructor(user: IPayloadQuery, token: string) {
    this.user = user;
    this.token = token;
  }
}
