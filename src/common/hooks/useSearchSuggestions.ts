import { useCallback, useState } from "react";
import { getMinimalProductDetails, HTTPClient } from "../utils";
import { MinimalProductDetail, ProductDetail } from "../types";
import { CLIENT_SEARCH_ENDPOINT, SEARCH_PARAMS } from "../constants";

/**
 * A custom hook that provides search suggestions based on user input.
 * @returns An object containing search suggestions and functions to fetch and clear them
 */
const useSearchSuggestions = () => {
  const [suggestions, setSuggestions] = useState<MinimalProductDetail[]>([]);

  const fetchSuggestions = useCallback(async (query: string) => {
    try {
      const response = await HTTPClient.post<{ products: ProductDetail[] }>(
        CLIENT_SEARCH_ENDPOINT,
        {
          [SEARCH_PARAMS.SEARCH_TERM]: query,
          [SEARCH_PARAMS.LIMIT]: 5,
        }
      );
      if (response) {
        const products = getMinimalProductDetails(response.products || []);
        setSuggestions(products);
      }
    } catch (error) {
      console.error("Failed to fetch search suggestions:", error);
    }
  }, []);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
  }, []);

  return {
    suggestions,
    fetchSuggestions,
    clearSuggestions,
  };
};

export default useSearchSuggestions;
