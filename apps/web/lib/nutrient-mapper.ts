/**
 * Maps USDA nutrient IDs to our database field names
 * Reference: https://fdc.nal.usda.gov/
 */

export type NutrientData = {
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  sodium?: number;
  
  // Additional macronutrients
  saturated_fat?: number;
  trans_fat?: number;
  polyunsaturated_fat?: number;
  monounsaturated_fat?: number;
  cholesterol?: number;
  sugars?: number;
  added_sugars?: number;
  
  // Vitamins
  vitamin_a?: number;
  vitamin_c?: number;
  vitamin_d?: number;
  vitamin_e?: number;
  vitamin_k?: number;
  thiamin?: number;
  riboflavin?: number;
  niacin?: number;
  vitamin_b6?: number;
  folate?: number;
  vitamin_b12?: number;
  
  // Minerals
  calcium?: number;
  iron?: number;
  magnesium?: number;
  phosphorus?: number;
  potassium?: number;
  zinc?: number;
  selenium?: number;
};

/**
 * USDA FoodData Central Nutrient ID mapping
 * These IDs are consistent across the USDA database
 */
const NUTRIENT_ID_MAP: Record<number, keyof NutrientData> = {
  // Energy and Macronutrients
  1008: 'calories',        // Energy (kcal)
  1003: 'protein',         // Protein (g)
  1005: 'carbs',          // Carbohydrate, by difference (g)
  1004: 'fat',            // Total lipid (fat) (g)
  1079: 'fiber',          // Fiber, total dietary (g)
  
  // Fats
  1258: 'saturated_fat',         // Fatty acids, total saturated (g)
  1257: 'trans_fat',             // Fatty acids, total trans (g)
  1293: 'polyunsaturated_fat',   // Fatty acids, total polyunsaturated (g)
  1292: 'monounsaturated_fat',   // Fatty acids, total monounsaturated (g)
  1253: 'cholesterol',           // Cholesterol (mg)
  
  // Carbohydrates
  2000: 'sugars',         // Sugars, total including NLEA (g)
  1063: 'added_sugars',   // Sugars, added (g)
  
  // Minerals
  1093: 'sodium',         // Sodium, Na (mg)
  1087: 'calcium',        // Calcium, Ca (mg)
  1089: 'iron',           // Iron, Fe (mg)
  1090: 'magnesium',      // Magnesium, Mg (mg)
  1091: 'phosphorus',     // Phosphorus, P (mg)
  1092: 'potassium',      // Potassium, K (mg)
  1095: 'zinc',           // Zinc, Zn (mg)
  1103: 'selenium',       // Selenium, Se (µg)
  
  // Vitamins
  1106: 'vitamin_a',      // Vitamin A, RAE (µg)
  1162: 'vitamin_c',      // Vitamin C, total ascorbic acid (mg)
  1114: 'vitamin_d',      // Vitamin D (D2 + D3) (µg)
  1109: 'vitamin_e',      // Vitamin E (alpha-tocopherol) (mg)
  1185: 'vitamin_k',      // Vitamin K (phylloquinone) (µg)
  1165: 'thiamin',        // Thiamin (mg)
  1166: 'riboflavin',     // Riboflavin (mg)
  1167: 'niacin',         // Niacin (mg)
  1175: 'vitamin_b6',     // Vitamin B-6 (mg)
  1177: 'folate',         // Folate, total (µg)
  1178: 'vitamin_b12',    // Vitamin B-12 (µg)
};

/**
 * Extract nutrients from USDA food data
 */
export function extractNutrients(
  foodNutrients?: Array<{
    nutrientId: number;
    nutrientName: string;
    value: number;
    unitName: string;
  }>
): NutrientData {
  if (!foodNutrients || foodNutrients.length === 0) {
    return {};
  }

  const nutrients: NutrientData = {};

  for (const nutrient of foodNutrients) {
    const fieldName = NUTRIENT_ID_MAP[nutrient.nutrientId];
    if (fieldName) {
      nutrients[fieldName] = nutrient.value;
    }
  }

  return nutrients;
}

/**
 * Get human-readable nutrient display info
 */
export function getNutrientDisplayInfo(key: keyof NutrientData): {
  label: string;
  unit: string;
  category: 'macro' | 'vitamin' | 'mineral' | 'other';
} {
  const info: Record<keyof NutrientData, { label: string; unit: string; category: 'macro' | 'vitamin' | 'mineral' | 'other' }> = {
    calories: { label: 'Calories', unit: 'kcal', category: 'macro' },
    protein: { label: 'Protein', unit: 'g', category: 'macro' },
    carbs: { label: 'Carbohydrates', unit: 'g', category: 'macro' },
    fat: { label: 'Total Fat', unit: 'g', category: 'macro' },
    fiber: { label: 'Dietary Fiber', unit: 'g', category: 'macro' },
    sodium: { label: 'Sodium', unit: 'mg', category: 'mineral' },
    
    saturated_fat: { label: 'Saturated Fat', unit: 'g', category: 'macro' },
    trans_fat: { label: 'Trans Fat', unit: 'g', category: 'macro' },
    polyunsaturated_fat: { label: 'Polyunsaturated Fat', unit: 'g', category: 'macro' },
    monounsaturated_fat: { label: 'Monounsaturated Fat', unit: 'g', category: 'macro' },
    cholesterol: { label: 'Cholesterol', unit: 'mg', category: 'macro' },
    sugars: { label: 'Total Sugars', unit: 'g', category: 'macro' },
    added_sugars: { label: 'Added Sugars', unit: 'g', category: 'macro' },
    
    vitamin_a: { label: 'Vitamin A', unit: 'µg', category: 'vitamin' },
    vitamin_c: { label: 'Vitamin C', unit: 'mg', category: 'vitamin' },
    vitamin_d: { label: 'Vitamin D', unit: 'µg', category: 'vitamin' },
    vitamin_e: { label: 'Vitamin E', unit: 'mg', category: 'vitamin' },
    vitamin_k: { label: 'Vitamin K', unit: 'µg', category: 'vitamin' },
    thiamin: { label: 'Thiamin (B1)', unit: 'mg', category: 'vitamin' },
    riboflavin: { label: 'Riboflavin (B2)', unit: 'mg', category: 'vitamin' },
    niacin: { label: 'Niacin (B3)', unit: 'mg', category: 'vitamin' },
    vitamin_b6: { label: 'Vitamin B6', unit: 'mg', category: 'vitamin' },
    folate: { label: 'Folate', unit: 'µg', category: 'vitamin' },
    vitamin_b12: { label: 'Vitamin B12', unit: 'µg', category: 'vitamin' },
    
    calcium: { label: 'Calcium', unit: 'mg', category: 'mineral' },
    iron: { label: 'Iron', unit: 'mg', category: 'mineral' },
    magnesium: { label: 'Magnesium', unit: 'mg', category: 'mineral' },
    phosphorus: { label: 'Phosphorus', unit: 'mg', category: 'mineral' },
    potassium: { label: 'Potassium', unit: 'mg', category: 'mineral' },
    zinc: { label: 'Zinc', unit: 'mg', category: 'mineral' },
    selenium: { label: 'Selenium', unit: 'µg', category: 'mineral' },
  };

  return info[key];
}
