import { AuctionStatus } from './common';
import { FindOperator } from 'typeorm';
import { QueryStatus } from '../auctions/dtos/auction.query.dto';

export type CategoriesParams = {
  name?: string;
};

type SubCategoriesParam = {
  name?: string;
  id?: number;
};

export type SubCategoriesParams = SubCategoriesParam | SubCategoriesParam[];

export type CommonParams = {
  id?: number;
  isDeleted?: boolean;
};

type AuctionSubCategoryQuery = {
  id: number;
}[];

export type AuctionsParsedParams = CommonParams & {
  status?: AuctionStatus | FindOperator<AuctionStatus>;
  startAt?: FindOperator<string>;
  endAt?: FindOperator<string>;
  productName?: FindOperator<string>;
  startPrice?: FindOperator<number>;
  subCategories?: AuctionSubCategoryQuery;
};

export type AuctionRelations = string[];

export type AuctionsQueryParams = CommonParams & {
  status?: AuctionStatus | FindOperator<AuctionStatus> | QueryStatus;
  productName?: string;
  subCategories?: string[];
  startAtFrom?: string;
  startAtTo?: string;
  endAtFrom?: string;
  endAtTo?: string;
  priceFrom?: string;
  priceTo?: string;
  pageSize?: string;
  page?: string;
};
