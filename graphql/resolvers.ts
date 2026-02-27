import { GraphQLError } from "graphql";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/** Pull the authenticated user ID or throw a 401-equivalent error */
async function requireUserId(): Promise<string> {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new GraphQLError("Not authenticated", {
      extensions: { code: "UNAUTHENTICATED" },
    });
  }
  return userId;
}

/** Convert Prisma Decimal / null to plain number | null */
function n(v: unknown): number | null {
  if (v == null) return null;
  return Number(v);
}

/** Aggregate an array of food-log rows into macro totals */
function summarise(logs: Array<{
  calories: unknown; protein: unknown; carbs: unknown;
  fat: unknown; fiber: unknown; sodium: unknown; quantity: unknown;
}>) {
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

// ─── Resolvers ────────────────────────────────────────────────────────────────

export const resolvers = {
  Query: {
    /** Single round-trip: returns logs + goals + profile for the dashboard */
    dashboard: async (_: unknown, { date }: { date?: string }) => {
      const userId = await requireUserId();
      const today = new Date().toISOString().split("T")[0];
      const targetDate = date ?? today;

      // Fetch logs, goals, profile concurrently
      const [rawLogs, goals, profile] = await Promise.all([
        prisma.foodLog.findMany({
          where: {
            userId,
            date: new Date(targetDate),
          },
          orderBy: { time: "asc" },
        }),
        prisma.userGoals.findUnique({ where: { userId } }),
        prisma.profile.findUnique({ where: { userId } }),
      ]);

      // Map Prisma rows → GraphQL shape
      const logs = rawLogs.map((log) => ({
        id:           log.id,
        fdcId:        log.fdcId,
        foodName:     log.foodName,
        date:         log.date instanceof Date ? log.date.toISOString().split("T")[0] : String(log.date),
        time:         log.time instanceof Date ? log.time.toISOString() : String(log.time),
        quantity:     n(log.quantity) ?? 1,
        calories:     n(log.calories),
        protein:      n(log.protein),
        carbs:        n(log.carbs),
        fat:          n(log.fat),
        fiber:        n(log.fiber),
        sodium:       n(log.sodium),
        saturatedFat: n(log.saturatedFat),
        transFat:     n(log.transFat),
        cholesterol:  n(log.cholesterol),
        sugars:       n(log.sugars),
        addedSugars:  n(log.addedSugars),
        vitaminC:     n(log.vitaminC),
        vitaminD:     n(log.vitaminD),
        calcium:      n(log.calcium),
        iron:         n(log.iron),
        potassium:    n(log.potassium),
      }));

      return {
        logs,
        summary: summarise(rawLogs),
        goals: goals
          ? {
              caloriesGoal: goals.caloriesGoal,
              proteinGoal:  goals.proteinGoal,
              carbsGoal:    goals.carbsGoal,
              fatGoal:      goals.fatGoal,
            }
          : null,
        profile: profile
          ? {
              fullName:             profile.fullName,
              age:                  profile.age,
              sex:                  profile.sex,
              fitnessGoal:          profile.fitnessGoal,
              bmi:                  n(profile.bmi),
              recommendedCalories:  profile.recommendedCalories,
              recommendedProtein:   profile.recommendedProtein,
              recommendedCarbs:     profile.recommendedCarbs,
              recommendedFat:       profile.recommendedFat,
            }
          : null,
      };
    },

    groceryItems: async () => {
      const userId = await requireUserId();
      const items = await prisma.groceryList.findMany({
        where: { userId },
        orderBy: { createdAt: "asc" },
      });
      return items.map((item) => ({
        id:        item.id,
        foodName:  item.foodName,
        quantity:  n(item.quantity),
        unit:      item.unit,
        purchased: item.purchased,
      }));
    },

    favorites: async () => {
      const userId = await requireUserId();
      const favs = await prisma.savedFavorite.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });
      return favs.map((fav) => ({
        id:       fav.id,
        fdcId:    fav.fdcId,
        foodName: fav.foodName,
        calories: n(fav.calories),
        protein:  n(fav.protein),
        carbs:    n(fav.carbs),
        fat:      n(fav.fat),
      }));
    },

    profile: async () => {
      const userId = await requireUserId();
      const profile = await prisma.profile.findUnique({ where: { userId } });
      if (!profile) return null;
      return {
        fullName:            profile.fullName,
        age:                 profile.age,
        sex:                 profile.sex,
        fitnessGoal:         profile.fitnessGoal,
        bmi:                 n(profile.bmi),
        recommendedCalories: profile.recommendedCalories,
        recommendedProtein:  profile.recommendedProtein,
        recommendedCarbs:    profile.recommendedCarbs,
        recommendedFat:      profile.recommendedFat,
      };
    },
  },

  Mutation: {
    deleteFoodLog: async (_: unknown, { id }: { id: string }) => {
      const userId = await requireUserId();
      const log = await prisma.foodLog.findUnique({ where: { id } });
      if (!log || log.userId !== userId) {
        throw new GraphQLError("Not found or forbidden", {
          extensions: { code: "FORBIDDEN" },
        });
      }
      await prisma.foodLog.delete({ where: { id } });
      return true;
    },

    toggleGroceryPurchased: async (
      _: unknown,
      { id, purchased }: { id: string; purchased: boolean }
    ) => {
      const userId = await requireUserId();
      const item = await prisma.groceryList.findUnique({ where: { id } });
      if (!item || item.userId !== userId) {
        throw new GraphQLError("Not found or forbidden", {
          extensions: { code: "FORBIDDEN" },
        });
      }
      const updated = await prisma.groceryList.update({
        where: { id },
        data: { purchased },
      });
      return {
        id:        updated.id,
        foodName:  updated.foodName,
        quantity:  n(updated.quantity),
        unit:      updated.unit,
        purchased: updated.purchased,
      };
    },

    deleteFavorite: async (_: unknown, { id }: { id: string }) => {
      const userId = await requireUserId();
      const fav = await prisma.savedFavorite.findUnique({ where: { id } });
      if (!fav || fav.userId !== userId) {
        throw new GraphQLError("Not found or forbidden", {
          extensions: { code: "FORBIDDEN" },
        });
      }
      await prisma.savedFavorite.delete({ where: { id } });
      return true;
    },
  },
};
