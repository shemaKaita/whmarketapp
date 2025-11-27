import { renderHook, act } from "@testing-library/react";
import useSavedProducts from "../useSavedProducts";
import { SavedProductsProvider } from "../../providers/SavedProductsProvider";
import React from "react";

describe("useSavedProducts", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("throws error if not inside provider", () => {
    expect(() => renderHook(() => useSavedProducts())).toThrow(
      "useSavedProducts must be used within a SavedProductsProvider"
    );
  });

  it("should add and remove product IDs via provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SavedProductsProvider>{children}</SavedProductsProvider>
    );
    const { result } = renderHook(() => useSavedProducts(), { wrapper });

    // Initial value should be an empty set
    expect(Array.from(result.current.savedProductIds)).toEqual([]);

    // Add a product
    act(() => {
      result.current.toggleSavedProduct("product1");
    });
    expect(Array.from(result.current.savedProductIds)).toEqual(["product1"]);

    // Add another product
    act(() => {
      result.current.toggleSavedProduct("product2");
    });
    expect(new Set(result.current.savedProductIds)).toEqual(
      new Set(["product1", "product2"])
    );

    // Remove first product
    act(() => {
      result.current.toggleSavedProduct("product1");
    });
    expect(Array.from(result.current.savedProductIds)).toEqual(["product2"]);
  });
});
