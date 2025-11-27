import React, { FC } from "react";
import dynamic from "next/dynamic";
import type { MinimalProductDetail } from "@/common/types";
import styles from "./ProductGrid.module.scss";
const ProductCard = dynamic(() => import("@/client/components/ProductCard"), {
  ssr: false,
});

type ProductGridProps = {
  products: MinimalProductDetail[];
};
const ProductGrid: FC<ProductGridProps> = ({ products }) => {
  return (
    <div className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
