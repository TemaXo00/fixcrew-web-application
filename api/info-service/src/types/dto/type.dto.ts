import { IsNotEmpty, IsString, Length } from 'class-validator';

export class TypeDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  name: string;
}