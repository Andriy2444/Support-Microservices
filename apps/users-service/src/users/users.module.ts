import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController, RolesGuard } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt-secret',
    }),
    PrismaModule,
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL || 'amqp://rabbitmq:5672'],
          queue: 'users.events',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [UserService],
})
export class UserModule {}
