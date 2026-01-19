import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { MailService } from './mail.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailService: MailService,

    @Inject('USER_SERVICE')
    private readonly userClient: ClientProxy,
  ) {}

  // ================= REGISTER =================
  async register(email: string, password: string) {
    // 1️⃣ перевірка
    const exists = await this.prisma.auth.findUnique({
      where: { email },
    });

    if (exists) {
      throw new BadRequestException('User already exists');
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await this.prisma.auth.create({
      data: {
        email,
        password: hash,
      },
    });

    const verifyToken = this.jwt.sign(
      {
        sub: user.id,
        type: 'verify',
      },
      { expiresIn: '15m' },
    );

    await this.mailService.sendVerifyEmail(email, verifyToken);

    this.userClient.emit('auth.user.created', {
      authUserId: user.id,
      email: user.email,
      version: 1,
    });

    return {
      message: 'Registered successfully',
    };
  }

  // ================= LOGIN =================
  async login(email: string, password: string) {
    const user = await this.prisma.auth.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    if (!user.isVerified) throw new UnauthorizedException('Email not verified');

    let role = 'USER';
    try {
      role = await firstValueFrom(
        this.userClient.send<string>('auth.user.getRole', { authUserId: user.id }),
      );
      if (!role) role = 'USER';
    } catch (err) {
      console.error('Error getting user role from Users-service:', err);
    }

    const accessToken = this.jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role,
        type: 'access',
      },
      { expiresIn: '1h' },
    );

    return { accessToken };
  }

  // ================= VERIFY =================
  async verify(token: string) {
    const payload = this.jwt.verify(token);

    if (payload.type !== 'verify') {
      throw new UnauthorizedException('Invalid token type');
    }

    await this.prisma.auth.update({
      where: { id: payload.sub },
      data: { isVerified: true },
    });

    return { message: 'Account verified' };
  }
}
