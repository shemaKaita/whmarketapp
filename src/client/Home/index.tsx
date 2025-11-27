"use client";

import React, { FC } from "react";
import type { MinimalProductDetail } from "@/common/types";
import ProductGrid from "../components/ProductGrid";
import styles from "./Home.module.scss";

type HomeClientProps = {
  recommendedProducts: MinimalProductDetail[];
};

const HomeClient: FC<HomeClientProps> = ({ recommendedProducts }) => {
  return (
    <div className={styles.root}>
      <h1 className={styles.heading}>Recommended Products</h1>
      <ProductGrid products={recommendedProducts} />
    </div>
  );
};

export default HomeClient;
