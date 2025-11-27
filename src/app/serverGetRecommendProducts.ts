import { RECOMMENDED_PRODUCTS_ENDPOINT } from "@/common/constants";
import {
  MinimalProductDetail,
  RecommendedProductsResponse,
} from "@/common/types";
import { getMinimalProductDetails, HTTPClient } from "@/common/utils";

export const serverGetRecommendProducts = async (): Promise<{
  products: MinimalProductDetail[];
}> => {
  const data = await HTTPClient.get<RecommendedProductsResponse>(
    RECOMMENDED_PRODUCTS_ENDPOINT
  );
  if (!data) {
    return { products: [] };
  }
  return { products: getMinimalProductDetails(data.products) };
};
