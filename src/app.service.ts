import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {

    const tese = process.env.JWT_SECRET
    return `Hello World! ${tese}`;
  }
}
