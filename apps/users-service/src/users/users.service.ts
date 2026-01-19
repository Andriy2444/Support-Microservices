import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getRole(data: { authUserId: number }) {
    console.log('UserService: Searching role for authUserId:', data.authUserId);

    const user = await this.prisma.user.findUnique({
      where: {
        authUserId: Number(data.authUserId)
      },
    });

    console.log('UserService: Found user:', user);
    return user?.role || null;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: CreateUserDto & { authUserId?: number }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name ?? '',
        role: (data.role as any) || 'USER',
        authUserId: data.authUserId ?? 0,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Check if user exists
    await this.findOne(id);

    // Створюємо об'єкт data тільки з дозволеними полями
    const data: any = {};
    
    if (updateUserDto.email !== undefined) {
      data.email = updateUserDto.email;
    }

    if (updateUserDto.name !== undefined) {
      data.name = updateUserDto.name;
    }

    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
