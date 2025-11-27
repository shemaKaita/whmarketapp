"use client";

import { ProductDetail } from "@/common/types";
import React, { FC } from "react";
import styles from "./Product.module.scss";
import Image from "next/image";
import { classModifier } from "@/common/utils";
import dynamic from "next/dynamic";

const SavePost = dynamic(() => import("@/client/components/SavePost"), {
  ssr: false,
});

type ProductClientProps = {
  product: ProductDetail;
};
const ProductClient: FC<ProductClientProps> = ({ product }) => {
  return (
    <main className={styles.productPage}>
      <section className={styles.productCard}>
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className={styles.productImage}
          />
        )}
        <div className={styles.productInfo}>
          <h1 className={styles.productName}>{product.name}</h1>
          <p className={styles.productDescription}>{product.description}</p>
          <div className={styles.productMeta}>
            <span className={styles.productPrice}>
              ${product.price.toFixed(2)}
            </span>
            <span
              className={classModifier(styles, "productStock", {
                inStock: product.inStock,
              })}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <SavePost id={product.id} />
          </div>
        </div>
      </section>
    </main>
  );
};
export default ProductClient;
