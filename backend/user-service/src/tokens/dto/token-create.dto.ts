import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class TokenCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}