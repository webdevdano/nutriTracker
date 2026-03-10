import { gql } from "@apollo/client/core";

// ─── Dashboard ────────────────────────────────────────────────────────────────

/**
 * Single round-trip query that fetches everything the dashboard needs.
 * Replaces parallel REST calls to /api/food-logs + /api/user-goals.
 */
export const DASHBOARD_QUERY = gql`
  query Dashboard($date: Date) {
    dashboard(date: $date) {
      logs {
        id
        fdcId
        foodName
        date
        time
        quantity
        calories
        protein
        carbs
        fat
        fiber
        sodium
        saturatedFat
        transFat
        cholesterol
        sugars
        addedSugars
        vitaminC
        vitaminD
        calcium
        iron
        potassium
      }
      summary {
        calories
        protein
        carbs
        fat
        fiber
        sodium
      }
      goals {
        caloriesGoal
        proteinGoal
        carbsGoal
        fatGoal
      }
      profile {
        fullName
        fitnessGoal
        recommendedCalories
        recommendedProtein
        recommendedCarbs
        recommendedFat
      }
    }
  }
`;

// ─── Grocery ─────────────────────────────────────────────────────────────────

export const GROCERY_QUERY = gql`
  query GroceryItems {
    groceryItems {
      id
      foodName
      quantity
      unit
      purchased
    }
  }
`;

// ─── Favorites ───────────────────────────────────────────────────────────────

export const FAVORITES_QUERY = gql`
  query Favorites {
    favorites {
      id
      fdcId
      foodName
      calories
      protein
      carbs
      fat
    }
  }
`;

// ─── Mutations ───────────────────────────────────────────────────────────────

export const DELETE_FOOD_LOG_MUTATION = gql`
  mutation DeleteFoodLog($id: ID!) {
    deleteFoodLog(id: $id)
  }
`;

export const TOGGLE_GROCERY_PURCHASED_MUTATION = gql`
  mutation ToggleGroceryPurchased($id: ID!, $purchased: Boolean!) {
    toggleGroceryPurchased(id: $id, purchased: $purchased) {
      id
      purchased
    }
  }
`;

export const DELETE_FAVORITE_MUTATION = gql`
  mutation DeleteFavorite($id: ID!) {
    deleteFavorite(id: $id)
  }
`;
