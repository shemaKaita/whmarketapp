import { PRODUCTS_BY_IDS_ENDPOINT } from "@/common/constants";
import {
  ProductDetail,
  ProductsByIdsRequestBody,
  ProductsByIdsRequestResponse,
} from "@/common/types";
import { HTTPClient } from "@/common/utils";
import { notFound } from "next/navigation";

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
    throw new Error(`No response received for product ID: ${productId}`);
  }

  if (
    !response.products ||
    !Array.isArray(response.products) ||
    response.products.length === 0
  ) {
    notFound();
  }

  return { product: response.products[0] };
};

export default serverGetProduct;
