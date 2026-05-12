import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0,
  })
  newPassword: string;
}
