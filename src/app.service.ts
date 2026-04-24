import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService { // first test to see if it works
  getHello(): string {
    return 'Hello World!';
  }
}
