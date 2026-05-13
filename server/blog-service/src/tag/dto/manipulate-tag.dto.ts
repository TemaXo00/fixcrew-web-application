import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ManipulateTagDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 70)
  name: string
}