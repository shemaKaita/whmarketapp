import { PRODUCTS_BY_IDS_ENDPOINT } from "@/common/constants";
import {
  ProductsByIdsRequestBody,
  ProductsByIdsRequestResponse,
} from "@/common/types";
import { HTTPClient } from "@/common/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const response = await HTTPClient.post<
    ProductsByIdsRequestResponse,
    ProductsByIdsRequestBody
  >(PRODUCTS_BY_IDS_ENDPOINT, body);

  return Response.json({ ...response });
}
