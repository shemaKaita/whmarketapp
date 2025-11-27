import { http, HttpResponse, PathParams } from "msw";
import data from "./data.json";
import {
  AVAILABLE_TAGS_ENDPOINT,
  PRODUCTS_BY_IDS_ENDPOINT,
  RECOMMENDED_PRODUCTS_ENDPOINT,
  SEARCH_PARAMS,
  SEARCH_PRODUCTS_ENDPOINT,
} from "@/common/constants";
import {
  ProductDetail,
  SearchRequestBody,
  TagsRequestResponse,
} from "@/common/types";

const allProducts: ProductDetail[] = data.products;

const recommendedProductsHandler = http.get(
  RECOMMENDED_PRODUCTS_ENDPOINT,
  () => {
    return HttpResponse.json({ products: allProducts.slice(0, 10) });
  }
);

const searchProductsHandler = http.post<PathParams, SearchRequestBody>(
  SEARCH_PRODUCTS_ENDPOINT,
  async ({ request }) => {
    const {
      [SEARCH_PARAMS.SEARCH_TERM]: searchTerm = "",
      [SEARCH_PARAMS.FILTER_BY]: filterBy,
      [SEARCH_PARAMS.PAGE]: page = 1,
      [SEARCH_PARAMS.LIMIT]: limit = 10,
      [SEARCH_PARAMS.SORT_BY]: sortBy = null,
    } = await request.clone().json();

    // First filter by search term
    let matchedProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then filter by stock and tags
    if (filterBy) {
      if (filterBy[SEARCH_PARAMS.IN_STOCK] !== undefined) {
        matchedProducts = matchedProducts.filter(
          (product) => product.inStock === filterBy[SEARCH_PARAMS.IN_STOCK]
        );
      }
      if (
        filterBy[SEARCH_PARAMS.TAGS] &&
        filterBy[SEARCH_PARAMS.TAGS]!.length > 0
      ) {
        matchedProducts = matchedProducts.filter((product) =>
          filterBy[SEARCH_PARAMS.TAGS]!.every((tag) =>
            product.tags.includes(tag)
          )
        );
      }
    }

    // Sort products
    if (sortBy) {
      matchedProducts.sort((a, b) => {
        if (sortBy === "price_asc") {
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
    }

    if (matchedProducts.length === 0) {
      return HttpResponse.json({ products: [] });
    }

    return HttpResponse.json({
      products: matchedProducts.slice((page - 1) * limit, page * limit),
      count: matchedProducts.length,
    });
  }
);

const getProductsByIds = http.post<PathParams, { ids: string[] }>(
  PRODUCTS_BY_IDS_ENDPOINT,
  async ({ request }) => {
    const { ids } = await request.clone().json();
    const products = allProducts.filter((product) => ids.includes(product.id));
    return HttpResponse.json({ products });
  }
);

const getAvailableTags = http.get<PathParams, TagsRequestResponse>(
  AVAILABLE_TAGS_ENDPOINT,
  () => {
    const tagsSet = new Set<string>();
    allProducts.forEach((product) => {
      product.tags.forEach((tag) => tagsSet.add(tag));
    });
    const tags = Array.from(tagsSet);
    return HttpResponse.json({ tags });
  }
);

export const handlers = [
  recommendedProductsHandler,
  searchProductsHandler,
  getProductsByIds,
  getAvailableTags,
];
