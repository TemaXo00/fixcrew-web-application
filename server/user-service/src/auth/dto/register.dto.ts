import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  Length,
  Matches,
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
  @Matches(/^(\+1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/, {
    message:
      'Phone number must be in valid US format (e.g., +1 123-456-7890, 1234567890, (123) 456-7890, 123-456-7890, etc.)',
  })
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
    minSymbols: 0,
  })
  password: string;
  @IsOptional()
  @IsString()
  @IsUUID(4)
  avatar_url?: string;
}