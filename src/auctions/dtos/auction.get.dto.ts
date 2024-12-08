import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { SubCategory } from '../../sub-categories/sub-category.entity';
import { User } from '../../user/user.entity';
import {
  OWNER_EXAMPLE,
  subCategoryListExample,
} from '../../common/entitiesExamples';
import { AbstractDto } from '../../common/dtos/abstract.dto';

export class AuctionGetDto extends AbstractDto {
  @ApiProperty({ example: 'Awesome stuff', description: 'Product name' })
  @IsString()
  productName: string;

  @ApiProperty({
    example: 'Awesome stuff description',
    description: 'Product description',
  })
  @IsString()
  productDescription: string;

  @ApiProperty({ example: 100, description: 'Start price' })
  @IsString()
  startPrice: number;

  @ApiProperty({ example: 10, description: 'Bids step' })
  @IsString()
  step: number;

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
    example: subCategoryListExample,
    description: 'Categories',
  })
  @IsArray()
  subCategories: SubCategory[];

  @ApiProperty({
    example: OWNER_EXAMPLE,
    description: 'Auction creator',
  })
  owner: User;
}
