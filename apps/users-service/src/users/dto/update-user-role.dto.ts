import { IsEnum, IsInt } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../../generated/client'

export class UpdateUserRoleDto {
  @ApiPropertyOptional()
  @IsInt()
  id: number;

  @ApiPropertyOptional()
  @IsEnum(UserRole, {
    message: 'role must be one of: USER, ADMIN, SUPPORT',
  })
  role: UserRole;
}
