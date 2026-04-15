import { IsString } from 'class-validator';

export class UpdateMasterDto {
  @IsString()
  master_id: string;
}
