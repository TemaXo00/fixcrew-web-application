import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateRestoreDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
