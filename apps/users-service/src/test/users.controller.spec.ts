import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../users/users.controller';
import { UserService } from '../users/users.service';
import { JwtAuthGuard, RolesGuard, ControllerUserRole, Roles } from '../users/users.controller';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

const mockUserService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

// Мок користувача для запиту
const mockUser = {
  userId: 1,
  role: ControllerUserRole.USER,
};

const mockAdminUser = {
  userId: 2,
  role: ControllerUserRole.ADMIN,
};

const mockSupportUser = {
  userId: 3,
  role: ControllerUserRole.SUPPORT,
};

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
        Reflector,
      ],
    })
    .overrideGuard(JwtAuthGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .overrideGuard(RolesGuard)
    .useValue({ canActivate: jest.fn(() => true) })
    .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    reflector = module.get<Reflector>(Reflector);
    jest.clearAllMocks();
  });

  // Тестування гард
  describe('Guards', () => {
    let rolesGuard: RolesGuard;

    beforeEach(() => {
      rolesGuard = new RolesGuard(reflector);
    });

    it('RolesGuard should allow access for ADMIN role', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn(() => ({
            user: mockAdminUser,
          })),
        })),
      } as any;

      // Мокаємо reflector
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([ControllerUserRole.ADMIN]);

      const result = rolesGuard.canActivate(context);
      expect(result).toBe(true);
    });

    it('RolesGuard should throw ForbiddenException for insufficient role', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn(() => ({
          getRequest: jest.fn(() => ({
            user: mockUser, // USER роль
          })),
        })),
      } as any;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([ControllerUserRole.ADMIN]);

      expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
    });
  });

  describe('GET /users/profile', () => {
    it('should return current user profile', async () => {
      const req = { user: mockUser };
      const userProfile = {
        id: 1,
        email: 'user@example.com',
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
      };

      mockUserService.findOne.mockResolvedValue(userProfile);

      const result = await controller.getProfile(req);

      expect(mockUserService.findOne).toHaveBeenCalledWith(mockUser.userId);
      expect(result).toEqual(userProfile);
    });

    it('should throw error if service throws', async () => {
      const req = { user: mockUser };
      mockUserService.findOne.mockRejectedValue(new NotFoundException('User not found'));

      await expect(controller.getProfile(req)).rejects.toThrow(NotFoundException);
    });
  });

  describe('PATCH /users/profile', () => {
    it('should update user profile', async () => {
      const req = { user: mockUser };
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const updatedUser = {
        id: mockUser.userId,
        ...updateUserDto,
        role: 'USER',
        createdAt: new Date(),
      };

      mockUserService.update.mockResolvedValue(updatedUser);

      const result = await controller.updateProfile(req, updateUserDto);

      expect(mockUserService.update).toHaveBeenCalledWith(mockUser.userId, updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    it('should throw ForbiddenException when trying to change role', async () => {
      const req = { user: mockUser };
      const updateUserDto: UpdateUserDto = {
        name: 'Test',
        role: 'ADMIN' as any, // Примусово додаємо роль
      };

      await expect(controller.updateProfile(req, updateUserDto))
        .rejects.toThrow(ForbiddenException);
      
      await expect(controller.updateProfile(req, updateUserDto))
        .rejects.toThrow('You cannot change your own role');
    });

    it('should allow empty update', async () => {
      const req = { user: mockUser };
      const updateUserDto = {};

      const currentUser = {
        id: mockUser.userId,
        email: 'test@example.com',
        name: 'Test',
        role: 'USER',
        createdAt: new Date(),
      };

      mockUserService.update.mockResolvedValue(currentUser);

      const result = await controller.updateProfile(req, updateUserDto);

      expect(mockUserService.update).toHaveBeenCalledWith(mockUser.userId, updateUserDto);
      expect(result).toEqual(currentUser);
    });
  });

  describe('POST /users (Admin only)', () => {
    it('should create a new user when called by ADMIN', async () => {
      const createUserDto: CreateUserDto = {
        email: 'new@example.com',
        name: 'New User',
        role: 'USER',
      };

      const createdUser = {
        id: 3,
        ...createUserDto,
        createdAt: new Date(),
      };

      mockUserService.create.mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(mockUserService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createdUser);
    });

    it('should create user with default role if not specified', async () => {
      const createUserDto: CreateUserDto = {
        email: 'new@example.com',
        name: 'New User',
        // role не вказано
      };

      const createdUser = {
        id: 4,
        ...createUserDto,
        role: 'USER',
        createdAt: new Date(),
      };

      mockUserService.create.mockResolvedValue(createdUser);

      const result = await controller.create(createUserDto);

      expect(result.role).toBe('USER');
    });
  });

  describe('GET /users (Admin/Support only)', () => {
    it('should return all users for ADMIN', async () => {
      const users = [
        { id: 1, email: 'user1@test.com', name: 'User One', role: 'USER', createdAt: new Date() },
        { id: 2, email: 'admin@test.com', name: 'Admin', role: 'ADMIN', createdAt: new Date() },
      ];

      mockUserService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();

      expect(mockUserService.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when no users', async () => {
      mockUserService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('GET /users/:id (Admin/Support only)', () => {
    it('should return user by ID', async () => {
      const userId = 5;
      const user = {
        id: userId,
        email: 'test@example.com',
        name: 'Test User',
        role: 'USER',
        createdAt: new Date(),
      };

      mockUserService.findOne.mockResolvedValue(user);

      const result = await controller.findOne(userId);

      expect(mockUserService.findOne).toHaveBeenCalledWith(userId);
      expect(result).toEqual(user);
    });

    it('should propagate NotFoundException from service', async () => {
      const userId = 999;
      mockUserService.findOne.mockRejectedValue(new NotFoundException(`User with ID ${userId} not found`));

      await expect(controller.findOne(userId)).rejects.toThrow(NotFoundException);
    });

    it('should parse ID as number', async () => {
      const userId = '123' as any; // Симулюємо string з параметра
      const user = {
        id: 123,
        email: 'test@example.com',
        name: 'Test',
        role: 'USER',
        createdAt: new Date(),
      };

      mockUserService.findOne.mockResolvedValue(user);

      const result = await controller.findOne(userId);

      expect(mockUserService.findOne).toHaveBeenCalledWith(123);
      expect(result.id).toBe(123);
    });
  });

  // Тестування ролей через метадані
  describe('Role Decorators', () => {
    it('should have correct roles metadata on endpoints', () => {
      // Перевіряємо метадані декораторів @Roles
      const metadata = Reflect.getMetadata('roles', UserController.prototype.create);
      expect(metadata).toEqual([ControllerUserRole.ADMIN]);

      const findAllMetadata = Reflect.getMetadata('roles', UserController.prototype.findAll);
      expect(findAllMetadata).toEqual([ControllerUserRole.ADMIN, ControllerUserRole.SUPPORT]);

      const findOneMetadata = Reflect.getMetadata('roles', UserController.prototype.findOne);
      expect(findOneMetadata).toEqual([ControllerUserRole.ADMIN, ControllerUserRole.SUPPORT]);
    });
  });

  // Тестування обробки помилок
  describe('Error Handling', () => {
    it('should handle service errors gracefully', async () => {
      mockUserService.findAll.mockRejectedValue(new Error('Database error'));

      await expect(controller.findAll()).rejects.toThrow('Database error');
    });

    it('should handle invalid input for update', async () => {
      const req = { user: mockUser };
      const invalidDto = { email: 'invalid-email' } as UpdateUserDto;

      // Мокаємо, що сервіс кидає помилку валідації
      mockUserService.update.mockRejectedValue(new Error('Validation failed'));

      await expect(controller.updateProfile(req, invalidDto)).rejects.toThrow('Validation failed');
    });
  });
});
