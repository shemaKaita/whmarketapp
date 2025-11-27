import { renderHook, act } from "@testing-library/react";
import useDebounce from "../useDebounce";

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

describe("useDebounce", () => {
  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      {
        initialProps: { value: "test", delay: 500 },
      }
    );

    expect(result.current).toBe("test");
    rerender({ value: "changed", delay: 500 });
    expect(result.current).toBe("test");

    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe("changed");
  });
});
