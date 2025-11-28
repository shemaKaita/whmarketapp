import React, { FC } from "react";
import styles from "./Pagination.module.scss";
import { classModifier } from "@/common/utils";
import { PRODUCTS_PER_PAGE } from "@/common/constants";

type PaginationProps = {
  currentPage: number;
  totalProducts: number;
  onPageChange: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalProducts,
  onPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalProducts / PRODUCTS_PER_PAGE));

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination}>
      <button
        className={classModifier(styles, "button", {
          disabled: currentPage === 1,
        })}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label={`Go to page ${currentPage - 1}`}
      >
        Previous
      </button>
      <span className={styles.pageInfo} aria-current="page">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={classModifier(styles, "button", {
          disabled: currentPage === totalPages,
        })}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label={`Go to page ${currentPage + 1}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
