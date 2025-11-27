import React, { FC, useMemo } from "react";
import styles from "./SavePost.module.scss";
import { classModifier } from "@/common/utils";
import useSavedProducts from "@/common/hooks/useSavedProducts";

type SavePostProps = {
  id: string;
};
const SavePost: FC<SavePostProps> = ({ id }) => {
  const { savedProductIds, toggleSavedProduct } = useSavedProducts();
  const isSaved = useMemo(() => savedProductIds.has(id), [savedProductIds, id]);
  return (
    <button
      type="button"
      className={classModifier(styles, "saveButton", { saved: isSaved })}
      onClick={(e) => {
        e.preventDefault();
        toggleSavedProduct(id);
      }}
    >
      {isSaved ? "Unsave" : "Save"}
    </button>
  );
};

export default SavePost;
