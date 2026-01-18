import { Test, TestingModule } from '@nestjs/testing';
import { TicketsService } from './tickets.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
  },
  ticket: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  message: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('TicketsService', () => {
  let service: TicketsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TicketsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<TicketsService>(TicketsService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('getTickets logic by Roles', () => {
    it('should return tickets for USER role', async () => {
      const userId = 999;
      mockPrismaService.ticket.findMany.mockResolvedValue([{ id: 101 }]);

      const result = await service.getTickets(userId, 'USER');

      expect(mockPrismaService.ticket.findMany).toHaveBeenCalledWith({
        where: { users: { some: { userId } } },
        include: { users: true, messages: true },
      });
      expect(result).toHaveLength(1);
    });

    it('should return tickets for SUPPORT role with OR logic', async () => {
      const userId = 2;
      mockPrismaService.ticket.findMany.mockResolvedValue([]);
      
      await service.getTickets(userId, 'SUPPORT');

      expect(mockPrismaService.ticket.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { status: 'OPEN' },
            {
              AND: [
                { users: { some: { userId } } },
                { status: { in: ['IN_PROGRESS', 'CLOSED'] } },
              ],
            },
          ],
        },
        include: { users: true, messages: true },
      });
    });

    it('should return all tickets for ADMIN role', async () => {
      await service.getTickets(1, 'ADMIN');

      expect(mockPrismaService.ticket.findMany).toHaveBeenCalledWith({
        where: {},
        include: { users: true, messages: true },
      });
    });
  });

  describe('Ticket Operations (CRUD)', () => {
    it('should create a ticket', async () => {
      const dto = { title: 'Test', description: 'Desc', userId: 1 };
      mockPrismaService.ticket.create.mockResolvedValue({ id: 1, ...dto });

      await service.createTicket(dto);
      expect(mockPrismaService.ticket.create).toHaveBeenCalled();
    });

    it('should patch a ticket', async () => {
      const ticketId = 1;
      const updateData = { status: 'CLOSED' };
      
      mockPrismaService.ticket.findUnique.mockResolvedValue({ id: ticketId });
      mockPrismaService.ticket.update.mockResolvedValue({ id: ticketId, status: 'CLOSED' });

      await service.patchTicket(ticketId, updateData as any);

      expect(mockPrismaService.ticket.findUnique).toHaveBeenCalledWith({ where: { id: ticketId } });
      expect(mockPrismaService.ticket.update).toHaveBeenCalled();
    });

    it('should throw NotFoundException if ticket not found during delete', async () => {
      mockPrismaService.ticket.findUnique.mockResolvedValue(null);
      await expect(service.deleteTicket(1)).rejects.toThrow(NotFoundException);
    });

    it('should delete a ticket if it exists', async () => {
      const ticketId = 1;
      mockPrismaService.ticket.findUnique.mockResolvedValue({ id: ticketId });
      mockPrismaService.ticket.delete.mockResolvedValue({ id: ticketId });

      await service.deleteTicket(ticketId);
      expect(mockPrismaService.ticket.delete).toHaveBeenCalledWith({ where: { id: ticketId } });
    });
  });

  describe('Messages and Users', () => {
    it('should add a user to a ticket', async () => {
      const ticketId = 1;
      const userId = 5;
      mockPrismaService.ticket.update.mockResolvedValue({ id: ticketId });

      await service.addUserToTicket(ticketId, userId);
      expect(mockPrismaService.ticket.update).toHaveBeenCalledWith({
        where: { id: ticketId },
        data: { users: { create: { userId } } },
        include: { users: true, messages: true },
      });
    });

    it('should create a message', async () => {
      const ticketId = 1;
      const messageData = { message: 'Hello', userId: 1 };
      mockPrismaService.message.create.mockResolvedValue({ id: 1, ...messageData });

      await service.addMessage(ticketId, messageData);

      expect(mockPrismaService.message.create).toHaveBeenCalledWith({
        data: {
          message: 'Hello',
          image: undefined,
          userId: 1,
          ticketId: 1,
        },
      });
    });

    it('should get message by ID or throw error', async () => {
      mockPrismaService.message.findUnique.mockResolvedValue(null);
      await expect(service.getMessageById(99)).rejects.toThrow(NotFoundException);

      const msg = { id: 1, message: 'Hi' };
      mockPrismaService.message.findUnique.mockResolvedValue(msg);
      expect(await service.getMessageById(1)).toEqual(msg);
    });
  });
});
