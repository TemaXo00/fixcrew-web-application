import { Roles, UserStatus } from '@prisma-gen/enums';
import { IsOptional, IsString, IsEnum, IsIn } from 'class-validator';

export class SearchUsersDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsOptional()
  @IsEnum(Roles)
  role?: Roles;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsString()
  query?: string;

  @IsOptional()
  @IsString()
  @IsIn([
    'name',
    'surname',
    'email',
    'created_at',
    'updated_at',
    'role',
    'status',
  ])
  orderBy?: string;

  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  orderDirection?: 'asc' | 'desc';
}
