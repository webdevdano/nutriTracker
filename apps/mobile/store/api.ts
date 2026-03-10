import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "../lib/api";
import type { FoodLog, UserGoal, GroceryItem } from "@nutritracker/types";

export const mobileApi = createApi({
  reducerPath: "mobileApi",
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl("") }),
  tagTypes: ["FoodLog", "UserGoal", "Grocery"],
  endpoints: (build) => ({
    getFoodLogs: build.query<FoodLog[], { date?: string } | void>({
      query: (args) => {
        const params = args?.date ? `?date=${args.date}` : "";
        return `/api/food-logs${params}`;
      },
      providesTags: ["FoodLog"],
    }),
    getUserGoals: build.query<UserGoal, void>({
      query: () => "/api/user-goals",
      providesTags: ["UserGoal"],
    }),
    getGroceryList: build.query<GroceryItem[], void>({
      query: () => "/api/grocery",
      providesTags: ["Grocery"],
    }),
    searchFoods: build.query<{ foods: unknown[] }, string>({
      query: (q) => `/api/foods/search?query=${encodeURIComponent(q)}`,
    }),
  }),
});

export const {
  useGetFoodLogsQuery,
  useGetUserGoalsQuery,
  useGetGroceryListQuery,
  useSearchFoodsQuery,
} = mobileApi;
