import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Roles as PrismaRoles } from '@prisma-gen/enums';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: PrismaRoles[]): CustomDecorator => SetMetadata(ROLES_KEY, roles);
