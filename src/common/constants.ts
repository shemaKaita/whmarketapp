export const MOCK_SERVER_URL = "https://mockapi.whmarket.com";
export const RECOMMENDED_PRODUCTS_ENDPOINT = `${MOCK_SERVER_URL}/recommended`;
export const PRODUCT_DETAILS_ENDPOINT = `${MOCK_SERVER_URL}/products`;
export const SEARCH_PRODUCTS_ENDPOINT = `${MOCK_SERVER_URL}/search`;
export const PRODUCTS_BY_IDS_ENDPOINT = `${MOCK_SERVER_URL}/products/by-ids`;
export const AVAILABLE_TAGS_ENDPOINT = `${MOCK_SERVER_URL}/tags`;
export const CLIENT_API_URL = "/api";
export const CLIENT_SEARCH_ENDPOINT = `${CLIENT_API_URL}/search`;
export const CLIENT_PRODUCTS_BY_IDS_ENDPOINT = `${CLIENT_API_URL}/products/by-ids`;

export const ROUTES = {
  HOME: "/",
  PRODUCT_DETAIL: "/product",
  SEARCH_RESULTS: "/search",
  SAVED: "/saved",
};
export const SEARCH_PARAMS = {
  SEARCH_TERM: "searchTerm",
  FILTER_BY: "filterBy",
  TAGS: "tags",
  IN_STOCK: "inStock",
  PAGE: "page",
  LIMIT: "limit",
  SORT_BY: "sortBy",
} as const;

export const PRODUCTS_PER_PAGE = 10;
