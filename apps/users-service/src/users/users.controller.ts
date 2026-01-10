import { 
  Controller, 
  Get, 
  Patch, 
  Post, 
  Body, 
  Param, 
  UseGuards,
  Request,
  ParseIntPipe,
  ForbiddenException,
  SetMetadata,
  Injectable,
  CanActivate,
  ExecutionContext
} from '@nestjs/common';
import { UserService } from './users.service';
import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Reflector } from '@nestjs/core';

// Локальні гарди для users мікросервісу - ВІДПОВІДАЄ ПРИЗМА СХЕМІ
export enum ControllerUserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPPORT = 'SUPPORT'  // замість MODERATOR
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ControllerUserRole[]) => SetMetadata(ROLES_KEY, roles);

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ControllerUserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    
    if (!hasRole) {
      throw new ForbiddenException(
        `Required roles: ${requiredRoles.join(', ')}. Your role: ${user.role}`
      );
    }

    return true;
  }
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // Проста перевірка - припускаємо, що JWT вже провалідовано API Gateway або middleware
    // і користувач доданий до запиту
    return !!request.user?.userId;
  }
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, description: 'Return current user profile' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Request() req) {
    return this.userService.findOne(req.user.userId);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - cannot change role' })
  async updateProfile(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    // Prevent users from changing their own role
    if (updateUserDto.role) {
      throw new ForbiddenException('You cannot change your own role');
    }
    return this.userService.update(req.user.userId, updateUserDto);
  }

  @Post()
  @Roles(ControllerUserRole.ADMIN)  // Використовуємо ControllerUserRole
  @ApiOperation({ summary: 'Create a new user (Admin only)' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin only' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(ControllerUserRole.ADMIN, ControllerUserRole.SUPPORT)  // SUPPORT замість MODERATOR
  @ApiOperation({ summary: 'Get all users (Admin/Support only)' })
  @ApiResponse({ status: 200, description: 'Return all users' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(ControllerUserRole.ADMIN, ControllerUserRole.SUPPORT)  // SUPPORT замість MODERATOR
  @ApiOperation({ summary: 'Get user by ID (Admin/Support only)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'Return user by ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
}
