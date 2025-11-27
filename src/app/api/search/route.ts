import { SEARCH_PRODUCTS_ENDPOINT } from "@/common/constants";
import { ProductDetail, SearchRequestBody } from "@/common/types";
import { HTTPClient } from "@/common/utils";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const products = await HTTPClient.post<ProductDetail[], SearchRequestBody>(
    SEARCH_PRODUCTS_ENDPOINT,
    body
  );

  return Response.json({ ...products });
}
