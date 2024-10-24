import { IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuctionDto {
  @ApiProperty({ example: 'Awesome stuff', description: 'Product name' })
  @IsString()
  productName: string;

  @ApiProperty({
    example: 'Awesome stuff description',
    description: 'Product description',
  })
  @IsString()
  productDescription: string;

  @ApiProperty({ example: '100', description: 'Start price' })
  @IsString()
  startPrice: string;

  @ApiProperty({ example: '10', description: 'Bids step' })
  @IsString()
  step: string;

  @ApiProperty({
    example: '2024-02-26 23:00:00+00',
    description: 'Start date and time of the auction',
    required: true,
  })
  @IsString()
  startAt: string;

  @ApiProperty({
    example: '2024-02-26 23:00:00+00',
    description: 'Start date and time of the auction',
  })
  @IsString()
  endAt: string;

  @ApiProperty({
    example: '[1, 2]',
    description: 'Categories',
  })
  @IsArray()
  subCategories: number[];
}
