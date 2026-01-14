import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';

import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail.service';

describe('AuthService', () => {
  let service: AuthService;

  // ===== MOCKS =====
  const prismaMock = {
    auth: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const jwtMock = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  const mailServiceMock = {
    sendVerifyEmail: jest.fn(),
  };

  const userClientMock = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: JwtService, useValue: jwtMock },
        { provide: MailService, useValue: mailServiceMock },
        { provide: 'USER_SERVICE', useValue: userClientMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // ================= REGISTER =================
  describe('register()', () => {
    it('should throw error if user already exists', async () => {
      prismaMock.auth.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        service.register('test@mail.com', '123456'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should register user successfully', async () => {
      prismaMock.auth.findUnique.mockResolvedValue(null);
      prismaMock.auth.create.mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
      });

      jwtMock.sign.mockReturnValue('verify-token');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed-password');

      const result = await service.register('test@mail.com', '123456');

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
      expect(prismaMock.auth.create).toHaveBeenCalled();
      expect(jwtMock.sign).toHaveBeenCalled();
      expect(mailServiceMock.sendVerifyEmail).toHaveBeenCalledWith(
        'test@mail.com',
        'verify-token',
      );
      expect(userClientMock.emit).toHaveBeenCalledWith(
        'auth.user.created',
        {
          authUserId: 1,
          email: 'test@mail.com',
          version: 1,
        },
      );

      expect(result).toEqual({
        message: 'Registered successfully',
      });
    });
  });

  // ================= LOGIN =================
  describe('login()', () => {
    it('should throw if user not found', async () => {
      prismaMock.auth.findUnique.mockResolvedValue(null);

      await expect(
        service.login('test@mail.com', '123456'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if password is invalid', async () => {
      prismaMock.auth.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
        password: 'hashed',
        isVerified: true,
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

      await expect(
        service.login('test@mail.com', '123456'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw if email not verified', async () => {
      prismaMock.auth.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
        password: 'hashed',
        isVerified: false,
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

      await expect(
        service.login('test@mail.com', '123456'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return access token on success', async () => {
      prismaMock.auth.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@mail.com',
        password: 'hashed',
        isVerified: true,
      });

      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jwtMock.sign.mockReturnValue('access-token');

      const result = await service.login('test@mail.com', '123456');

      expect(jwtMock.sign).toHaveBeenCalledWith(
        {
          sub: 1,
          email: 'test@mail.com',
          type: 'access',
        },
        { expiresIn: '1h' },
      );

      expect(result).toEqual({
        accessToken: 'access-token',
      });
    });
  });

  // ================= VERIFY =================
  describe('verify()', () => {
    it('should throw if token type is invalid', async () => {
      jwtMock.verify.mockReturnValue({
        sub: 1,
        type: 'access',
      });

      await expect(service.verify('bad-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should verify account successfully', async () => {
      jwtMock.verify.mockReturnValue({
        sub: 1,
        type: 'verify',
      });

      prismaMock.auth.update.mockResolvedValue({});

      const result = await service.verify('verify-token');

      expect(prismaMock.auth.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { isVerified: true },
      });

      expect(result).toEqual({
        message: 'Account verified',
      });
    });
  });
});
