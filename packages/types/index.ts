/**
 * @nutritracker/types
 * Shared TypeScript types used by both web (Next.js) and mobile (Expo) apps.
 */

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
  meal_type?: string;
};

export type UserGoal = {
  calories_goal: number | null;
  protein_goal: number | null;
  carbs_goal: number | null;
  fat_goal: number | null;
  target_weight?: number | null;
  target_date?: string | null;
};

export type UsdaFood = {
  fdcId: number;
  description: string;
  dataType?: string;
  brandOwner?: string;
  /** "usda" | "off" | "custom" — set by clients, not the API */
  source?: string;
  /** id of CustomFood row when source === "custom" */
  customFoodId?: string;
  foodNutrients?: Array<{
    nutrientName: string;
    value: number;
    unitName: string;
  }>;
};

export type GroceryItem = {
  id: string;
  food_name: string;
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
  serving_size: number | null;
};

export type CustomFood = {
  id: string;
  name: string;
  serving_size: number | null;
  serving_unit: string;
  category: string | null;
  barcode: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sodium: number | null;
  created_at: string;
  updated_at: string;
};

export type UserRecipe = {
  id: string;
  title: string;
  description: string | null;
  ingredients: string[];
  instructions: string | null;
  servings: number;
  prep_time: number | null;
  cook_time: number | null;
  image_url: string | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  fiber: number | null;
  sodium: number | null;
  created_at: string;
  updated_at: string;
};

export type SavedRecipe = {
  id: string;
  spoonacular_id: number;
  title: string;
  image: string | null;
  servings: number | null;
  ready_in_minutes: number | null;
  calories: number | null;
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  created_at: string;
};

export type WeightLog = {
  id: string;
  weight_lbs: number;
  note: string | null;
  logged_at: string; // YYYY-MM-DD
  created_at: string;
};

export type MealType = "BREAKFAST" | "LUNCH" | "DINNER" | "SNACK";

export type NutrientKey =
  | "calories" | "protein" | "carbs" | "fat" | "fiber" | "sodium"
  | "saturated_fat" | "trans_fat" | "polyunsaturated_fat" | "monounsaturated_fat"
  | "cholesterol" | "sugars" | "added_sugars"
  | "vitamin_a" | "vitamin_c" | "vitamin_d" | "vitamin_e" | "vitamin_k"
  | "thiamin" | "riboflavin" | "niacin" | "vitamin_b6" | "folate" | "vitamin_b12"
  | "calcium" | "iron" | "magnesium" | "phosphorus" | "potassium" | "zinc" | "selenium";
