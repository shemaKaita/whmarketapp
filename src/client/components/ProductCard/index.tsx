import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { MinimalProductDetail } from "@/common/types";
import styles from "./ProductCard.module.scss";
import { ROUTES } from "@/common/constants";
import SavePost from "../SavePost";

interface ProductCardProps {
  product: MinimalProductDetail;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: product.currency,
  }).format(product.price);

  return (
    <div className={styles.productCard}>
      <Link
        href={`${ROUTES.PRODUCT_DETAIL}/${product.id}`}
        className={styles.link}
      >
        <Image
          className={styles.image}
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          loading="eager"
        />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.title}>{product.name}</h3>
        <div className={styles.subDetails}>
          <span className={styles.price}>{formattedPrice}</span>
          <SavePost id={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
