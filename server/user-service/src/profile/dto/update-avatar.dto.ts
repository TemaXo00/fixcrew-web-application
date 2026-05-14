import { IsOptional, IsUUID } from 'class-validator';

export class UpdateAvatarDto {
  @IsUUID(4)
  @IsOptional()
  avatar_url?: string;
}
