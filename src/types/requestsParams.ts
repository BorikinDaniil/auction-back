export type CategoriesParams = {
  name?: string;
};

type SubCategoriesParam = {
  name?: string;
  id?: string;
};

export type SubCategoriesParams = SubCategoriesParam | SubCategoriesParam[];
