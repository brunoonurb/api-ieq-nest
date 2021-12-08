import { ApiResponseProperty } from '@nestjs/swagger';

export class ForgotPasswordQuery {
  @ApiResponseProperty()
  email: string;  

  @ApiResponseProperty()
  message: string;
  constructor(message: string, email: string) {
    this.message = message;
    this.email = email;
  }
}
