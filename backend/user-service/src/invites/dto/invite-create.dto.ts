import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InviteCreateDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}