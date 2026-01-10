import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController, JwtAuthGuard, RolesGuard } from './users.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [UserService],
})
export class UserModule {}
