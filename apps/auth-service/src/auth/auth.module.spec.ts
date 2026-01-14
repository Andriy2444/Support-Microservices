import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ClientsModule } from '@nestjs/microservices';

import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail.service';

describe('AuthModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('AuthController should be defined', () => {
    const controller = module.get<AuthController>(AuthController);
    expect(controller).toBeDefined();
  });

  it('AuthService should be defined', () => {
    const service = module.get<AuthService>(AuthService);
    expect(service).toBeDefined();
  });

  it('PrismaService should be defined', () => {
    const prisma = module.get<PrismaService>(PrismaService);
    expect(prisma).toBeDefined();
  });

  it('MailService should be defined', () => {
    const mailService = module.get<MailService>(MailService);
    expect(mailService).toBeDefined();
  });

  it('JwtService should be defined', () => {
    const jwtService = module.get<JwtService>(JwtService);
    expect(jwtService).toBeDefined();
  });

  it('USER_SERVICE client should be registered', () => {
    const client = module.get('USER_SERVICE');
    expect(client).toBeDefined();
  });
});
