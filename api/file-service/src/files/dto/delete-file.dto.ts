import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteFileDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  id: string;
}
