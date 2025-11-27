"use client";

import React, { useEffect, useState } from "react";
import useSavedProducts from "@/common/hooks/useSavedProducts";
import { getMinimalProductDetails, HTTPClient } from "@/common/utils";
import { MinimalProductDetail, ProductDetail } from "@/common/types";
import { CLIENT_PRODUCTS_BY_IDS_ENDPOINT } from "@/common/constants";
import ProductGrid from "../components/ProductGrid";
import styles from "./Saved.module.scss";

const getSavedProducts = async (
  ids: string[]
): Promise<MinimalProductDetail[]> => {
  if (ids.length === 0) {
    return [];
  }

  const response = await HTTPClient.post<
    { products: ProductDetail[] },
    { ids: string[] }
  >(CLIENT_PRODUCTS_BY_IDS_ENDPOINT, { ids });

  if (!response) {
    return [];
  }

  return getMinimalProductDetails(response.products);
};

const SavedClient = () => {
  const { savedProductIds } = useSavedProducts();
  const [savedProducts, setSavedProducts] = useState<
    MinimalProductDetail[] | null
  >(null);

  useEffect(() => {
    const ids = Array.from(savedProductIds);
    getSavedProducts(ids).then((products) => {
      setSavedProducts(products);
    });
  }, [savedProductIds]);

  return (
    <div className={styles.savedContainer}>
      <h1 className={styles.title}>Saved Products</h1>
      {savedProducts === null ? (
        <p>Loading saved products...</p>
      ) : savedProducts.length === 0 ? (
        <p>No saved products.</p>
      ) : (
        <ProductGrid products={savedProducts} />
      )}
    </div>
  );
};

export default SavedClient;
