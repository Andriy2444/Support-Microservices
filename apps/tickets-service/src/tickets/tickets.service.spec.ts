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
    create: jest.fn(),
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTickets', () => {
    it('should throw NotFoundException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.getTickets(999)).rejects.toThrow(NotFoundException);
    });

    it('should call findMany with specific filter for Role 1 (User)', async () => {
      const userId = 1;
      mockPrismaService.user.findUnique.mockResolvedValue({ id: userId, role: 1 });
      mockPrismaService.ticket.findMany.mockResolvedValue([]);

      await service.getTickets(userId);

      expect(mockPrismaService.ticket.findMany).toHaveBeenCalledWith({
        where: { users: { some: { userId } } },
        include: { users: true },
      });
    });
  });
});