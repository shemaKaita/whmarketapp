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
    throw new Error("No response received from recommended products API");
  }

  if (!data.products || !Array.isArray(data.products)) {
    console.warn("Invalid response structure from recommended products API");
    return { products: [] };
  }

  return { products: getMinimalProductDetails(data.products) };
};
