import { useContext } from "react";
import { SavedProductsContext } from "../providers/SavedProductsProvider";

export const useSavedProducts = () => {
  const context = useContext(SavedProductsContext);
  if (!context) {
    throw new Error(
      "useSavedProducts must be used within a SavedProductsProvider"
    );
  }
  return context;
};

export default useSavedProducts;
