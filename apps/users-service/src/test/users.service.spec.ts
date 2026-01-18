import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all users without sensitive data', async () => {
      const mockUsers = [
        {
          id: 1,
          email: 'user1@test.com',
          name: 'User One',
          role: 'USER',
          createdAt: new Date(),
        },
        {
          id: 2,
          email: 'user2@test.com',
          name: 'User Two',
          role: 'ADMIN',
          createdAt: new Date(),
        },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(mockUsers);

      const result = await service.findAll();

      expect(mockPrismaService.user.findMany).toHaveBeenCalledWith({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      expect(result).toEqual(mockUsers);
      // Перевіряємо, що пароль не повертається
      expect(result[0]).not.toHaveProperty('password');
    });

    it('should return empty array when no users exist', async () => {
      mockPrismaService.user.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
      expect(mockPrismaService.user.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return user by ID', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      expect(result).toEqual(mockUser);
      expect(result.id).toBe(1);
    });

    it('should throw NotFoundException when user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow(
        'User with ID 999 not found',
      );
    });

    it('should call findUnique with correct ID', async () => {
      const userId = 5;
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: userId,
        email: 'test@test.com',
        name: 'Test',
        role: 'USER',
        createdAt: new Date(),
      });

      await service.findOne(userId);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: userId },
        }),
      );
    });
  });

  describe('findByEmail', () => {
    it('should return user by email', async () => {
      const email = 'test@example.com';
      const mockUser = {
        id: 1,
        email,
        name: 'Test User',
        role: 'USER',
        password: 'hashed_password', // Повний об'єкт, включаючи пароль
      };

      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);

      const result = await service.findByEmail(email);

      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });

      expect(result).toEqual(mockUser);
      expect(result.email).toBe(email);
    });

    it('should return null when user with email not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a user with default role USER', async () => {
      const createUserDto = {
        email: 'newuser@example.com',
        name: 'New User',
      };

      const createdUser = {
        id: 1,
        email: createUserDto.email,
        name: createUserDto.name,
        role: 'USER',
        createdAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          role: 'USER',
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      expect(result).toEqual(createdUser);
      expect(result.role).toBe('USER');
    });

    it('should create a user with specified role', async () => {
      const createUserDto = {
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'ADMIN',
      };

      const createdUser = {
        id: 2,
        email: createUserDto.email,
        name: createUserDto.name,
        role: 'ADMIN',
        createdAt: new Date(),
      };

      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await service.create(createUserDto);

      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          role: 'ADMIN',
        },
        select: expect.any(Object),
      });

      expect(result.role).toBe('ADMIN');
    });
  });

  describe('update', () => {
    it('should update user fields', async () => {
      const userId = 1;
      const updateUserDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const updatedUser = {
        id: userId,
        email: 'updated@example.com',
        name: 'Updated Name',
        role: 'USER',
        createdAt: new Date(),
      };

      // Мокаємо перевірку існування користувача
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: userId,
        email: 'old@example.com',
        name: 'Old Name',
        role: 'USER',
        createdAt: new Date(),
      });

      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateUserDto);

      // Перевіряємо, що спочатку перевіряється існування користувача
      expect(mockPrismaService.user.findUnique).toHaveBeenCalled();

      // Перевіряємо оновлення
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
        },
        select: expect.any(Object),
      });

      expect(result.name).toBe('Updated Name');
      expect(result.email).toBe('updated@example.com');
    });

    it('should update only provided fields', async () => {
      const userId = 1;
      const updateUserDto = { name: 'New Name Only' };

      const updatedUser = {
        id: userId,
        email: 'old@example.com',
        name: 'New Name Only',
        role: 'USER',
        createdAt: new Date(),
      };

      mockPrismaService.user.findUnique.mockResolvedValue(updatedUser);
      mockPrismaService.user.update.mockResolvedValue(updatedUser);

      const result = await service.update(userId, updateUserDto);

      // Перевіряємо, що email не оновлювався
      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { name: 'New Name Only' }, // Тільки name
        select: expect.any(Object),
      });
    });

    it('should throw NotFoundException when updating non-existent user', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.update(999, { name: 'New Name' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  // Тестування edge cases
  describe('Edge Cases', () => {
    it('should handle database errors gracefully', async () => {
      mockPrismaService.user.findMany.mockRejectedValue(
        new Error('Database connection failed'),
      );

      await expect(service.findAll()).rejects.toThrow(
        'Database connection failed',
      );
    });

    it('should handle partial update DTO with undefined values', async () => {
      const userId = 1;
      const updateUserDto = { name: undefined, email: undefined };

      mockPrismaService.user.findUnique.mockResolvedValue({ id: userId });

      // Мокаємо update, але очікуємо data: {}
      mockPrismaService.user.update.mockImplementation(({ data }) =>
        Promise.resolve({ id: userId, ...data }),
      );

      await service.update(userId, updateUserDto);

      expect(mockPrismaService.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: {}, // Порожній об'єкт, якщо всі поля undefined
        select: expect.any(Object),
      });
    });
  });
});
