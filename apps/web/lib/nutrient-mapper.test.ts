import { extractNutrients, getNutrientDisplayInfo } from "./nutrient-mapper";

// ─── extractNutrients ──────────────────────────────────────────────────────────

describe("extractNutrients()", () => {
  it("returns empty object for undefined input", () => {
    expect(extractNutrients(undefined)).toEqual({});
  });

  it("returns empty object for empty array", () => {
    expect(extractNutrients([])).toEqual({});
  });

  it("maps known USDA nutrient IDs to correct field names", () => {
    const result = extractNutrients([
      { nutrientId: 1008, nutrientName: "Energy", value: 250, unitName: "kcal" },
      { nutrientId: 1003, nutrientName: "Protein", value: 12.5, unitName: "g" },
      { nutrientId: 1005, nutrientName: "Carbohydrate", value: 30, unitName: "g" },
      { nutrientId: 1004, nutrientName: "Total Fat", value: 8, unitName: "g" },
    ]);
    expect(result.calories).toBe(250);
    expect(result.protein).toBe(12.5);
    expect(result.carbs).toBe(30);
    expect(result.fat).toBe(8);
  });

  it("maps mineral and vitamin IDs correctly", () => {
    const result = extractNutrients([
      { nutrientId: 1093, nutrientName: "Sodium", value: 410, unitName: "mg" },
      { nutrientId: 1162, nutrientName: "Vitamin C", value: 60, unitName: "mg" },
      { nutrientId: 1087, nutrientName: "Calcium", value: 300, unitName: "mg" },
    ]);
    expect(result.sodium).toBe(410);
    expect(result.vitamin_c).toBe(60);
    expect(result.calcium).toBe(300);
  });

  it("ignores unknown nutrient IDs", () => {
    const result = extractNutrients([
      { nutrientId: 9999, nutrientName: "Unknown", value: 100, unitName: "g" },
    ]);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it("handles a mix of known and unknown IDs", () => {
    const result = extractNutrients([
      { nutrientId: 1008, nutrientName: "Energy", value: 100, unitName: "kcal" },
      { nutrientId: 8888, nutrientName: "Mystery", value: 99, unitName: "g" },
    ]);
    expect(result.calories).toBe(100);
    expect(Object.keys(result)).toHaveLength(1);
  });
});

// ─── getNutrientDisplayInfo ───────────────────────────────────────────────────

describe("getNutrientDisplayInfo()", () => {
  it("returns correct info for calories (macro)", () => {
    const info = getNutrientDisplayInfo("calories");
    expect(info.label).toBe("Calories");
    expect(info.unit).toBe("kcal");
    expect(info.category).toBe("macro");
  });

  it("returns correct info for protein (macro)", () => {
    const info = getNutrientDisplayInfo("protein");
    expect(info.label).toBe("Protein");
    expect(info.unit).toBe("g");
    expect(info.category).toBe("macro");
  });

  it("returns correct info for calcium (mineral)", () => {
    const info = getNutrientDisplayInfo("calcium");
    expect(info.label).toBe("Calcium");
    expect(info.unit).toBe("mg");
    expect(info.category).toBe("mineral");
  });

  it("returns correct info for vitamin_c (vitamin)", () => {
    const info = getNutrientDisplayInfo("vitamin_c");
    expect(info.label).toBe("Vitamin C");
    expect(info.unit).toBe("mg");
    expect(info.category).toBe("vitamin");
  });

  it("returns correct info for sodium (mineral)", () => {
    const info = getNutrientDisplayInfo("sodium");
    expect(info.category).toBe("mineral");
  });
});
