import { Statuses } from '@prisma-gen/client';
import { IsEnum } from 'class-validator';

export class UpdateStatusDto {
  @IsEnum(Statuses)
  status: Statuses;
}
