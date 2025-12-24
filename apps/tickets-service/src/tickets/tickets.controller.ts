import { Body, Controller, Get, Post } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

class CreateTicketDto {
  @ApiProperty({ example: 'Проблема з доступом' })
  title: string;

  @ApiProperty({ example: 'Не можу зайти в кабінет' })
  description: string;

  @ApiProperty({ example: 1 })
  userId: number;
}

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

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'The ticket has been successfully created' })
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }
}
