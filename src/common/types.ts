import { SEARCH_PARAMS } from "./constants";

export type ProductDetail = {
  id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  currency: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

export type MinimalProductDetail = Pick<
  ProductDetail,
  "id" | "name" | "price" | "inStock" | "currency" | "imageUrl"
>;

export type SearchRequestBody = {
  [SEARCH_PARAMS.SEARCH_TERM]?: string;
  [SEARCH_PARAMS.FILTER_BY]?: {
    [SEARCH_PARAMS.IN_STOCK]?: boolean;
    [SEARCH_PARAMS.TAGS]?: string[];
  };
  [SEARCH_PARAMS.LIMIT]?: number;
  [SEARCH_PARAMS.PAGE]?: number;
  [SEARCH_PARAMS.SORT_BY]?: "price_asc" | "price_desc";
};

export type SearchRequestResponse = {
  products: ProductDetail[];
  count: number;
};

export type ProductsByIdsRequestBody = {
  ids: string[];
};

export type ProductsByIdsRequestResponse = {
  products: ProductDetail[];
};

export type RecommendedProductsResponse = {
  products: ProductDetail[];
};

export type TagsRequestResponse = {
  tags: string[];
};
