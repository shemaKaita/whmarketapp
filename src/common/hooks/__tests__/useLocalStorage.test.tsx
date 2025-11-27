import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should initialize with default value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    expect(result.current[0]).toBe("default");
  });

  it("should set and persist value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "default"));
    act(() => {
      result.current[1]("newValue");
    });
    expect(result.current[0]).toBe("newValue");
    expect(window.localStorage.getItem("key")).toBe(JSON.stringify("newValue"));
  });
});
