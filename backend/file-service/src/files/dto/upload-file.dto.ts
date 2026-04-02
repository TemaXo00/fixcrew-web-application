import { Visibility } from '@prisma-gen/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Max } from 'class-validator';

export class UploadFileDto {
  buffer: Buffer;

  @IsString()
  @IsNotEmpty()
  filename: string;

  @IsString()
  @IsNotEmpty()
  mimeType: string;

  @IsNumber()
  @Max(5 * 1024 * 1024)
  size: number;

  @IsEnum(Visibility)
  visibility: Visibility;
}
