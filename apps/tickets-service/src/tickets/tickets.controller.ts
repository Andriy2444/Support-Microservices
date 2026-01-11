import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { IsString, IsInt, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import {
  ApiOperation,
  ApiTags,
  ApiProperty,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RolesGuard, Roles } from './roles.guard';

enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

// DTO без userId — він береться з JWT
class CreateTicketDto {
  @ApiProperty({ example: 'Проблема з доступом' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Не можу зайти в кабінет' })
  @IsString()
  @IsNotEmpty()
  description: string;
}

class UpdateTicketDto {
  @ApiProperty({ example: 'CLOSED', enum: TicketStatus, required: false })
  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus;
}

class CreateMessageDto {
  @ApiProperty({ example: 'Текст повідомлення' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ example: 'https://i.imgur.com/cVACPds.jpeg', required: false })
  @IsString()
  @IsOptional()
  image?: string;
}

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  @Roles('ADMIN', 'SUPPORT')
  @ApiOperation({ summary: 'Get all tickets' })
  async getAllTickets() {
    return this.ticketService.getAllTickets();
  }

  @Get('my')
  @Roles('ADMIN', 'SUPPORT', 'USER')
  @ApiOperation({ summary: 'Get my tickets' })
  async getMyTickets(@Request() req) {
    const { userId, role } = req.user;
    return this.ticketService.getTickets(userId, role);
  }

  @Post()
  @Roles('ADMIN', 'SUPPORT', 'USER')
  @ApiOperation({ summary: 'Create a new ticket' })
  async createTicket(@Request() req, @Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.createTicket({
      ...createTicketDto,
      userId: req.user.userId, // беремо userId з JWT
    });
  }

  @Patch(':id')
  @Roles('ADMIN', 'SUPPORT')
  @ApiOperation({ summary: 'Update ticket' })
  async patchTicket(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTicketDto: UpdateTicketDto
  ) {
    return this.ticketService.patchTicket(id, updateTicketDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'SUPPORT')
  @ApiOperation({ summary: 'Delete ticket' })
  async deleteTicket(@Param('id', ParseIntPipe) id: number) {
    return this.ticketService.deleteTicket(id);
  }

  @Post(':id/users')
  @Roles('ADMIN', 'SUPPORT')
  @ApiOperation({ summary: 'Add user to ticket (Admin/Support only)' })
  async addUserToTicket(
    @Param('id', ParseIntPipe) id: number,
    @Request() req
  ) {
    const userId = req.user.userId; // беремо з JWT
    return this.ticketService.addUserToTicket(id, userId);
  }

  @Post(':ticketId/messages')
  @Roles('ADMIN', 'SUPPORT', 'USER')
  @ApiOperation({ summary: 'Send message to ticket' })
  async createMessage(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Request() req,
    @Body() createMessageDto: CreateMessageDto
  ) {
    const userId = req.user.userId;
    return this.ticketService.addMessage(ticketId, { ...createMessageDto, userId });
  }

  @Get(':ticketId/messages')
  @Roles('ADMIN', 'SUPPORT', 'USER')
  @ApiOperation({ summary: 'Get ticket messages' })
  async getTicketMessages(@Param('ticketId', ParseIntPipe) ticketId: number) {
    return this.ticketService.getTicketMessages(ticketId);
  }

  @Get('messages/:messageId')
  @Roles('ADMIN', 'SUPPORT')
  @ApiOperation({ summary: 'Get message by id' })
  async getMessageById(@Param('messageId', ParseIntPipe) messageId: number) {
    return this.ticketService.getMessageById(messageId);
  }
}
