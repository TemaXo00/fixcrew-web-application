import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateCoverDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  cover_id: string;
}