"use client";

import React, { FC } from "react";
import type { MinimalProductDetail, SearchRequestBody } from "@/common/types";
import ProductGrid from "../components/ProductGrid";
import styles from "./Search.module.scss";
import Pagination from "../components/Pagination";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/common/constants";
import QueryString from "qs";
import Filters from "../components/Filters";

type SearchClientProps = {
  searchResults: { products: MinimalProductDetail[]; count: number };
  availableTags: { tags: string[] };
  queryBody: SearchRequestBody;
};

const SearchClient: FC<SearchClientProps> = ({
  searchResults,
  availableTags,
  queryBody,
}) => {
  const router = useRouter();
  const handlePageChange = (page: number) => {
    const queryString = QueryString.stringify({
      ...queryBody,
      page: page,
    });
    router.push(`${ROUTES.SEARCH_RESULTS}?${queryString}`);
  };
  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Search Results</h1>
      <div aria-live="polite" aria-atomic="true" className={styles.resultCount}>
        {searchResults.count} products found
      </div>
      <Filters availableTags={availableTags.tags} queryBody={queryBody} />
      {searchResults.products.length === 0 ? (
        <p className={styles.errorMessage}>
          No products found. Try adjusting your search or filters.
        </p>
      ) : (
        <>
          <ProductGrid products={searchResults.products} />
          <Pagination
            currentPage={queryBody?.page || 1}
            totalProducts={searchResults.count}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default SearchClient;
