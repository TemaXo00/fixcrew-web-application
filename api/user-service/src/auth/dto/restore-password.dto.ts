import { IsStrongPassword } from 'class-validator';

export class RestorePasswordDto {
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;
}