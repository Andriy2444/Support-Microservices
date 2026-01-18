import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt-secret', // той самий секрет, що і в auth
      signOptions: { expiresIn: '1h' },
    }),
    PrismaModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService, JwtAuthGuard, RolesGuard],
})
export class TicketsModule {}
