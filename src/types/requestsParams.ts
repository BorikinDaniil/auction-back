import { AuctionStatus } from './common';
import { FindOperator } from 'typeorm';

export type CategoriesParams = {
  name?: string;
};

type SubCategoriesParam = {
  name?: string;
  id?: number;
};

export type SubCategoriesParams = SubCategoriesParam | SubCategoriesParam[];

export type AuctionParams = {
  id?: number;
  isDeleted?: boolean;
  status?: AuctionStatus | FindOperator<AuctionStatus>;
  startAt?: string;
  endAt?: string;
  productName?: string;
};

export type AuctionRelations = string[];
