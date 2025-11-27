import { PRODUCTS_BY_IDS_ENDPOINT } from "@/common/constants";
import {
  ProductDetail,
  ProductsByIdsRequestBody,
  ProductsByIdsRequestResponse,
} from "@/common/types";
import { HTTPClient } from "@/common/utils";

const serverGetProduct = async (
  productId: string
): Promise<{
  product: ProductDetail;
}> => {
  const response = await HTTPClient.post<
    ProductsByIdsRequestResponse,
    ProductsByIdsRequestBody
  >(PRODUCTS_BY_IDS_ENDPOINT, { ids: [productId] });
  if (!response) {
    throw new Error("Failed to fetch product details");
  }
  return { product: response.products[0] };
};

export default serverGetProduct;
