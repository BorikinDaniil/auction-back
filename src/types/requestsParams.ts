export type CategoriesParams = {
  name?: string;
};

type SubCategoriesParam = {
  name?: string;
  id?: number;
};

export type SubCategoriesParams = SubCategoriesParam | SubCategoriesParam[];

export type AuctionParams = {
  isDeleted?: boolean;
  finished?: boolean;
  active?: boolean;
};

export type AuctionRelations = string[];
