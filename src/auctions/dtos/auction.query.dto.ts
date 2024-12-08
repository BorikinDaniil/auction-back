import {
  IsArray,
  IsBoolean,
  IsDate, IsDateString,
  IsOptional,
  IsString,
} from 'class-validator';
import { AuctionsQueryDto } from '../../common/dtos/abstract.query.dto';

export type QueryStatus = '1' | '2' | '3';

export class AuctionQueryDto extends AuctionsQueryDto {
  @IsOptional()
  @IsBoolean({
    message: 'endAt has to be boolean',
  })
  isDeleted?: boolean = false;

  @IsOptional()
  @IsString({
    message: `status has to be "1" | "2" | "3"`,
  })
  status?: QueryStatus;

  @IsOptional()
  @IsString({
    message: `incorrect price`,
  })
  startPriceFrom?: string;

  @IsOptional()
  @IsString({
    message: `incorrect price`,
  })
  startPriceTo?: string;

  @IsOptional()
  @IsDateString({
    message: 'startAtFrom has to be date',
  })
  startAtFrom?: string;

  @IsOptional()
  @IsDateString({
    message: 'startAtTo has to be date',
  })
  startAtTo?: string;

  @IsOptional()
  @IsDateString({
    message: 'endAtFrom has to be date',
  })
  endAtFrom?: string;

  @IsOptional()
  @IsDateString({
    message: 'endAtTo has to be date',
  })
  endAtTo?: string;

  @IsOptional()
  @IsString({
    message: 'productName has to be string',
  })
  productName?: string;

  @IsOptional()
  @IsArray({
    message: 'subCategories has to be array',
  })
  subCategories?: [];

  @IsOptional()
  page?: string;

  @IsOptional()
  pageSize?: string;
}
