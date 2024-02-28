import { IsNumber, IsString } from 'class-validator';

export class AuctionDto {
  @IsString()
  productName: string;

  @IsString()
  productDescription: string;

  @IsNumber()
  startPrice: string;

  @IsNumber()
  step: string;

  @IsString()
  startAt: string;

  @IsString()
  endAt: string;
}
