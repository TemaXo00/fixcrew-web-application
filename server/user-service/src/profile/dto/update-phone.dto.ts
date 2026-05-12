import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class UpdatePhoneDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{3}-\d{3}-\d{4}$/, {
    message: 'Phone number must be in format: xxx-xxx-xxxx',
  })
  phone_number: string;
}
