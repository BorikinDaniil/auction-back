import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AuctionsQueryDto {
  @IsOptional()
  @IsBoolean()
  isDeleted?: boolean = false;

  @IsOptional()
  @IsNumber()
  id?: number;
}
