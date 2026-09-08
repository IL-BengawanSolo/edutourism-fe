import { describe, it, expect } from "vitest";
import { cn, formatRupiah, getPriceLabel } from "./utils.js";

describe("cn", () => {
  it("merges tailwind classes", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
  it("handles conditional", () => {
    const showB = false;
    expect(cn("a", showB && "b", "c")).toBe("a c");
  });
});

describe("formatRupiah", () => {
  it("returns 0 for falsy", () => {
    expect(formatRupiah(0)).toBe("0");
    expect(formatRupiah(null)).toBe("0");
    expect(formatRupiah(undefined)).toBe("0");
  });
  it("formats id-ID", () => {
    expect(formatRupiah(1000)).toBe("Rp1.000");
    expect(formatRupiah(25000)).toBe("Rp25.000");
    expect(formatRupiah("50000")).toBe("Rp50.000");
  });
});

describe("getPriceLabel", () => {
  it("Gratis for 0/empty", () => {
    expect(getPriceLabel(0, 0)).toBe("Gratis");
    expect(getPriceLabel(null, null)).toBe("Gratis");
    expect(getPriceLabel(undefined, undefined)).toBe("Gratis");
    expect(getPriceLabel("0", "0")).toBe("Gratis");
  });
  it("range", () => {
    expect(getPriceLabel(10000, 30000)).toBe("Rp10.000 - Rp30.000");
    expect(getPriceLabel(10000, 30000, true)).toBe("10K - 30K");
  });
  it("single", () => {
    expect(getPriceLabel(50000, null)).toBe("Rp50.000");
    expect(getPriceLabel(1500, null, true)).toBe("1.5K");
    expect(getPriceLabel(1000, null, true)).toBe("1K");
  });
  it("dash for missing", () => {
    expect(getPriceLabel(null, 50000)).toBe("-");
  });
});
