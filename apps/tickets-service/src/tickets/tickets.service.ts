import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/client'; // Імпортуйте типи з вашого клієнта

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTickets() {
    return this.prisma.ticket.findMany();
  }

  async createTicket(data: { title: string; description: string; userId: number }) {
    return this.prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        userId: data.userId,
        status: 'OPEN', // Значення за замовчуванням (або можна передати з data)
      },
    });
  }
}
