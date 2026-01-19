import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from Tickets Service!';
  }

  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'tickets-service',
      timestamp: new Date().toISOString(),
    };
  }
}
