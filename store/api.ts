/**
 * RTK Query API slice — central hub for all server communication.
 * Each endpoint automatically generates hooks like:
 *   useGetFoodLogsQuery, useAddFoodLogMutation, etc.
 */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// ─── Shared Types ─────────────────────────────────────────────────────────────

export type FoodLog = {
  id: string;
  fdc_id: number;
  food_name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sodium: number | null;
  saturated_fat: number | null;
  trans_fat: number | null;
  polyunsaturated_fat: number | null;
  monounsaturated_fat: number | null;
  cholesterol: number | null;
  sugars: number | null;
  added_sugars: number | null;
  vitamin_a: number | null;
  vitamin_c: number | null;
  vitamin_d: number | null;
  vitamin_e: number | null;
  vitamin_k: number | null;
  thiamin: number | null;
  riboflavin: number | null;
  niacin: number | null;
  vitamin_b6: number | null;
  folate: number | null;
  vitamin_b12: number | null;
  calcium: number | null;
  iron: number | null;
  magnesium: number | null;
  phosphorus: number | null;
  potassium: number | null;
  zinc: number | null;
  selenium: number | null;
  quantity: number;
  time: string;
  date?: string;
};

export type UserGoal = {
  calories_goal: number | null;
  protein_goal: number | null;
  carbs_goal: number | null;
  fat_goal: number | null;
};

export type UsdaFood = {
  fdcId: number;
  description: string;
  dataType?: string;
  brandOwner?: string;
  foodNutrients?: Array<{
    nutrientName: string;
    value: number;
    unitName: string;
  }>;
};

export type GroceryItem = {
  id: string;
  item_name: string;
  quantity: number;
  unit: string | null;
  purchased: boolean;
  category: string | null;
};

export type Favorite = {
  id: string;
  fdc_id: number;
  food_name: string;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
};

// ─── RTK Query API ────────────────────────────────────────────────────────────

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["FoodLog", "Goals", "Grocery", "Favorites"],

  endpoints: (builder) => ({
    // ── Food Logs ──────────────────────────────────────────────────────────
    getFoodLogs: builder.query<FoodLog[], { date?: string; start?: string; end?: string }>({
      query: ({ date, start, end }) => {
        const params = new URLSearchParams();
        if (date) params.set("date", date);
        if (start) params.set("start", start);
        if (end) params.set("end", end);
        return `api/food-logs?${params}`;
      },
      transformResponse: (res: { logs: FoodLog[] }) => res.logs ?? [],
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "FoodLog" as const, id })), { type: "FoodLog", id: "LIST" }]
          : [{ type: "FoodLog", id: "LIST" }],
    }),

    addFoodLog: builder.mutation<FoodLog, Partial<FoodLog>>({
      query: (body) => ({ url: "api/food-logs", method: "POST", body }),
      invalidatesTags: [{ type: "FoodLog", id: "LIST" }],
    }),

    updateFoodLog: builder.mutation<FoodLog, Partial<FoodLog> & { id: string }>({
      query: (body) => ({ url: "api/food-logs", method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [{ type: "FoodLog", id }],
    }),

    deleteFoodLog: builder.mutation<void, string>({
      query: (id) => ({ url: `api/food-logs?id=${id}`, method: "DELETE" }),
      invalidatesTags: (_result, _err, id) => [{ type: "FoodLog", id }, { type: "FoodLog", id: "LIST" }],
    }),

    // ── User Goals ────────────────────────────────────────────────────────
    getUserGoals: builder.query<UserGoal | null, void>({
      query: () => "api/user-goals",
      transformResponse: (res: { goals: UserGoal | null }) => res.goals,
      providesTags: ["Goals"],
    }),

    updateUserGoals: builder.mutation<UserGoal, Partial<UserGoal>>({
      query: (body) => ({ url: "api/user-goals", method: "POST", body }),
      invalidatesTags: ["Goals"],
    }),

    // ── Food Search ───────────────────────────────────────────────────────
    searchFoods: builder.query<UsdaFood[], string>({
      query: (q) => `api/foods/search?query=${encodeURIComponent(q)}&pageSize=5`,
      transformResponse: (res: { foods: UsdaFood[] }) => {
        const seen = new Set<string>();
        return (res.foods ?? [])
          .filter((f) => {
            const key = f.description.toLowerCase().trim();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
          })
          .slice(0, 5);
      },
    }),

    getFoodDetail: builder.query<{
      description: string;
      foodNutrients: Array<{ nutrient?: { name: string }; nutrientName?: string; amount?: number; value?: number }>;
    }, number>({
      query: (fdcId) => `api/foods/${fdcId}`,
    }),

    // ── Grocery ───────────────────────────────────────────────────────────
    getGroceryItems: builder.query<GroceryItem[], void>({
      query: () => "api/grocery",
      transformResponse: (res: { items: GroceryItem[] }) => res.items ?? [],
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Grocery" as const, id })), { type: "Grocery", id: "LIST" }]
          : [{ type: "Grocery", id: "LIST" }],
    }),

    addGroceryItem: builder.mutation<GroceryItem, { item_name: string; quantity?: number; unit?: string; category?: string }>({
      query: (body) => ({ url: "api/grocery", method: "POST", body }),
      invalidatesTags: [{ type: "Grocery", id: "LIST" }],
    }),

    updateGroceryItem: builder.mutation<GroceryItem, Partial<GroceryItem> & { id: string }>({
      query: (body) => ({ url: "api/grocery", method: "PATCH", body }),
      invalidatesTags: (_result, _err, { id }) => [{ type: "Grocery", id }],
    }),

    deleteGroceryItem: builder.mutation<void, string>({
      query: (id) => ({ url: `api/grocery?id=${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Grocery", id: "LIST" }],
    }),

    // ── Favorites ─────────────────────────────────────────────────────────
    getFavorites: builder.query<Favorite[], void>({
      query: () => "api/favorites",
      transformResponse: (res: { favorites: Favorite[] }) => res.favorites ?? [],
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Favorites" as const, id })), { type: "Favorites", id: "LIST" }]
          : [{ type: "Favorites", id: "LIST" }],
    }),

    addFavorite: builder.mutation<Favorite, Partial<Favorite>>({
      query: (body) => ({ url: "api/favorites", method: "POST", body }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),

    deleteFavorite: builder.mutation<void, string>({
      query: (id) => ({ url: `api/favorites?id=${id}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
  }),
});

// Auto-generated hooks
export const {
  useGetFoodLogsQuery,
  useAddFoodLogMutation,
  useUpdateFoodLogMutation,
  useDeleteFoodLogMutation,
  useGetUserGoalsQuery,
  useUpdateUserGoalsMutation,
  useSearchFoodsQuery,
  useLazySearchFoodsQuery,
  useGetFoodDetailQuery,
  useLazyGetFoodDetailQuery,
  useGetGroceryItemsQuery,
  useAddGroceryItemMutation,
  useUpdateGroceryItemMutation,
  useDeleteGroceryItemMutation,
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = api;
