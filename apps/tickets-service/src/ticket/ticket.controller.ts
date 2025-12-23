import { Controller, Get } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  async getTickets() {
    return this.ticketService.getAllTickets();
  }
}
