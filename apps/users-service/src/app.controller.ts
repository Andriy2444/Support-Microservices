import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from Users Service!';
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'users-service',
      timestamp: new Date().toISOString()
    };
  }
}
