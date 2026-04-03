import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class GetFileUrlDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  id: string;

  @IsNotEmpty()
  @IsBoolean()
  isAdmin: boolean;
}
