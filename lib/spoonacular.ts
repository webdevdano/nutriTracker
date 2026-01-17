type SpoonacularConfig = {
  apiKey: string;
};

function getSpoonacularConfig(): SpoonacularConfig {
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing SPOONACULAR_API_KEY. Add it to .env.local",
    );
  }

  return { apiKey };
}

const BASE_URL = "https://api.spoonacular.com";

async function spoonacularFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const { apiKey } = getSpoonacularConfig();
  const url = new URL(`${BASE_URL}${endpoint}`);
  
  url.searchParams.set("apiKey", apiKey);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Spoonacular API error: ${response.status}`);
  }

  return response.json();
}

// Recipe search
export type SpoonacularRecipe = {
  id: number;
  title: string;
  image: string;
  imageType: string;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
};

export async function searchRecipes(
  query: string,
  number: number = 10,
  addRecipeNutrition: boolean = true
): Promise<{ results: SpoonacularRecipe[] }> {
  return spoonacularFetch("/recipes/complexSearch", {
    query,
    number: number.toString(),
    addRecipeNutrition: addRecipeNutrition.toString(),
  });
}

// Get recipe information
export type RecipeInformation = {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  sourceUrl: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  instructions: string;
  extendedIngredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
    original: string;
  }>;
  nutrition: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }>;
  };
};

export async function getRecipeInformation(
  recipeId: number,
  includeNutrition: boolean = true
): Promise<RecipeInformation> {
  return spoonacularFetch(`/recipes/${recipeId}/information`, {
    includeNutrition: includeNutrition.toString(),
  });
}

// Generate meal plan
export type MealPlanDay = {
  meals: Array<{
    id: number;
    title: string;
    imageType: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
  }>;
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
};

export type MealPlan = {
  meals: Array<{
    id: number;
    title: string;
    imageType: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
  }>;
  nutrients: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
};

export async function generateMealPlan(
  timeFrame: "day" | "week",
  targetCalories?: number,
  diet?: string,
  exclude?: string
): Promise<MealPlan> {
  const params: Record<string, string> = {
    timeFrame,
  };

  if (targetCalories) params.targetCalories = targetCalories.toString();
  if (diet) params.diet = diet;
  if (exclude) params.exclude = exclude;

  return spoonacularFetch("/mealplanner/generate", params);
}

// Generate shopping list from meal plan
export type ShoppingListItem = {
  name: string;
  aisle: string;
  amount: number;
  unit: string;
};

export async function generateShoppingList(
  username: string,
  startDate: string,
  endDate: string,
  hash: string
): Promise<{ aisles: Array<{ aisle: string; items: ShoppingListItem[] }> }> {
  return spoonacularFetch(`/mealplanner/${username}/shopping-list/${startDate}/${endDate}`, {
    hash,
  });
}

// Get random recipes (for meal suggestions)
export async function getRandomRecipes(
  number: number = 10,
  tags?: string
): Promise<{ recipes: RecipeInformation[] }> {
  const params: Record<string, string> = {
    number: number.toString(),
  };

  if (tags) params.tags = tags;

  return spoonacularFetch("/recipes/random", params);
}

// Search recipes by nutrients (for specific macro goals)
export async function searchRecipesByNutrients(
  minProtein?: number,
  maxProtein?: number,
  minCarbs?: number,
  maxCarbs?: number,
  minCalories?: number,
  maxCalories?: number,
  number: number = 10
): Promise<SpoonacularRecipe[]> {
  const params: Record<string, string> = {
    number: number.toString(),
  };

  if (minProtein) params.minProtein = minProtein.toString();
  if (maxProtein) params.maxProtein = maxProtein.toString();
  if (minCarbs) params.minCarbs = minCarbs.toString();
  if (maxCarbs) params.maxCarbs = maxCarbs.toString();
  if (minCalories) params.minCalories = minCalories.toString();
  if (maxCalories) params.maxCalories = maxCalories.toString();

  return spoonacularFetch("/recipes/findByNutrients", params);
}
