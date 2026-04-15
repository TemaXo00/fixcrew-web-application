import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SetRegionsDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({each: true})
  region_ids: string[];
}
