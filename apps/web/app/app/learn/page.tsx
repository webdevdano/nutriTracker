"use client";

import { useState } from "react";
import { getAllNutrientsAlphabetically, getNutrientsByCategory, type NutrientInfo } from "@/lib/nutrient-data";

// Sample food sources for each category

type Superfood = {
  name: string;
  emoji: string;
  description: string;
  nutrients: string[];
  benefits: string[];
  serving: string;
};

const SUPERFOODS: Superfood[] = [
  {
    name: "Spinach",
    emoji: "🥬",
    description: "Nutrient-dense leafy green powerhouse",
    nutrients: ["Iron", "Calcium", "Vitamin A", "Vitamin K", "Vitamin C", "Folate", "Magnesium"],
    benefits: ["Supports bone health", "Boosts immune system", "Improves eye health", "Rich in antioxidants"],
    serving: "1 cup cooked (180g)"
  },
  {
    name: "Salmon",
    emoji: "🐟",
    description: "Omega-3 rich fatty fish",
    nutrients: ["Protein", "Omega-3s", "Vitamin D", "Vitamin B12", "Selenium", "Niacin"],
    benefits: ["Heart health", "Brain function", "Reduces inflammation", "High-quality protein"],
    serving: "3 oz (85g)"
  },
  {
    name: "Blueberries",
    emoji: "🫐",
    description: "Antioxidant-packed superfruit",
    nutrients: ["Vitamin C", "Vitamin K", "Fiber", "Manganese"],
    benefits: ["Brain health", "Anti-aging", "Supports heart health", "May improve memory"],
    serving: "1 cup (148g)"
  },
  {
    name: "Sweet Potato",
    emoji: "🍠",
    description: "Complex carb loaded with vitamins",
    nutrients: ["Vitamin A", "Vitamin C", "Fiber", "Potassium", "Manganese", "Vitamin B6"],
    benefits: ["Eye health", "Immune support", "Digestive health", "Stable energy"],
    serving: "1 medium (150g)"
  },
  {
    name: "Greek Yogurt",
    emoji: "🥛",
    description: "Protein-rich probiotic food",
    nutrients: ["Protein", "Calcium", "Vitamin B12", "Probiotics", "Phosphorus", "Selenium"],
    benefits: ["Gut health", "Bone strength", "Muscle building", "Immune support"],
    serving: "1 cup (245g)"
  },
  {
    name: "Quinoa",
    emoji: "🌾",
    description: "Complete protein grain alternative",
    nutrients: ["Protein", "Fiber", "Magnesium", "Iron", "Zinc", "Folate", "Manganese"],
    benefits: ["Complete protein", "Gluten-free", "Rich in minerals", "Supports digestion"],
    serving: "1 cup cooked (185g)"
  },
  {
    name: "Kale",
    emoji: "🥗",
    description: "Superfood leafy green champion",
    nutrients: ["Vitamin K", "Vitamin A", "Vitamin C", "Calcium", "Iron", "Folate"],
    benefits: ["Bone health", "Anti-inflammatory", "Detoxification", "Cancer prevention"],
    serving: "1 cup raw (67g)"
  },
  {
    name: "Eggs",
    emoji: "🥚",
    description: "Complete protein with essential nutrients",
    nutrients: ["Protein", "Vitamin B12", "Vitamin D", "Selenium", "Choline", "Riboflavin"],
    benefits: ["Muscle building", "Brain health", "Eye health", "Nutrient-dense"],
    serving: "1 large egg (50g)"
  },
  {
    name: "Avocado",
    emoji: "🥑",
    description: "Healthy fat powerhouse",
    nutrients: ["Healthy Fats", "Fiber", "Potassium", "Vitamin E", "Vitamin K", "Folate"],
    benefits: ["Heart health", "Nutrient absorption", "Satiety", "Skin health"],
    serving: "1/2 avocado (100g)"
  },
  {
    name: "Broccoli",
    emoji: "🥦",
    description: "Cruciferous vegetable with cancer-fighting compounds",
    nutrients: ["Vitamin C", "Vitamin K", "Folate", "Fiber", "Potassium", "Iron"],
    benefits: ["Cancer prevention", "Bone health", "Digestive health", "Immune support"],
    serving: "1 cup chopped (91g)"
  },
  {
    name: "Chia Seeds",
    emoji: "🌱",
    description: "Tiny seeds packed with omega-3s",
    nutrients: ["Omega-3 Fatty Acids", "Fiber", "Protein", "Calcium", "Magnesium", "Phosphorus"],
    benefits: ["Heart health", "Digestive health", "Bone strength", "Blood sugar control"],
    serving: "2 tbsp (28g)"
  }
];
const allNutrients = getAllNutrientsAlphabetically();

const CARBS_FOODS: Superfood[] = [
  { name: "Oats", emoji: "🌾", description: "Whole grain high in fiber and complex carbs", nutrients: ["Carbohydrates", "Fiber", "Protein", "Magnesium", "Iron", "Zinc"], benefits: ["Sustained energy", "Digestive health", "Heart health", "Blood sugar control"], serving: "1 cup cooked (156g)" },
  { name: "Sweet Potato", emoji: "🍠", description: "Complex carb loaded with vitamins", nutrients: ["Carbohydrates", "Vitamin A", "Vitamin C", "Fiber", "Potassium", "Manganese"], benefits: ["Eye health", "Immune support", "Digestive health", "Stable energy"], serving: "1 medium (150g)" },
  { name: "Brown Rice", emoji: "🍚", description: "Whole grain source of complex carbs", nutrients: ["Carbohydrates", "Fiber", "Magnesium", "Phosphorus", "Selenium"], benefits: ["Long-lasting energy", "Digestive health", "Supports metabolism"], serving: "1 cup cooked (195g)" },
  { name: "Banana", emoji: "🍌", description: "Natural sugars and potassium", nutrients: ["Carbohydrates", "Potassium", "Vitamin B6", "Vitamin C", "Fiber"], benefits: ["Quick energy", "Muscle function", "Digestive health"], serving: "1 medium (118g)" },
  { name: "Quinoa", emoji: "🌱", description: "Gluten-free whole grain alternative", nutrients: ["Carbohydrates", "Protein", "Fiber", "Magnesium", "Iron", "Zinc"], benefits: ["Complete protein", "Sustained energy", "Rich in minerals"], serving: "1 cup cooked (185g)" },
  { name: "Black Beans", emoji: "🫘", description: "Legume high in fiber and complex carbs", nutrients: ["Carbohydrates", "Protein", "Fiber", "Folate", "Magnesium", "Iron"], benefits: ["Digestive health", "Blood sugar control", "Heart health"], serving: "1 cup cooked (172g)" },
  { name: "Buckwheat", emoji: "🌿", description: "Gluten-free pseudocereal rich in complex carbs", nutrients: ["Carbohydrates", "Fiber", "Magnesium", "Manganese", "Copper", "Phosphorus"], benefits: ["Blood sugar control", "Heart health", "Digestive health", "Gluten-free energy"], serving: "1 cup cooked (168g)" },
  { name: "Beets", emoji: "🟣", description: "Root vegetable with natural sugars and nitrates", nutrients: ["Carbohydrates", "Folate", "Manganese", "Potassium", "Fiber", "Vitamin C"], benefits: ["Improves blood flow", "Boosts stamina", "Supports liver health", "Antioxidant-rich"], serving: "1 cup cooked (170g)" },
  { name: "Oranges", emoji: "🍊", description: "Citrus fruit packed with natural sugars and vitamin C", nutrients: ["Carbohydrates", "Vitamin C", "Fiber", "Folate", "Potassium", "Thiamine"], benefits: ["Immune support", "Skin health", "Aids iron absorption", "Heart health"], serving: "1 medium (130g)" },
  { name: "Blueberries", emoji: "🫐", description: "Antioxidant-rich berries with natural sugars", nutrients: ["Carbohydrates", "Fiber", "Vitamin C", "Vitamin K", "Manganese"], benefits: ["Brain health", "Anti-aging", "Supports heart health", "Blood sugar support"], serving: "1 cup (148g)" },
  { name: "Grapefruit", emoji: "🍋", description: "Low-sugar citrus with complex nutrients", nutrients: ["Carbohydrates", "Vitamin C", "Fiber", "Potassium", "Vitamin A", "Folate"], benefits: ["Weight management", "Immune support", "Heart health", "Blood sugar control"], serving: "1/2 medium (123g)" },
  { name: "Apples", emoji: "🍎", description: "Fiber-rich fruit with natural sugars", nutrients: ["Carbohydrates", "Fiber", "Vitamin C", "Potassium", "Vitamin K"], benefits: ["Digestive health", "Heart health", "Blood sugar control", "Antioxidant-rich"], serving: "1 medium (182g)" },
  { name: "Chickpeas", emoji: "🫘", description: "Legume high in complex carbs and protein", nutrients: ["Carbohydrates", "Protein", "Fiber", "Folate", "Iron", "Manganese"], benefits: ["Blood sugar control", "Digestive health", "Heart health", "Sustained energy"], serving: "1 cup cooked (164g)" },
  { name: "Kidney Beans", emoji: "🫘", description: "Complex carb legume rich in fiber and iron", nutrients: ["Carbohydrates", "Fiber", "Protein", "Iron", "Folate", "Potassium"], benefits: ["Heart health", "Blood sugar management", "Digestive health", "Rich in iron"], serving: "1 cup cooked (177g)" },
];

const PROTEINS_POULTRY: Superfood[] = [
  { name: "Chicken Breast", emoji: "🍗", description: "Lean animal protein", nutrients: ["Protein", "Niacin", "Vitamin B6", "Phosphorus", "Selenium", "Low Fat"], benefits: ["Muscle building", "Weight management", "Supports metabolism", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Chicken Thigh", emoji: "🍗", description: "Juicier cut with more fat and flavor", nutrients: ["Protein", "Niacin", "Zinc", "Iron", "Vitamin B6", "Selenium"], benefits: ["Muscle building", "Higher iron than breast", "More satiating", "Rich in zinc"], serving: "3 oz (85g)" },
  { name: "Turkey Breast", emoji: "🦃", description: "Lean poultry high in protein", nutrients: ["Protein", "Niacin", "Vitamin B6", "Phosphorus", "Selenium", "Zinc"], benefits: ["Muscle building", "Immune support", "Weight management", "Rich in B vitamins"], serving: "3 oz (85g)" },
  { name: "Ground Turkey", emoji: "🦃", description: "Lean ground turkey for versatile cooking", nutrients: ["Protein", "Niacin", "Phosphorus", "Selenium", "Zinc", "Iron"], benefits: ["Lean muscle fuel", "Low in saturated fat", "Versatile cooking protein", "Weight management"], serving: "3 oz (85g)" },
  { name: "Ground Beef (80/20)", emoji: "🥩", description: "Classic ground beef with balanced fat-to-protein ratio", nutrients: ["Protein", "Iron", "Zinc", "Vitamin B12", "Creatine", "Niacin"], benefits: ["Muscle building", "Rich in heme iron", "High in creatine", "Satisfying and energy-dense"], serving: "3 oz (85g)" },
  { name: "Duck Breast", emoji: "🦆", description: "Rich poultry with higher fat content", nutrients: ["Protein", "Iron", "Zinc", "Niacin", "Riboflavin", "Selenium"], benefits: ["High-quality protein", "Rich in iron", "Supports red blood cells", "Energy dense"], serving: "3 oz (85g)" },
  { name: "Lean Beef (Sirloin)", emoji: "🥩", description: "Red meat rich in complete protein and iron", nutrients: ["Protein", "Iron", "Zinc", "Vitamin B12", "Creatine", "Selenium"], benefits: ["Muscle building", "Rich in heme iron", "Supports red blood cells", "High in creatine"], serving: "3 oz (85g)" },
  { name: "Lean Pork (Tenderloin)", emoji: "🥩", description: "One of the leanest cuts of red meat", nutrients: ["Protein", "Thiamine", "Niacin", "Phosphorus", "Selenium", "Zinc"], benefits: ["Muscle repair", "Rich in thiamine", "Low in fat", "Supports metabolism"], serving: "3 oz (85g)" },
  { name: "Bison", emoji: "🦬", description: "Leaner than beef with a rich nutrient profile", nutrients: ["Protein", "Iron", "Zinc", "Vitamin B12", "Selenium", "Omega-3s"], benefits: ["Lower fat than beef", "Rich in heme iron", "Supports immunity", "Grass-fed omega-3s"], serving: "3 oz (85g)" },
  { name: "Venison", emoji: "🦬", description: "Wild game meat — very lean and protein-dense", nutrients: ["Protein", "Iron", "Zinc", "Vitamin B12", "Niacin", "Phosphorus"], benefits: ["Very low in fat", "High protein density", "Rich in iron", "Wild-sourced nutrients"], serving: "3 oz (85g)" },
];

const PROTEINS_FISH: Superfood[] = [
  { name: "Salmon", emoji: "🐟", description: "Omega-3 rich fatty fish", nutrients: ["Protein", "Omega-3s", "Vitamin D", "Vitamin B12", "Selenium", "Niacin"], benefits: ["Heart health", "Brain function", "Reduces inflammation", "High-quality protein"], serving: "3 oz (85g)" },
  { name: "Tuna", emoji: "🐠", description: "High-protein lean fish", nutrients: ["Protein", "Selenium", "Vitamin B12", "Niacin", "Omega-3s", "Vitamin D"], benefits: ["Muscle building", "Heart health", "Brain health", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Halibut", emoji: "🐡", description: "Dense white fish with clean protein", nutrients: ["Protein", "Selenium", "Magnesium", "Phosphorus", "Niacin", "Vitamin B6"], benefits: ["Muscle repair", "Supports metabolism", "Heart health", "Low in saturated fat"], serving: "3 oz (85g)" },
  { name: "Tilapia", emoji: "🐟", description: "Mild white fish, low-fat protein", nutrients: ["Protein", "Phosphorus", "Selenium", "Niacin", "Vitamin B12"], benefits: ["Muscle building", "Bone health", "Weight management", "Low in calories"], serving: "3 oz (85g)" },
  { name: "Cod", emoji: "🐟", description: "Lean white fish with mild flavor", nutrients: ["Protein", "Vitamin B12", "Iodine", "Selenium", "Phosphorus", "Niacin"], benefits: ["Thyroid support", "Muscle building", "Heart health", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Pollock", emoji: "🐟", description: "Affordable lean white fish", nutrients: ["Protein", "Selenium", "Vitamin B12", "Phosphorus", "Niacin"], benefits: ["Muscle repair", "Budget-friendly protein", "Heart health", "Low in calories"], serving: "3 oz (85g)" },
  { name: "Dried Fish", emoji: "🐟", description: "Concentrated protein source", nutrients: ["Protein", "Calcium", "Iron", "Selenium", "Sodium", "Omega-3s"], benefits: ["High protein density", "Long shelf life", "Bone health", "Portable snack"], serving: "1 oz (28g)" },
];

const PROTEINS_SHELLFISH: Superfood[] = [
  { name: "Shrimp", emoji: "🍤", description: "Low-calorie shellfish with lean protein", nutrients: ["Protein", "Selenium", "Iodine", "Phosphorus", "Vitamin B12", "Astaxanthin"], benefits: ["Muscle building", "Thyroid support", "Low in calories", "Antioxidant-rich"], serving: "3 oz (85g)" },
  { name: "Lobster", emoji: "🦞", description: "Luxurious shellfish high in protein", nutrients: ["Protein", "Zinc", "Copper", "Selenium", "Phosphorus", "Vitamin B12"], benefits: ["Immune support", "Bone health", "Muscle building", "Rich in copper"], serving: "3 oz (85g)" },
  { name: "Crab", emoji: "🦀", description: "Sweet shellfish with lean protein", nutrients: ["Protein", "Zinc", "Copper", "Selenium", "Vitamin B12", "Omega-3s"], benefits: ["Immune function", "Brain health", "Muscle repair", "Rich in minerals"], serving: "3 oz (85g)" },
  { name: "Scallops", emoji: "🐚", description: "Low-fat shellfish with dense protein", nutrients: ["Protein", "Selenium", "Magnesium", "Phosphorus", "Vitamin B12", "Omega-3s"], benefits: ["Heart health", "Muscle building", "Very low in fat", "Brain health"], serving: "3 oz (85g)" },
  { name: "Clams", emoji: "🐚", description: "Iron and B12 powerhouse shellfish", nutrients: ["Protein", "Vitamin B12", "Iron", "Zinc", "Selenium", "Omega-3s"], benefits: ["Highest B12 of any food", "Rich in iron", "Supports red blood cells", "Heart health"], serving: "3 oz (85g)" },
  { name: "Oysters", emoji: "🐚", description: "Zinc-rich shellfish with dense nutrients", nutrients: ["Protein", "Zinc", "Iron", "Selenium", "Vitamin B12", "Omega-3s"], benefits: ["Highest food source of zinc", "Immune support", "Sexual health", "Heart health"], serving: "3 oz (85g)" },
  { name: "Mussels", emoji: "🐚", description: "Sustainable shellfish rich in omega-3s", nutrients: ["Protein", "Omega-3s", "Vitamin B12", "Iron", "Manganese", "Selenium"], benefits: ["Heart health", "Brain function", "Sustainable protein", "Rich in B12"], serving: "3 oz (85g)" },
];

const PROTEINS_EGGS_DAIRY: Superfood[] = [
  { name: "Eggs", emoji: "🥚", description: "Complete protein with essential nutrients", nutrients: ["Protein", "Vitamin B12", "Vitamin D", "Selenium", "Choline", "Riboflavin"], benefits: ["Muscle building", "Brain health", "Eye health", "Nutrient-dense"], serving: "1 large egg (50g)" },
  { name: "Egg Whites", emoji: "🥚", description: "Pure protein with almost no fat or carbs", nutrients: ["Protein", "Riboflavin", "Selenium", "Potassium", "Low Fat", "Low Calorie"], benefits: ["Lean muscle building", "Very low calorie", "No cholesterol", "High protein density"], serving: "3 large whites (99g)" },
  { name: "Greek Yogurt", emoji: "🥛", description: "High-protein probiotic dairy", nutrients: ["Protein", "Calcium", "Vitamin B12", "Probiotics", "Phosphorus", "Selenium"], benefits: ["Gut health", "Bone strength", "Muscle building", "Immune support"], serving: "1 cup (245g)" },
  { name: "Cottage Cheese", emoji: "🥛", description: "High-protein, low-fat dairy with casein", nutrients: ["Protein", "Calcium", "Phosphorus", "Selenium", "Vitamin B12", "Riboflavin"], benefits: ["Slow-digesting protein", "Bone health", "Muscle repair overnight", "Low in fat"], serving: "1/2 cup (113g)" },
  { name: "Milk", emoji: "🥛", description: "Complete protein with calcium and vitamin D", nutrients: ["Protein", "Calcium", "Vitamin D", "Vitamin B12", "Phosphorus", "Riboflavin"], benefits: ["Bone health", "Muscle recovery", "Immune support", "Hydration"], serving: "1 cup (244ml)" },
  { name: "Parmesan Cheese", emoji: "🧀", description: "Aged hard cheese dense in protein and calcium", nutrients: ["Protein", "Calcium", "Phosphorus", "Vitamin A", "Zinc", "Vitamin B12"], benefits: ["Bone strength", "Muscle support", "Gut-friendly (low lactose)", "Rich in calcium"], serving: "1 oz (28g)" },
  { name: "Cheddar Cheese", emoji: "🧀", description: "Protein-rich aged cheese", nutrients: ["Protein", "Calcium", "Vitamin A", "Phosphorus", "Vitamin K2", "Zinc"], benefits: ["Bone health", "Muscle support", "Vitamin K2 for arteries", "Satiating"], serving: "1 oz (28g)" },
  { name: "Whey Protein", emoji: "🥤", description: "Fast-absorbing complete dairy protein", nutrients: ["Protein", "Leucine", "BCAAs", "Calcium", "Low Fat", "Low Carb"], benefits: ["Rapid muscle recovery", "Highest leucine content", "Easy to digest", "Convenient"], serving: "1 scoop (30g)" },
];

const PROTEINS_PLANT: Superfood[] = [
  { name: "Lentils", emoji: "🥣", description: "Legume packed with protein and fiber", nutrients: ["Protein", "Fiber", "Iron", "Folate", "Manganese", "Low Fat"], benefits: ["Heart health", "Digestive health", "Blood sugar control", "Rich in iron"], serving: "1 cup cooked (198g)" },
  { name: "Tofu", emoji: "🍥", description: "Soy-based complete protein", nutrients: ["Protein", "Calcium", "Iron", "Magnesium", "Low Fat", "Isoflavones"], benefits: ["Heart health", "Bone health", "Plant-based protein", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Tempeh", emoji: "🟫", description: "Fermented soy with dense protein", nutrients: ["Protein", "Fiber", "Iron", "Calcium", "Magnesium", "Probiotics"], benefits: ["Gut health", "Muscle building", "Bone strength", "Rich in iron"], serving: "3 oz (85g)" },
  { name: "Edamame", emoji: "🫛", description: "Young soybeans — complete plant protein", nutrients: ["Protein", "Fiber", "Iron", "Folate", "Vitamin K", "Isoflavones"], benefits: ["Complete protein", "Heart health", "Bone health", "Easy snack"], serving: "1 cup (155g)" },
  { name: "Black Beans", emoji: "🫘", description: "Fiber-rich legume with solid protein", nutrients: ["Protein", "Fiber", "Iron", "Folate", "Magnesium", "Antioxidants"], benefits: ["Blood sugar control", "Heart health", "Digestive health", "Antioxidant-rich"], serving: "1 cup cooked (172g)" },
  { name: "Chickpeas", emoji: "🫘", description: "Versatile legume high in protein and fiber", nutrients: ["Protein", "Fiber", "Folate", "Iron", "Phosphorus", "Manganese"], benefits: ["Sustained energy", "Digestive health", "Heart health", "Blood sugar control"], serving: "1 cup cooked (164g)" },
  { name: "Hemp Seeds", emoji: "🌿", description: "Complete plant protein with healthy fats", nutrients: ["Protein", "Omega-3s", "Omega-6s", "Magnesium", "Iron", "Zinc"], benefits: ["Complete amino acid profile", "Heart health", "Anti-inflammatory", "Easy to add to meals"], serving: "3 tbsp (30g)" },
  { name: "Seitan", emoji: "🍞", description: "Wheat gluten — very high protein meat alternative", nutrients: ["Protein", "Selenium", "Iron", "Phosphorus", "Low Fat", "Low Carb"], benefits: ["Highest plant protein density", "Meat-like texture", "Low in fat", "Muscle building"], serving: "3 oz (85g)" },
];

// Flat list used for the food detail modal navigation within the proteins tab
const PROTEINS_FOODS_ALL: Superfood[] = [...PROTEINS_POULTRY, ...PROTEINS_FISH, ...PROTEINS_SHELLFISH, ...PROTEINS_EGGS_DAIRY, ...PROTEINS_PLANT];

const VITAMINS_FOODS: Superfood[] = [
  { name: "Spinach", emoji: "🥬", description: "Rich in vitamin K, A, C", nutrients: ["Vitamin K", "Vitamin A", "Vitamin C", "Folate", "Iron", "Calcium"], benefits: ["Supports bone health", "Boosts immune system", "Improves eye health", "Rich in antioxidants"], serving: "1 cup cooked (180g)" },
  { name: "Citrus Fruits", emoji: "🍋", description: "High in vitamin C", nutrients: ["Vitamin C", "Folate", "Potassium", "Fiber", "Antioxidants"], benefits: ["Boosts immune system", "Improves skin health", "Aids iron absorption", "Antioxidant-rich"], serving: "1 medium orange (130g)" },
  { name: "Carrots", emoji: "🥕", description: "Excellent source of vitamin A", nutrients: ["Vitamin A", "Vitamin K", "Fiber", "Potassium", "Vitamin C"], benefits: ["Eye health", "Immune support", "Digestive health", "Antioxidant-rich"], serving: "1 medium (61g)" },
  { name: "Red Peppers", emoji: "🫑", description: "Vitamin C and antioxidants", nutrients: ["Vitamin C", "Vitamin A", "Vitamin B6", "Folate", "Antioxidants"], benefits: ["Boosts immune system", "Supports eye health", "Rich in antioxidants", "Aids iron absorption"], serving: "1 medium (119g)" },
];

const MINERALS_FOODS: Superfood[] = [
  { name: "Almonds", emoji: "🥜", description: "Magnesium, calcium, iron", nutrients: ["Magnesium", "Calcium", "Iron", "Fiber", "Vitamin E", "Protein"], benefits: ["Supports heart health", "Bone strength", "Rich in antioxidants", "Helps control blood sugar"], serving: "1 oz (28g)" },
  { name: "Pumpkin Seeds", emoji: "🎃", description: "Zinc, magnesium, iron", nutrients: ["Zinc", "Magnesium", "Iron", "Copper", "Manganese", "Healthy Fats"], benefits: ["Improves sleep", "Boosts immune system", "Supports prostate health", "Rich in antioxidants"], serving: "1 oz (28g)" },
  { name: "Salmon", emoji: "🐟", description: "Rich in selenium and iodine", nutrients: ["Selenium", "Iodine", "Phosphorus", "Potassium", "Magnesium", "Vitamin D"], benefits: ["Heart health", "Brain function", "Reduces inflammation", "High-quality protein"], serving: "3 oz (85g)" },
  { name: "Broccoli", emoji: "🥦", description: "Calcium, potassium, iron", nutrients: ["Calcium", "Potassium", "Iron", "Vitamin C", "Folate", "Fiber"], benefits: ["Cancer prevention", "Bone health", "Digestive health", "Immune support"], serving: "1 cup chopped (91g)" },
];

function LearnPage() {
  // Filter nutrients based on search
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'alphabetical' | 'category' | 'carbohydrates' | 'proteins' | 'vitamins' | 'minerals' | 'superfoods'>('category');
  const nutrientsByCategory = getNutrientsByCategory();
  const [selectedNutrientIndex, setSelectedNutrientIndex] = useState<number | null>(null);
  const [selectedFoodList, setSelectedFoodList] = useState<Superfood[] | null>(null);
  const [selectedFoodIndex, setSelectedFoodIndex] = useState<number | null>(null);

  function openFood(list: Superfood[], idx: number) {
    setSelectedFoodList(list);
    setSelectedFoodIndex(idx);
  }
  function closeFood() {
    setSelectedFoodList(null);
    setSelectedFoodIndex(null);
  }

  // (filteredNutrients removed, not used)

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Learn About Nutrients</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Comprehensive guide to macronutrients, vitamins, and minerals
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search nutrients..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
        />
      </div>

      {/* View Toggle - Responsive Horizontal Scroll */}
      {!searchQuery && (
        <div className="mb-6 flex gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-2 min-w-max">
            <button onClick={() => setView('alphabetical')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'alphabetical' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`}>A-Z Directory</button>
            <button onClick={() => setView('category')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'category' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`}>By Category</button>
            <button onClick={() => setView('carbohydrates')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'carbohydrates' ? 'bg-blue-900 text-white dark:bg-blue-100 dark:text-blue-900' : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-300 dark:hover:bg-blue-700'}`}>Carbohydrates</button>
            <button onClick={() => setView('proteins')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'proteins' ? 'bg-orange-900 text-white dark:bg-orange-100 dark:text-orange-900' : 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-800 dark:text-orange-300 dark:hover:bg-orange-700'}`}>Proteins</button>
            <button onClick={() => setView('vitamins')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'vitamins' ? 'bg-green-900 text-white dark:bg-green-100 dark:text-green-900' : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-300 dark:hover:bg-green-700'}`}>Vitamins</button>
            <button onClick={() => setView('minerals')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'minerals' ? 'bg-yellow-900 text-white dark:bg-yellow-100 dark:text-yellow-900' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-700'}`}>Minerals</button>
            <button onClick={() => setView('superfoods')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'superfoods' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`}>🌟 Superfoods</button>
          </div>
        </div>
      )}

      {/* Content */}
      {/* Content Views */}
      {view === 'alphabetical' && !searchQuery ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {getAllNutrientsAlphabetically().map((nutrient, idx) => (
            <NutrientCard
              key={nutrient.name}
              nutrient={nutrient}
              onClick={() => setSelectedNutrientIndex(idx)}
            />
          ))}
        </div>
      ) : searchQuery ? (
        <>
          {/* Search Results */}
          <div className="space-y-4">
            {/* Alphabetical View: flat A-Z list, filtered by search if present */}
            {view === 'alphabetical' && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {getAllNutrientsAlphabetically()
                  .filter((nutrient) =>
                    nutrient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    nutrient.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((nutrient) => (
                    <NutrientCard
                      key={nutrient.name}
                      nutrient={nutrient}
                      onClick={() => setSelectedNutrientIndex(allNutrients.findIndex(n => n.name === nutrient.name))}
                    />
                  ))}
              </div>
            )}
            {/* Category view for search: show all nutrients matching search, grouped not needed */}
            {view === 'category' && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {getAllNutrientsAlphabetically()
                  .filter((nutrient) =>
                    nutrient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    nutrient.description.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((nutrient) => (
                    <NutrientCard
                      key={nutrient.name}
                      nutrient={nutrient}
                      onClick={() => setSelectedNutrientIndex(allNutrients.findIndex(n => n.name === nutrient.name))}
                    />
                  ))}
              </div>
            )}
          </div>
        </>
      ) : view === 'carbohydrates' ? (
        // Carbohydrates View: show food card UI like proteins, vitamins, minerals, superfoods
        <div>
          <div className="mb-6 rounded-xl bg-blue-50 p-6 dark:bg-blue-950/30">
            <h2 className="mb-2 text-2xl font-bold">🍞 Carbohydrates</h2>
            <p className="text-zinc-700 dark:text-zinc-300">Foods rich in carbohydrates</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CARBS_FOODS.map((carb, idx) => (
              <SuperfoodCard
                key={carb.name}
                superfood={carb}
                onClick={() => openFood(CARBS_FOODS, idx)}
              />
            ))}
          </div>
        </div>
      ) : view === 'proteins' ? (
        // Proteins Food Sources View — grouped by sub-category
        <div>
          <div className="mb-6 rounded-xl bg-orange-50 p-6 dark:bg-orange-950/30">
            <h2 className="mb-2 text-2xl font-bold">🍗 Proteins</h2>
            <p className="text-zinc-700 dark:text-zinc-300">Foods rich in protein, grouped by food type</p>
          </div>

          <div className="space-y-10">
            {/* Poultry & Meat */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🍗 Poultry &amp; Meat</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROTEINS_POULTRY.map((food) => (
                  <SuperfoodCard
                    key={food.name}
                    superfood={food}
                    onClick={() => openFood(PROTEINS_FOODS_ALL, PROTEINS_FOODS_ALL.findIndex(f => f.name === food.name))}
                  />
                ))}
              </div>
            </div>

            {/* Fish */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🐟 Fish</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROTEINS_FISH.map((food) => (
                  <SuperfoodCard
                    key={food.name}
                    superfood={food}
                    onClick={() => openFood(PROTEINS_FOODS_ALL, PROTEINS_FOODS_ALL.findIndex(f => f.name === food.name))}
                  />
                ))}
              </div>
            </div>

            {/* Shellfish */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🍤 Shellfish</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROTEINS_SHELLFISH.map((food) => (
                  <SuperfoodCard
                    key={food.name}
                    superfood={food}
                    onClick={() => openFood(PROTEINS_FOODS_ALL, PROTEINS_FOODS_ALL.findIndex(f => f.name === food.name))}
                  />
                ))}
              </div>
            </div>

            {/* Eggs & Dairy */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🥚 Eggs &amp; Dairy</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROTEINS_EGGS_DAIRY.map((food) => (
                  <SuperfoodCard
                    key={food.name}
                    superfood={food}
                    onClick={() => openFood(PROTEINS_FOODS_ALL, PROTEINS_FOODS_ALL.findIndex(f => f.name === food.name))}
                  />
                ))}
              </div>
            </div>

            {/* Plant-Based */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🌱 Plant-Based</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {PROTEINS_PLANT.map((food) => (
                  <SuperfoodCard
                    key={food.name}
                    superfood={food}
                    onClick={() => openFood(PROTEINS_FOODS_ALL, PROTEINS_FOODS_ALL.findIndex(f => f.name === food.name))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        ) : view === 'vitamins' ? (
          // Vitamins Food Sources View 
          <div>
            <div className="mb-6 rounded-xl bg-green-50 p-6 dark:bg-green-950/30">
              <h2 className="mb-2 text-2xl font-bold">🍃 Vitamins</h2>
              <p className="text-zinc-700 dark:text-zinc-300">Foods rich in vitamins</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {VITAMINS_FOODS.map((vitamin, idx) => (
                <SuperfoodCard
                  key={vitamin.name}
                  superfood={vitamin}
                  onClick={() => openFood(VITAMINS_FOODS, idx)}
                />
              ))}
            </div>
          </div>
        ) : view === 'minerals' ? (
          // Minerals Food Sources View 
          <div>
            <div className="mb-6 rounded-xl bg-yellow-50 p-6 dark:bg-yellow-950/30">
              <h2 className="mb-2 text-2xl font-bold">🧂 Minerals</h2>
              <p className="text-zinc-700 dark:text-zinc-300">Foods rich in minerals</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MINERALS_FOODS.map((mineral, idx) => (
                <SuperfoodCard
                  key={mineral.name}
                  superfood={mineral}
                  onClick={() => openFood(MINERALS_FOODS, idx)}
                />
              ))}
            </div>
          </div>
        ) : view === 'superfoods' ? (
          // Superfoods View
          <div>
            <div className="mb-6 rounded-xl bg-linear-to-r from-green-50 to-blue-50 p-6 dark:from-green-950/30 dark:to-blue-950/30">
              <h2 className="mb-2 text-2xl font-bold">🌟 Superfoods</h2>
              <p className="text-zinc-700 dark:text-zinc-300">
                Foods packed with multiple essential nutrients to supercharge your health
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SUPERFOODS.map((superfood, index) => (
                <SuperfoodCard
                  key={superfood.name}
                  superfood={superfood}
                  onClick={() => openFood(SUPERFOODS, index)}
                />
              ))}
            </div>
          </div>
        ) : (
          // By Category: grouped view with headings
          <div className="space-y-14">
            {/* Macros Section */}
            <div>
              <h1 className="mb-6 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Macronutrients</h1>
              {/* Main Macros */}
              <h2 className="mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">Main Macronutrients</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {['Carbohydrates', 'Protein', 'Dietary Fiber', 'Total Fat'].map((macroName) => {
                  const nutrient = Object.values(nutrientsByCategory['Macronutrients']).find(n => n.name === macroName);
                  return nutrient ? (
                    <NutrientCard
                      key={nutrient.name}
                      nutrient={nutrient}
                      onClick={() => setSelectedNutrientIndex(allNutrients.findIndex(n => n.name === nutrient.name))}
                    />
                  ) : null;
                })}
              </div>
              {/* Other Macros */}
              <h2 className="mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">Other Macronutrients</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {['Total Sugars', 'Cholesterol', 'Saturated Fat'].map((macroName) => {
                  const nutrient = Object.values(nutrientsByCategory['Macronutrients']).find(n => n.name === macroName);
                  return nutrient ? (
                    <NutrientCard
                      key={nutrient.name}
                      nutrient={nutrient}
                      onClick={() => setSelectedNutrientIndex(allNutrients.findIndex(n => n.name === nutrient.name))}
                    />
                  ) : null;
                })}
              </div>
            </div>
            {/* Micros Section */}
            <div>
              <h1 className="mb-6 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">Micronutrients</h1>
              {/* Vitamins */}
              <h2 className="mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">Vitamins</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {nutrientsByCategory['Vitamins'].map((nutrient) => (
                  <NutrientCard
                    key={nutrient.name}
                    nutrient={nutrient}
                    onClick={() => setSelectedNutrientIndex(allNutrients.findIndex(n => n.name === nutrient.name))}
                  />
                ))}
              </div>
              {/* Minerals */}
              <h2 className="mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100">Minerals</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {nutrientsByCategory['Minerals'].map((nutrient) => (
                  <NutrientCard
                    key={nutrient.name}
                    nutrient={nutrient}
                    onClick={() => setSelectedNutrientIndex(allNutrients.findIndex(n => n.name === nutrient.name))}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      
      {/* Detail Modal - A-Z & By Category */}
      {selectedNutrientIndex !== null && (
        <NutrientModal
          nutrients={allNutrients}
          initialIndex={selectedNutrientIndex}
          onClose={() => setSelectedNutrientIndex(null)}
        />
      )}
      {/* Food Modal - Carbs, Proteins, Vitamins, Minerals, Superfoods */}
      {selectedFoodList && selectedFoodIndex !== null && (
        <SuperfoodModal
          superfoods={selectedFoodList}
          initialIndex={selectedFoodIndex}
          onClose={closeFood}
        />
      )}
    </div>
  );
}

function SuperfoodCard({ superfood, onClick }: { superfood: Superfood; onClick: () => void }) {
  return (
    <button
      className="flex flex-col items-start rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
      onClick={onClick}
      type="button"
    >
      <span className="mb-2 text-3xl">{superfood.emoji}</span>
      <span className="mb-1 text-lg font-bold">{superfood.name}</span>
      <span className="mb-2 text-sm text-zinc-600 dark:text-zinc-300">{superfood.description}</span>
      <div className="mb-2 flex flex-wrap gap-2">
        {superfood.nutrients.slice(0, 3).map((nutrient, i) => (
          <span
            key={i}
            className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {nutrient}
          </span>
        ))}
        {superfood.nutrients.length > 3 && (
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            +{superfood.nutrients.length - 3} more
          </span>
        )}
      </div>
      <div className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">Serving: {superfood.serving}</div>
      <div className="mb-2 text-xs text-green-700 dark:text-green-300">Benefits: {superfood.benefits.join(", ")}</div>
    </button>
  );
}

function SuperfoodModal({ superfoods, initialIndex, onClose }: { superfoods: Superfood[]; initialIndex: number; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [quantity, setQuantity] = useState(1);
  const [showAddSuccess, setShowAddSuccess] = useState(false);
  
  const superfood = superfoods[currentIndex];
  
  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? superfoods.length - 1 : prev - 1));
    setQuantity(1);
  };
  
  const handleNext = () => {
    setCurrentIndex((prev) => (prev === superfoods.length - 1 ? 0 : prev + 1));
    setQuantity(1);
  };
  
  const handleAddToGroceryList = async () => {
    try {
      const response = await fetch('/api/grocery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          food_name: superfood.name,
          quantity: quantity,
          unit: superfood.serving
        })
      });
      if (response.ok) {
        setShowAddSuccess(true);
        setTimeout(() => setShowAddSuccess(false), 2000);
      } else {
        const error = await response.json();
        console.error('Error adding to grocery list:', error);
        alert('Failed to add to grocery list. Please try again.');
      }
    } catch (error) {
      console.error('Error adding to grocery list:', error);
      alert('Failed to add to grocery list. Please try again.');
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div className="relative flex w-full max-w-6xl items-center justify-center gap-4">
        {/* Navigation Arrows - Outside Card */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-label="Previous superfood"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <div 
          className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-6xl">{superfood.emoji}</span>
            <div>
              <h2 className="text-3xl font-bold">{superfood.name}</h2>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {superfood.description}
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
                {currentIndex + 1} of {superfoods.length}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Serving Size */}
        <div className="mb-6 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30">
          <p className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-300">Serving Size:</span>{' '}
            <span className="text-blue-800 dark:text-blue-200">{superfood.serving}</span>
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Nutrients */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Key Nutrients</h3>
            <div className="flex flex-wrap gap-2">
              {superfood.nutrients.map((nutrient, index) => (
                <span
                  key={index}
                  className="rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800 dark:bg-green-950 dark:text-green-200"
                >
                  {nutrient}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Health Benefits</h3>
            <ul className="space-y-2">
              {superfood.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Add to Grocery List Section */}
        <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-700">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantity:
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="rounded-lg bg-zinc-100 px-3 py-1.5 text-lg font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 rounded-lg border border-zinc-300 px-3 py-1.5 text-center dark:border-zinc-700 dark:bg-zinc-800"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="rounded-lg bg-zinc-100 px-3 py-1.5 text-lg font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                >
                  +
                </button>
              </div>
            </div>
            
            <button
              onClick={handleAddToGroceryList}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-green-700"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Grocery List
            </button>
          </div>
          
          {showAddSuccess && (
            <div className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/30 dark:text-green-200">
              ✓ {superfood.name} added to grocery list!
            </div>
          )}
        </div>
      </div>
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700"
        aria-label="Next superfood"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      </div>
    </div>
  );
}
 

function NutrientCard({ nutrient, onClick }: { nutrient: NutrientInfo; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-xl border border-zinc-200 p-4 text-left transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700"
    >
      <div className="mb-2 flex items-start justify-between">
        <h3 className="font-semibold group-hover:text-zinc-900 dark:group-hover:text-zinc-50">
          {nutrient.name}
        </h3>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {nutrient.category === 'Macronutrients' ? 'Macro' : nutrient.category === 'Vitamins' ? 'Vitamin' : 'Mineral'}
        </span>
      </div>
      <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {nutrient.description}
      </p>
    </button>
  );
}

function NutrientModal({ nutrients, initialIndex, onClose }: { nutrients: NutrientInfo[]; initialIndex: number; onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const nutrient = nutrients[currentIndex];

  const handlePrev = () => setCurrentIndex((i) => (i === 0 ? nutrients.length - 1 : i - 1));
  const handleNext = () => setCurrentIndex((i) => (i === nutrients.length - 1 ? 0 : i + 1));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div className="relative flex w-full max-w-5xl items-center justify-center gap-4">
        {/* Prev arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          className="hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 transition"
          aria-label="Previous"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <div
          className="max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">{nutrient.name}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {nutrient.category}
              {nutrient.dailyValue && ` • Daily Value: ${nutrient.dailyValue}`}
            </p>
            <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{currentIndex + 1} / {nutrients.length}</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Mobile prev/next inside header */}
            <button onClick={handlePrev} className="sm:hidden rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Previous">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} className="sm:hidden rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800" aria-label="Next">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-zinc-700 dark:text-zinc-300">{nutrient.description}</p>
        </div>

        {/* Two Column Layout */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Benefits */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Health Benefits</h3>
              <ul className="space-y-2">
                {nutrient.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Food Sources */}
            <div>
              <h3 className="mb-3 text-lg font-semibold">Food Sources</h3>
              <div className="flex flex-wrap gap-2">
                {nutrient.sources.map((source, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>

            {/* Absorption Tips */}
            {nutrient.absorptionTips && nutrient.absorptionTips.length > 0 && (
              <div>
                <h3 className="mb-3 text-lg font-semibold">Absorption Tips</h3>
                <ul className="space-y-2">
                  {nutrient.absorptionTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                      <svg className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div>
            {/* Overdose Risks */}
            {nutrient.overdoseRisks && nutrient.overdoseRisks.length > 0 && (
              <div className="rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
                <h3 className="mb-3 text-lg font-semibold text-red-900 dark:text-red-400">
                  ⚠️ Risks of Taking Too Much
                </h3>
                <ul className="space-y-2">
                  {nutrient.overdoseRisks.map((risk, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                      <svg className="mt-0.5 h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        </div>
        {/* Next arrow */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 transition"
          aria-label="Next"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

// Export the main page component as default
export default LearnPage;
