import React, { FC } from "react";
import ProductCard from "@/client/components/ProductCard";
import type { MinimalProductDetail } from "@/common/types";
import styles from "./ProductGrid.module.scss";

type ProductGridProps = {
  products: MinimalProductDetail[];
  prioritizeFirst?: boolean;
};

const ProductGrid: FC<ProductGridProps> = ({
  products,
  prioritizeFirst = false,
}) => {
  return (
    <div className={styles.productGrid}>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={prioritizeFirst && index === 0}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
