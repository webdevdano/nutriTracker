/**
 * food-service.ts
 *
 * Orchestration layer for food lookups:
 *   1. Check PostgreSQL cache (FoodCache table)
 *   2. Primary: USDA FoodData Central
 *   3. Fallback: Open Food Facts (barcodes + international products)
 *   4. Write results back to cache
 *
 * Cache TTLs:
 *   - Search results : 24 hours  (results change infrequently)
 *   - Food details   :  7 days   (nutrition data is stable)
 *   - Barcode lookup :  7 days   (product data rarely changes)
 */

import { prisma } from "@/lib/prisma";
import { searchFoods, getFoodDetails, type UsdaFood, type UsdaSearchResponse } from "@/lib/usda";
import { lookupBarcode, searchOFF, isBarcode, type NormalizedFood } from "@/lib/open-food-facts";

// ─── TTLs ────────────────────────────────────────────────────────────────────

const TTL_SEARCH_MS = 24 * 60 * 60 * 1000;      // 24 h
const TTL_DETAIL_MS = 7 * 24 * 60 * 60 * 1000;   // 7 days

// ─── Cache helpers ───────────────────────────────────────────────────────────

async function getCached<T>(key: string): Promise<T | null> {
  try {
    const row = await prisma.foodCache.findUnique({ where: { cacheKey: key } });
    if (!row) return null;
    if (row.expiresAt < new Date()) {
      // Stale — delete async, don't block the response
      prisma.foodCache.delete({ where: { cacheKey: key } }).catch(() => {});
      return null;
    }
    return row.data as T;
  } catch {
    return null; // cache failures are non-fatal
  }
}

async function setCache(key: string, source: string, data: unknown, ttlMs: number): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + ttlMs);
    await prisma.foodCache.upsert({
      where: { cacheKey: key },
      update: { data: data as never, expiresAt, source, updatedAt: new Date() },
      create: { cacheKey: key, source, data: data as never, expiresAt },
    });
  } catch {
    // cache write failures are non-fatal
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export type FoodSearchResult = {
  foods: NormalizedFood[];
  totalHits: number;
  currentPage: number;
  totalPages: number;
  source: "cache" | "usda" | "off" | "usda+off";
};

export type FoodDetailResult = NormalizedFood & { source: "cache" | "usda" | "off" };

/**
 * Search for foods.
 * - If the query looks like a barcode → barcode lookup path
 * - Otherwise USDA first; if 0 results, try OFF
 * - All results are cached in PostgreSQL
 */
export async function searchFoodsService(
  query: string,
  page = 1,
  pageSize = 25,
): Promise<FoodSearchResult> {
  const trimmed = query.trim();

  // ── Barcode path ──────────────────────────────────────────────────────────
  if (isBarcode(trimmed)) {
    return barcodeLookupService(trimmed);
  }

  // ── Text search ───────────────────────────────────────────────────────────
  const cacheKey = `usda:search:${trimmed.toLowerCase()}:${page}:${pageSize}`;
  const cached = await getCached<FoodSearchResult>(cacheKey);
  if (cached) return { ...cached, source: "cache" };

  // 1. Try USDA
  let usdaResult: UsdaSearchResponse | null = null;
  try {
    usdaResult = await searchFoods(trimmed, page, pageSize);
  } catch {
    // USDA down — fall through to OFF
  }

  if (usdaResult && usdaResult.foods.length > 0) {
    const result: FoodSearchResult = {
      foods: usdaResult.foods.map(normalizeUsdaFood),
      totalHits: usdaResult.totalHits,
      currentPage: usdaResult.currentPage,
      totalPages: usdaResult.totalPages,
      source: "usda",
    };
    await setCache(cacheKey, "usda", result, TTL_SEARCH_MS);
    return result;
  }

  // 2. Fallback: Open Food Facts
  try {
    const offResult = await searchOFF(trimmed, page, pageSize);
    const result: FoodSearchResult = {
      ...offResult,
      source: usdaResult ? "off" : "usda+off", // distinguish "USDA returned 0" vs "USDA failed"
    };
    await setCache(cacheKey, "off", result, TTL_SEARCH_MS);
    return result;
  } catch {
    // Both failed — return empty or rethrow USDA error
    if (usdaResult) {
      // USDA returned 0, OFF also failed → return empty USDA response
      return {
        foods: [],
        totalHits: 0,
        currentPage: page,
        totalPages: 0,
        source: "usda",
      };
    }
    throw new Error(`Food search failed for "${trimmed}": both USDA and Open Food Facts are unavailable`);
  }
}

/**
 * Get full nutritional details for a USDA fdcId.
 * Cached for 7 days.
 */
export async function getFoodDetailsService(fdcId: number): Promise<FoodDetailResult> {
  const cacheKey = `usda:detail:${fdcId}`;
  const cached = await getCached<FoodDetailResult>(cacheKey);
  if (cached) return { ...cached, source: "cache" };

  const data = await getFoodDetails(fdcId);
  const normalized: FoodDetailResult = { ...normalizeUsdaFood(data), source: "usda" };
  await setCache(cacheKey, "usda", normalized, TTL_DETAIL_MS);
  return normalized;
}

/**
 * Look up a product by barcode.
 * Tries USDA branded foods first (they index GPC/UPC), then Open Food Facts.
 * Cached for 7 days.
 */
export async function barcodeLookupService(barcode: string): Promise<FoodSearchResult> {
  const cacheKey = `barcode:${barcode}`;
  const cached = await getCached<FoodSearchResult>(cacheKey);
  if (cached) return { ...cached, source: "cache" };

  // 1. Try USDA branded food search by barcode/GTIN
  try {
    const usdaResult = await searchFoods(barcode, 1, 5);
    if (usdaResult.foods.length > 0) {
      const result: FoodSearchResult = {
        foods: usdaResult.foods.map(normalizeUsdaFood),
        totalHits: usdaResult.totalHits,
        currentPage: 1,
        totalPages: usdaResult.totalPages,
        source: "usda",
      };
      await setCache(cacheKey, "usda", result, TTL_DETAIL_MS);
      return result;
    }
  } catch {
    // fall through
  }

  // 2. Fallback: OFF barcode lookup
  const offProduct = await lookupBarcode(barcode);
  if (offProduct) {
    const result: FoodSearchResult = {
      foods: [offProduct],
      totalHits: 1,
      currentPage: 1,
      totalPages: 1,
      source: "off",
    };
    await setCache(cacheKey, "off", result, TTL_DETAIL_MS);
    return result;
  }

  return { foods: [], totalHits: 0, currentPage: 1, totalPages: 0, source: "off" };
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

function normalizeUsdaFood(food: UsdaFood): NormalizedFood {
  return {
    fdcId: food.fdcId,
    description: food.description,
    brandOwner: food.brandOwner,
    source: "usda",
    foodNutrients: (food.foodNutrients ?? []).map((n) => ({
      nutrientId: n.nutrientId,
      nutrientName: n.nutrientName,
      nutrientNumber: n.nutrientNumber,
      unitName: n.unitName,
      value: n.value,
    })),
  };
}

/** Purge expired cache rows. Call from a cron/scheduled route. */
export async function purgeExpiredCache(): Promise<number> {
  const result = await prisma.foodCache.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  return result.count;
}
