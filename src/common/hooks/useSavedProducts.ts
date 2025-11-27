import { useContext } from "react";
import { SavedProductsContext } from "../providers/SavedProductsProvider";

/**
 * A custom hook that provides access to the saved products context.
 * @returns The saved products context value
 */
const useSavedProducts = () => {
  const context = useContext(SavedProductsContext);
  if (!context) {
    throw new Error(
      "useSavedProducts must be used within a SavedProductsProvider"
    );
  }
  return context;
};

export default useSavedProducts;
