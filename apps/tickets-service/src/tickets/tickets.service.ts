import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, UserRole } from '../generated/client';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTickets() {
    return this.prisma.ticket.findMany({
      include: { users: true, messages: true },
    });
  }

  async getTickets(userId: number, role: UserRole) {
    let whereClause: Prisma.TicketWhereInput = {};

    switch (role) {
      case UserRole.USER:
        whereClause = { users: { some: { userId } } };
        break;

      case UserRole.SUPPORT:
        whereClause = {
          OR: [
            { status: 'OPEN' },
            {
              AND: [
                { users: { some: { userId } } },
                { status: { in: ['IN_PROGRESS', 'CLOSED'] } },
              ],
            },
          ],
        };
        break;

      case UserRole.ADMIN:
        whereClause = {};
        break;
    }

    return this.prisma.ticket.findMany({
      where: whereClause,
      include: { users: true, messages: true },
    });
  }

  async createTicket(data: {
    title: string;
    description: string;
    userId: number;
  }) {
    return this.prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        status: 'OPEN',
        users: { create: { userId: data.userId } },
      },
      include: { users: true },
    });
  }

  async patchTicket(id: number, data: Prisma.TicketUpdateInput) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return this.prisma.ticket.update({
      where: { id },
      data,
      include: { users: true, messages: true },
    });
  }

  async deleteTicket(id: number) {
    const ticket = await this.prisma.ticket.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return this.prisma.ticket.delete({ where: { id } });
  }

  async addUserToTicket(ticketId: number, userId: number) {
    return this.prisma.ticket.update({
      where: { id: ticketId },
      data: { users: { create: { userId } } },
      include: { users: true, messages: true },
    });
  }

  async addMessage(
    ticketId: number,
    data: { message: string; image?: string; userId: number },
  ) {
    return this.prisma.message.create({
      data: {
        message: data.message,
        image: data.image,
        userId: data.userId,
        ticketId,
      },
    });
  }

  async getTicketMessages(ticketId: number) {
    return this.prisma.message.findMany({
      where: { ticketId },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getMessageById(messageId: number) {
    const message = await this.prisma.message.findUnique({
      where: { id: messageId },
    });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }
}
