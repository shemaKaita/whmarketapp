import {
  classModifier,
  HTTPClient,
  getMinimalProductDetails,
  normalizeQueryParams,
} from "../utils";

beforeAll(() => {
  global.fetch = jest.fn();
});

describe("classModifier", () => {
  it("returns base class if no modifiers", () => {
    const styles = { base: "base-class" };
    expect(classModifier(styles, "base", {})).toBe("base-class");
  });

  it("returns base and true modifiers", () => {
    const styles = { base: "base-class", "base--mod": "mod-class" };
    expect(classModifier(styles, "base", { mod: true })).toBe(
      "base-class mod-class"
    );
  });

  it("ignores false/undefined modifiers", () => {
    const styles = { base: "base-class", "base--mod": "mod-class" };
    expect(
      classModifier(styles, "base", { mod: false, other: undefined })
    ).toBe("base-class");
  });
});

describe("HTTPClient", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it("get returns data on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ foo: "bar" }),
    });
    const data = await HTTPClient.get<{ foo: string }>("url");
    expect(data).toEqual({ foo: "bar" });
  });

  it("get throws on error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 });
    await expect(HTTPClient.get("url")).rejects.toThrow(
      "HTTP error! status: 404"
    );
  });

  it("post returns data on success", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ foo: "bar" }),
    });
    const data = await HTTPClient.post<{ foo: string }>("url", { baz: 1 });
    expect(data).toEqual({ foo: "bar" });
  });

  it("post throws on error", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });
    await expect(HTTPClient.post("url", {})).rejects.toThrow(
      "HTTP error! status: 500"
    );
  });
});

describe("getMinimalProductDetails", () => {
  it("maps ProductDetail to MinimalProductDetail", () => {
    const products = [
      {
        id: "1",
        name: "A",
        price: 10,
        imageUrl: "img",
        inStock: true,
        currency: "USD",
        description: "desc",
        rating: 5,
        reviewCount: 10,
        tags: [],
        category: "cat",
        brand: "brand",
        extra: "ignore",
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
      },
    ];
    expect(getMinimalProductDetails(products)).toEqual([
      {
        id: "1",
        name: "A",
        price: 10,
        imageUrl: "img",
        inStock: true,
        currency: "USD",
      },
    ]);
  });
});

describe("normalizeQueryParams", () => {
  it("converts string booleans and numbers", () => {
    expect(
      normalizeQueryParams({ a: "true", b: "false", c: "42", d: "foo" })
    ).toEqual({ a: true, b: false, c: 42, d: "foo" });
  });
  it("handles nested objects and arrays", () => {
    expect(
      normalizeQueryParams({ arr: ["1", "false"], obj: { x: "true" } })
    ).toEqual({ arr: [1, false], obj: { x: true } });
  });
});
