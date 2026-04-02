import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

export class CreateMasterDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  master_id: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone_number: string;
}