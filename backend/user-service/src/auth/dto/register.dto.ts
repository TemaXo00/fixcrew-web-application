import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  IsUrl,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(3, 50)
  surname: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone_number: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
    minSymbols: 0
  })
  password: string;
  @IsOptional()
  @IsString()
  @IsUrl()
  avatar_url?: string;
}