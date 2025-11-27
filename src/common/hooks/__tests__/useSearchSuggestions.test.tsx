import { renderHook, act } from "@testing-library/react";
import useSearchSuggestions from "../useSearchSuggestions";
import { HTTPClient } from "../../utils";

jest.mock("../../utils", () => ({
  HTTPClient: { post: jest.fn() },
  getMinimalProductDetails: jest.fn(() => [{ id: 1, name: "Product" }]),
}));

describe("useSearchSuggestions", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    (HTTPClient.post as jest.Mock).mockResolvedValue({
      products: [{ id: 1, name: "Product" }],
    });
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  it("should fetch and set suggestions", async () => {
    const { result } = renderHook(() => useSearchSuggestions());
    const { fetchSuggestions } = result.current;
    await act(async () => {
      await fetchSuggestions("query");
    });
    expect(result.current.suggestions).toEqual([{ id: 1, name: "Product" }]);
  });

  it("should clear suggestions", () => {
    const { result } = renderHook(() => useSearchSuggestions());
    act(() => {
      result.current.clearSuggestions();
    });
    expect(result.current.suggestions).toEqual([]);
  });

  it("should handle fetch error gracefully", async () => {
    (HTTPClient.post as jest.Mock).mockRejectedValue(
      new Error("Network error")
    );
    const { result } = renderHook(() => useSearchSuggestions());
    const { fetchSuggestions } = result.current;
    await act(async () => {
      await fetchSuggestions("query");
    });
    expect(result.current.suggestions).toEqual([]);
  });
});
