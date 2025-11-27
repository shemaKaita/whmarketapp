import { MinimalProductDetail, ProductDetail } from "./types";

/**
 * Applies BEM-style modifiers to a base class name based on the provided conditions.
 * @param styles Object containing CSS class names as keys and their corresponding styles as values.
 * @param baseClass The base class name to which modifiers will be applied.
 * @param modifiers An object where keys are modifier names and values are booleans indicating whether the modifier should be applied.
 * @returns A string of class names that includes the base class and any modifiers that are true.
 */
export const classModifier = (
  styles: Record<string, string>,
  baseClass: string,
  modifiers: Record<string, boolean | undefined>
): string => {
  return Object.entries(modifiers)
    .reduce(
      (acc, [modifier, condition]) => {
        if (condition) {
          acc.push(styles[`${baseClass}--${modifier}`]);
        }
        return acc;
      },
      [styles[baseClass]]
    )
    .join(" ");
};

/**
 * A utility class for making HTTP requests to the server.
 * Provides static methods for GET and POST requests with JSON handling.
 */
export class HTTPClient {
  static headers = {
    "Content-Type": "application/json",
  };

  /**
   *
   * @param url The URL to send the GET request to.
   * @param options Optional headers to include in the request.
   * @returns A promise that resolves to the response data of type T.
   */
  static async get<T>(url: string, options?: HeadersInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          ...this.headers,
          ...options,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param url The URL to send the POST request to.
   * @param body The body of the POST request.
   * @param options Optional headers to include in the request.
   * @returns A promise that resolves to the response data of type T or undefined.
   */
  static async post<T, R = unknown>(
    url: string,
    body: R,
    options?: HeadersInit
  ): Promise<T | undefined> {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...this.headers,
          ...options,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Converts an array of `ProductDetail` objects to an array of `MinimalProductDetail` objects.
 * @param products Array of `ProductDetail` objects.
 * @returns Array of `MinimalProductDetail` objects.
 */
export const getMinimalProductDetails = (
  products: ProductDetail[]
): MinimalProductDetail[] => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
    inStock: product.inStock,
    currency: product.currency,
  }));
};

/**
 * Normalizes an object's query parameters by converting string representations of booleans and numbers to their respective types.
 * @param obj The object to normalize.
 * @returns The normalized object with query parameters converted to appropriate types.
 */
export const normalizeQueryParams = (obj: unknown): unknown => {
  if (Array.isArray(obj)) {
    return obj.map(normalizeQueryParams);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
        key,
        normalizeQueryParams(value),
      ])
    );
  } else if (typeof obj === "string") {
    if (obj === "true") return true;
    if (obj === "false") return false;
    if (!isNaN(Number(obj)) && obj.trim() !== "") return Number(obj);
    return obj;
  }
  return obj;
};
