import type {
  FoodLog,
  UserGoals,
  GroceryList,
  SavedFavorite,
  Profile,
} from "./generated/prisma";

// Convert Prisma Decimal / null to plain number | null
function n(v: unknown): number | null {
  if (v == null) return null;
  return Number(v);
}

// Serialize Prisma FoodLog → snake_case shape for API consumers
export function serializeFoodLog(log: FoodLog) {
  return {
    id: log.id,
    user_id: log.userId,
    date: log.date instanceof Date ? log.date.toISOString().split("T")[0] : log.date,
    time: log.time instanceof Date ? log.time.toISOString() : log.time,
    fdc_id: log.fdcId,
    food_name: log.foodName,
    serving_size: n(log.servingSize),
    serving_unit: log.servingUnit,
    calories: n(log.calories),
    protein: n(log.protein),
    carbs: n(log.carbs),
    fat: n(log.fat),
    fiber: n(log.fiber),
    sodium: n(log.sodium),
    quantity: n(log.quantity) ?? 1,
    saturated_fat: n(log.saturatedFat),
    trans_fat: n(log.transFat),
    polyunsaturated_fat: n(log.polyunsaturatedFat),
    monounsaturated_fat: n(log.monounsaturatedFat),
    cholesterol: n(log.cholesterol),
    sugars: n(log.sugars),
    added_sugars: n(log.addedSugars),
    vitamin_a: n(log.vitaminA),
    vitamin_c: n(log.vitaminC),
    vitamin_d: n(log.vitaminD),
    vitamin_e: n(log.vitaminE),
    vitamin_k: n(log.vitaminK),
    thiamin: n(log.thiamin),
    riboflavin: n(log.riboflavin),
    niacin: n(log.niacin),
    vitamin_b6: n(log.vitaminB6),
    folate: n(log.folate),
    vitamin_b12: n(log.vitaminB12),
    calcium: n(log.calcium),
    iron: n(log.iron),
    magnesium: n(log.magnesium),
    phosphorus: n(log.phosphorus),
    potassium: n(log.potassium),
    zinc: n(log.zinc),
    selenium: n(log.selenium),
    created_at: log.createdAt instanceof Date ? log.createdAt.toISOString() : log.createdAt,
  };
}

// Serialize Prisma UserGoals → snake_case
export function serializeGoals(goals: UserGoals) {
  return {
    id: goals.id,
    user_id: goals.userId,
    calories_goal: goals.caloriesGoal,
    protein_goal: goals.proteinGoal,
    carbs_goal: goals.carbsGoal,
    fat_goal: goals.fatGoal,
    fiber_goal: goals.fiberGoal,
    sodium_goal: goals.sodiumGoal,
    created_at: goals.createdAt instanceof Date ? goals.createdAt.toISOString() : goals.createdAt,
    updated_at: goals.updatedAt instanceof Date ? goals.updatedAt.toISOString() : goals.updatedAt,
  };
}

// Serialize Prisma GroceryList → snake_case
export function serializeGroceryItem(item: GroceryList) {
  return {
    id: item.id,
    user_id: item.userId,
    food_name: item.foodName,
    quantity: n(item.quantity) ?? 1,
    unit: item.unit,
    purchased: item.purchased,
    created_at: item.createdAt instanceof Date ? item.createdAt.toISOString() : item.createdAt,
  };
}

// Serialize Prisma SavedFavorite → snake_case
export function serializeFavorite(fav: SavedFavorite) {
  return {
    id: fav.id,
    user_id: fav.userId,
    fdc_id: fav.fdcId,
    food_name: fav.foodName,
    calories: n(fav.calories),
    protein: n(fav.protein),
    carbs: n(fav.carbs),
    fat: n(fav.fat),
    serving_size: n(fav.servingSize) ?? 100,
    created_at: fav.createdAt instanceof Date ? fav.createdAt.toISOString() : fav.createdAt,
  };
}

// Serialize Prisma Profile → snake_case
export function serializeProfile(profile: Profile) {
  return {
    id: profile.id,
    user_id: profile.userId,
    email: profile.email,
    full_name: profile.fullName,
    age: profile.age,
    sex: profile.sex,
    height_feet: profile.heightFeet,
    height_inches: profile.heightInches,
    weight_lbs: profile.weightLbs,
    activity_level: profile.activityLevel,
    bmi: n(profile.bmi),
    recommended_calories: profile.recommendedCalories,
    recommended_protein: profile.recommendedProtein,
    recommended_carbs: profile.recommendedCarbs,
    recommended_fat: profile.recommendedFat,
    fitness_goal: profile.fitnessGoal,
    created_at: profile.createdAt instanceof Date ? profile.createdAt.toISOString() : profile.createdAt,
    updated_at: profile.updatedAt instanceof Date ? profile.updatedAt.toISOString() : profile.updatedAt,
  };
}
