import { Controller, Get } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tickets' }) // Опис методу
  @ApiResponse({ status: 200, description: 'Return all tickets' })
  async getTickets() {
    return this.ticketService.getAllTickets();
  }
}
