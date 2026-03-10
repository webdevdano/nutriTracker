import { n, summarise } from "./utils";

describe("n() — Decimal/null → number converter", () => {
  it("returns null for null", () => {
    expect(n(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(n(undefined)).toBeNull();
  });

  it("converts a plain number", () => {
    expect(n(42)).toBe(42);
  });

  it("converts a numeric string", () => {
    expect(n("3.14")).toBeCloseTo(3.14);
  });

  it("converts a Prisma Decimal-like object (toString → Number)", () => {
    // Prisma Decimal objects coerce via Number()
    const decimalLike = { valueOf: () => 9.99 };
    expect(n(decimalLike)).toBeCloseTo(9.99);
  });

  it("converts zero", () => {
    expect(n(0)).toBe(0);
  });
});

describe("summarise() — macro aggregator", () => {
  const makeLog = (
    overrides: Partial<{
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
      sodium: number;
      quantity: number;
    }> = {}
  ) => ({
    calories: 200,
    protein: 10,
    carbs: 30,
    fat: 5,
    fiber: 2,
    sodium: 300,
    quantity: 1,
    ...overrides,
  });

  it("returns all zeros for an empty array", () => {
    expect(summarise([])).toEqual({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sodium: 0,
    });
  });

  it("returns the log's values when quantity is 1", () => {
    const result = summarise([makeLog()]);
    expect(result.calories).toBe(200);
    expect(result.protein).toBe(10);
    expect(result.carbs).toBe(30);
    expect(result.fat).toBe(5);
    expect(result.fiber).toBe(2);
    expect(result.sodium).toBe(300);
  });

  it("multiplies values by quantity", () => {
    const result = summarise([makeLog({ quantity: 2 })]);
    expect(result.calories).toBe(400);
    expect(result.protein).toBe(20);
  });

  it("accumulates across multiple logs", () => {
    const result = summarise([
      makeLog({ calories: 100, protein: 5, quantity: 1 }),
      makeLog({ calories: 200, protein: 10, quantity: 1 }),
    ]);
    expect(result.calories).toBe(300);
    expect(result.protein).toBe(15);
  });

  it("treats null nutrients as 0 (does not crash)", () => {
    const result = summarise([
      { calories: null, protein: null, carbs: null, fat: null, fiber: null, sodium: null, quantity: 1 },
    ]);
    expect(result).toEqual({
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      fiber: 0,
      sodium: 0,
    });
  });

  it("defaults quantity to 1 when quantity is 0 or falsy", () => {
    // quantity=0 triggers || 1 fallback
    const result = summarise([makeLog({ calories: 100, quantity: 0 })]);
    expect(result.calories).toBe(100);
  });
});
