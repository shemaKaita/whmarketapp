import { SEARCH_PRODUCTS_ENDPOINT } from "@/common/constants";
import {
  MinimalProductDetail,
  SearchRequestBody,
  SearchRequestResponse,
} from "@/common/types";
import { getMinimalProductDetails, HTTPClient } from "@/common/utils";

export const serverGetSearch = async (
  searchParams: SearchRequestBody
): Promise<{ products: MinimalProductDetail[]; count: number }> => {
  const data = await HTTPClient.post<SearchRequestResponse, SearchRequestBody>(
    SEARCH_PRODUCTS_ENDPOINT,
    searchParams as SearchRequestBody
  );
  if (data) {
    return {
      products: getMinimalProductDetails(data.products),
      count: data.count,
    };
  }
  return { products: [], count: 0 };
};
