import { IsInt, IsString, Matches, Max, Min } from 'class-validator';

export class UpdateDateDto {
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'date must be in YYYY-MM-DD format',
  })
  date: string;

  @IsInt()
  @Min(0)
  @Max(1440)
  startMin: number;

  @IsInt()
  @Min(0)
  @Max(1440)
  endMin: number;
}
