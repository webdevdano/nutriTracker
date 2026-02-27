/**
 * Pure utility helpers shared by GraphQL resolvers.
 * Extracted so they can be unit-tested independently of Prisma / NextAuth.
 */

/** Convert a Prisma Decimal, string, or null/undefined to a plain number | null */
export function n(v: unknown): number | null {
  if (v == null) return null;
  return Number(v);
}

/** Aggregate an array of food-log rows into macro totals (per-quantity) */
export function summarise(
  logs: Array<{
    calories: unknown;
    protein: unknown;
    carbs: unknown;
    fat: unknown;
    fiber: unknown;
    sodium: unknown;
    quantity: unknown;
  }>
): {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
} {
  return logs.reduce(
    (acc, log) => {
      const qty = Number(log.quantity) || 1;
      return {
        calories: acc.calories + (n(log.calories) ?? 0) * qty,
        protein:  acc.protein  + (n(log.protein)  ?? 0) * qty,
        carbs:    acc.carbs    + (n(log.carbs)     ?? 0) * qty,
        fat:      acc.fat      + (n(log.fat)       ?? 0) * qty,
        fiber:    acc.fiber    + (n(log.fiber)     ?? 0) * qty,
        sodium:   acc.sodium   + (n(log.sodium)    ?? 0) * qty,
      };
    },
    { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sodium: 0 }
  );
}
