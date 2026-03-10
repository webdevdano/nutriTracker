import { gql } from "@apollo/client/core";

/**
 * GraphQL type definitions for the NutriTracker API.
 *
 * Architecture:
 * - Queries: Prefer GraphQL for reads that aggregate multiple Prisma models
 *   (e.g. DashboardData fetches logs + goals in one round-trip).
 * - Mutations: Available here; heavy mutations also covered by RTK Query REST endpoints.
 */
export const typeDefs = gql`
  # ─── Scalar types ────────────────────────────────────────────────────────────

  "ISO-8601 date string (YYYY-MM-DD)"
  scalar Date

  "ISO-8601 datetime string"
  scalar DateTime

  # ─── Food Log ─────────────────────────────────────────────────────────────────

  type FoodLogEntry {
    id: ID!
    fdcId: Int!
    foodName: String!
    date: Date!
    time: DateTime!
    quantity: Float!

    # Macros
    calories: Float
    protein: Float
    carbs: Float
    fat: Float
    fiber: Float
    sodium: Float

    # Extended macros
    saturatedFat: Float
    transFat: Float
    cholesterol: Float
    sugars: Float
    addedSugars: Float

    # Key vitamins / minerals
    vitaminC: Float
    vitaminD: Float
    calcium: Float
    iron: Float
    potassium: Float
  }

  # ─── Nutrition summary (aggregated totals) ────────────────────────────────────

  type NutritionSummary {
    calories: Float!
    protein: Float!
    carbs: Float!
    fat: Float!
    fiber: Float!
    sodium: Float!
  }

  # ─── Goals ───────────────────────────────────────────────────────────────────

  type UserGoals {
    caloriesGoal: Int
    proteinGoal: Int
    carbsGoal: Int
    fatGoal: Int
  }

  # ─── Profile ─────────────────────────────────────────────────────────────────

  type Profile {
    fullName: String
    age: Int
    sex: String
    fitnessGoal: String
    bmi: Float
    recommendedCalories: Int
    recommendedProtein: Int
    recommendedCarbs: Int
    recommendedFat: Int
  }

  # ─── Dashboard aggregate type ────────────────────────────────────────────────

  "All data needed to render the dashboard in one request"
  type DashboardData {
    logs: [FoodLogEntry!]!
    goals: UserGoals
    summary: NutritionSummary!
    profile: Profile
  }

  # ─── Grocery ─────────────────────────────────────────────────────────────────

  type GroceryItem {
    id: ID!
    foodName: String!
    quantity: Float
    unit: String
    purchased: Boolean!
  }

  # ─── Favorites ───────────────────────────────────────────────────────────────

  type Favorite {
    id: ID!
    fdcId: Int!
    foodName: String!
    calories: Float
    protein: Float
    carbs: Float
    fat: Float
  }

  # ─── Queries ─────────────────────────────────────────────────────────────────

  type Query {
    "Fetch dashboard aggregate for a specific date (defaults to today)"
    dashboard(date: Date): DashboardData!

    "Fetch the authenticated user's grocery list"
    groceryItems: [GroceryItem!]!

    "Fetch the authenticated user's saved favorites"
    favorites: [Favorite!]!

    "Fetch the authenticated user's profile"
    profile: Profile
  }

  # ─── Mutations ───────────────────────────────────────────────────────────────

  type Mutation {
    "Delete a food log entry by ID"
    deleteFoodLog(id: ID!): Boolean!

    "Toggle the purchased state of a grocery item"
    toggleGroceryPurchased(id: ID!, purchased: Boolean!): GroceryItem!

    "Remove a saved favorite by ID"
    deleteFavorite(id: ID!): Boolean!
  }
`;
