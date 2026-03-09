/**
 * Open Food Facts API client — free, no API key required.
 * Used as a fallback for barcode lookups and international products
 * where USDA coverage is limited.
 *
 * Docs: https://wiki.openfoodfacts.org/API
 */

const OFF_BASE = "https://world.openfoodfacts.org";

// ─── Types ──────────────────────────────────────────────────────────────────

export type OFFNutriments = {
  "energy-kcal_100g"?: number;
  "energy-kcal_serving"?: number;
  proteins_100g?: number;
  carbohydrates_100g?: number;
  fat_100g?: number;
  fiber_100g?: number;
  sodium_100g?: number;
  sugars_100g?: number;
  "saturated-fat_100g"?: number;
  cholesterol_100g?: number;
  potassium_100g?: number;
  calcium_100g?: number;
  iron_100g?: number;
  "vitamin-c_100g"?: number;
};

export type OFFProduct = {
  code: string;
  product_name: string;
  brands?: string;
  quantity?: string;
  serving_size?: string;
  nutriments: OFFNutriments;
  image_url?: string;
};

export type OFFBarcodeResponse = {
  status: number; // 1 = found, 0 = not found
  product?: OFFProduct;
};

export type OFFSearchResponse = {
  count: number;
  page: number;
  page_size: number;
  products: OFFProduct[];
};

// ─── Normalised type (shared with usda.ts shape consumers expect) ────────────

export type NormalizedFood = {
  fdcId: number;
  description: string;
  brandOwner?: string;
  source: "usda" | "off" | "cache";
  /** barcode / UPC from OFF; undefined for pure USDA results */
  barcode?: string;
  foodNutrients: Array<{
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    unitName: string;
    value: number;
  }>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Detect whether a string looks like a product barcode
 * (EAN-8, EAN-13, UPC-A = 12 digits, or UPC-E = 8 digits).
 */
export function isBarcode(query: string): boolean {
  return /^\d{8,14}$/.test(query.trim());
}

/** Convert an OFF product into our normalised shape. */
export function normalizeOFFProduct(product: OFFProduct): NormalizedFood {
  const n = product.nutriments;

  // We give OFF products a synthetic fdcId that won't clash with USDA by using
  // a hash derived from the barcode; callers that need the real barcode use .barcode.
  const barcode = product.code || "";
  const syntheticFdcId = barcode
    ? (parseInt(barcode.slice(-9), 10) || 0) + 9_000_000_000
    : 0;

  const nutrients: NormalizedFood["foodNutrients"] = [];

  const addNutrient = (
    id: number,
    name: string,
    number: string,
    unit: string,
    value: number | undefined,
  ) => {
    if (value != null && !isNaN(value)) {
      nutrients.push({ nutrientId: id, nutrientName: name, nutrientNumber: number, unitName: unit, value });
    }
  };

  addNutrient(1008, "Energy", "208", "kcal", n["energy-kcal_100g"]);
  addNutrient(1003, "Protein", "203", "g", n["proteins_100g"]);
  addNutrient(1005, "Carbohydrate, by difference", "205", "g", n["carbohydrates_100g"]);
  addNutrient(1004, "Total lipid (fat)", "204", "g", n["fat_100g"]);
  addNutrient(1079, "Fiber, total dietary", "291", "g", n["fiber_100g"]);
  addNutrient(1093, "Sodium, Na", "307", "mg",
    n["sodium_100g"] != null ? n["sodium_100g"]! * 1000 : undefined); // g → mg
  addNutrient(2000, "Sugars, total", "269", "g", n["sugars_100g"]);
  addNutrient(1258, "Fatty acids, total saturated", "606", "g", n["saturated-fat_100g"]);
  addNutrient(1253, "Cholesterol", "601", "mg",
    n["cholesterol_100g"] != null ? n["cholesterol_100g"]! * 1000 : undefined);
  addNutrient(1092, "Potassium, K", "306", "mg",
    n["potassium_100g"] != null ? n["potassium_100g"]! * 1000 : undefined);
  addNutrient(1087, "Calcium, Ca", "301", "mg",
    n["calcium_100g"] != null ? n["calcium_100g"]! * 1000 : undefined);
  addNutrient(1089, "Iron, Fe", "303", "mg",
    n["iron_100g"] != null ? n["iron_100g"]! * 1000 : undefined);
  addNutrient(1162, "Vitamin C, total ascorbic acid", "401", "mg",
    n["vitamin-c_100g"] != null ? n["vitamin-c_100g"]! * 1000 : undefined);

  return {
    fdcId: syntheticFdcId,
    description: product.product_name || "Unknown product",
    brandOwner: product.brands,
    source: "off",
    barcode,
    foodNutrients: nutrients,
  };
}

// ─── API calls ───────────────────────────────────────────────────────────────

/** Look up a product by barcode (EAN/UPC). Returns null if not found. */
export async function lookupBarcode(barcode: string): Promise<NormalizedFood | null> {
  const url = `${OFF_BASE}/api/v2/product/${encodeURIComponent(barcode)}.json?fields=code,product_name,brands,quantity,serving_size,nutriments,image_url`;

  const response = await fetch(url, {
    headers: { "User-Agent": "NutriTracker/1.0 (https://github.com/nutritracker)" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Open Food Facts barcode lookup failed (${response.status})`);
  }

  const json = (await response.json()) as OFFBarcodeResponse;

  if (json.status !== 1 || !json.product) {
    return null;
  }

  return normalizeOFFProduct(json.product);
}

/** Text-based search against Open Food Facts. */
export async function searchOFF(
  query: string,
  page = 1,
  pageSize = 25,
): Promise<{ foods: NormalizedFood[]; totalHits: number; currentPage: number; totalPages: number }> {
  const params = new URLSearchParams({
    search_terms: query,
    json: "1",
    page: String(page),
    page_size: String(pageSize),
    fields: "code,product_name,brands,quantity,serving_size,nutriments,image_url",
  });

  const url = `${OFF_BASE}/cgi/search.pl?${params.toString()}`;

  const response = await fetch(url, {
    headers: { "User-Agent": "NutriTracker/1.0 (https://github.com/nutritracker)" },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Open Food Facts search failed (${response.status})`);
  }

  const json = (await response.json()) as OFFSearchResponse;
  const products = (json.products || []).filter((p) => p.product_name);

  return {
    foods: products.map(normalizeOFFProduct),
    totalHits: json.count ?? products.length,
    currentPage: page,
    totalPages: Math.ceil((json.count ?? products.length) / pageSize),
  };
}
