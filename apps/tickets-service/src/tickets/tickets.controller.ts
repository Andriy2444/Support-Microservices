import { Body, Controller, Get, Post, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';

class CreateTicketDto {
  @ApiProperty({ example: 'Проблема з доступом' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Не можу зайти в кабінет' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 1, description: 'ID користувача' })
  @IsInt()
  userId: number;
}

class UpdateTicketDto {
  // @ApiProperty({ example: 'Оновлена назва', required: false })
  // @IsString()
  // @IsOptional()
  // title?: string;

  // @ApiProperty({ example: 'Оновлений опис', required: false })
  // @IsString()
  // @IsOptional()
  // description?: string;

  @ApiProperty({ example: 'CLOSED', enum: ['OPEN', 'IN_PROGRESS', 'CLOSED'], required: false })
  @IsOptional()
  status?: any;
}

class CreateMessageDto {
  @ApiProperty({ example: 1, description: 'User Id' })
  @IsInt()
  userId: number;

  @ApiProperty({ example: 'Пр, чо ніц не паше йоу', description: 'Message text' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'https://i.imgur.com/cVACPds.jpeg', required: false })
  @IsString()
  @IsOptional()
  image?: string;
}

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tickets' })
  @ApiResponse({ status: 200, description: 'Return all tickets' })
  async getAllTickets() {
    return this.ticketService.getAllTickets();
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user tickets' })
  @ApiResponse({ status: 200, description: 'Return user tickets' })
  async getTickets(@Param('userId', ParseIntPipe) userId: number) {
    return this.ticketService.getTickets(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new ticket' })
  @ApiResponse({ status: 201, description: 'The ticket has been successfully created' })
  async createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket(createTicketDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update ticket' })
  @ApiResponse({ status: 200, description: 'Ticket updated' })
  async patchTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto
  ) {
    return this.ticketService.patchTicket(id, updateTicketDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete ticket' })
  @ApiResponse({ status: 200, description: 'Ticket deleted' })
  async deleteTicket(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.deleteTicket(id);
  }

  @Post(':id/users/:userId')
  @ApiOperation({ summary: 'Add user to ticket' })
  async addUserToTicket(
    @Param('id', ParseIntPipe) id: number,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.ticketService.addUserToTicket(id, userId);
  }

  @Post(':ticketId/messages')
  @ApiOperation({ summary: 'Send Message' })
  @ApiResponse({ status: 201, description: 'Message sent' })
  async createMessage(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return this.ticketService.addMessage(ticketId, createMessageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all ticket messages' })
  async getMessages(@Param('ticketId', ParseIntPipe) ticketId: number) {
    return this.ticketService.getTicketMessages(ticketId);
  }
  
}
