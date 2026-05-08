import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignRegionDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  region_id: string;
}