import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UseRestoreDto {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  password: string;
}