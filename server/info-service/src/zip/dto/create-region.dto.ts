import { IsInt, IsNotEmpty, IsString, IsUUID, Max, Min } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsInt()
  @Min(10000)
  @Max(99999)
  code: number;
  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  region_id: string;
}
