import React, { FC } from "react";
import styles from "./Pagination.module.scss";
import { classModifier } from "@/common/utils";

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
  const totalPages = Math.ceil(totalProducts / 10); // Assuming 10 products per page

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
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className={classModifier(styles, "button", {
          disabled: currentPage === totalPages,
        })}
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
