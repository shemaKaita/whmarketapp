"use client";
import { createContext, FC, PropsWithChildren, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type SavedProductsContextType = {
  savedProductIds: Set<string>;
  toggleSavedProduct: (productId: string) => void;
};

export const SavedProductsContext = createContext<
  SavedProductsContextType | undefined
>(undefined);

export const SavedProductsProvider: FC<PropsWithChildren> = ({ children }) => {
  const [savedProductsInStorage, setSavedProductInStorage] = useLocalStorage<
    string[]
  >("savedProducts", []);
  const [savedProductIds, setSavedProductIds] = useState<Set<string>>(
    new Set(savedProductsInStorage)
  );

  const toggleSavedProduct = (productId: string) => {
    setSavedProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      setSavedProductInStorage(Array.from(newSet));
      return newSet;
    });
  };
  return (
    <SavedProductsContext.Provider
      value={{ savedProductIds, toggleSavedProduct }}
    >
      {children}
    </SavedProductsContext.Provider>
  );
};
