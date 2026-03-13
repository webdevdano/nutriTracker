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

const SUPERFOODS_GREENS: Superfood[] = [
  { name: "Spinach", emoji: "🥬", description: "Nutrient-dense leafy green powerhouse", nutrients: ["Iron", "Calcium", "Vitamin A", "Vitamin K", "Vitamin C", "Folate", "Magnesium"], benefits: ["Supports bone health", "Boosts immune system", "Improves eye health", "Rich in antioxidants"], serving: "1 cup cooked (180g)" },
  { name: "Kale", emoji: "🥗", description: "King of leafy greens — vitamin K champion", nutrients: ["Vitamin K", "Vitamin A", "Vitamin C", "Calcium", "Iron", "Folate", "Manganese"], benefits: ["Bone health", "Anti-inflammatory", "Cancer prevention", "Detoxification"], serving: "1 cup raw (67g)" },
  { name: "Broccoli", emoji: "🥦", description: "Cruciferous vegetable with cancer-fighting sulforaphane", nutrients: ["Sulforaphane", "Vitamin C", "Vitamin K", "Folate", "Fiber", "Potassium"], benefits: ["Cancer prevention", "Gut health", "Immune support", "Bone health"], serving: "1 cup chopped (91g)" },
  { name: "Swiss Chard", emoji: "🌿", description: "Colorful leafy green with exceptional mineral content", nutrients: ["Vitamin K", "Vitamin A", "Vitamin C", "Magnesium", "Iron", "Potassium"], benefits: ["Blood sugar control", "Bone health", "Antioxidant-rich", "Heart health"], serving: "1 cup cooked (175g)" },
  { name: "Brussels Sprouts", emoji: "🥦", description: "Mini cabbages packed with sulforaphane and vitamin K", nutrients: ["Vitamin K", "Vitamin C", "Folate", "Fiber", "Sulforaphane", "Manganese"], benefits: ["Cancer prevention", "Digestive health", "Heart health", "Immune support"], serving: "1 cup cooked (156g)" },
  { name: "Arugula", emoji: "🌿", description: "Peppery green high in nitrates for blood flow", nutrients: ["Nitrates", "Vitamin K", "Vitamin A", "Folate", "Calcium", "Vitamin C"], benefits: ["Exercise performance", "Blood pressure support", "Eye health", "Anti-inflammatory"], serving: "2 cups raw (80g)" },
  { name: "Watercress", emoji: "🌿", description: "Most nutrient-dense food per calorie according to CDC", nutrients: ["Vitamin K", "Vitamin C", "Vitamin A", "Calcium", "PEITC", "Iodine"], benefits: ["Highest nutrient density of any food", "Cancer prevention", "Bone health", "Thyroid support"], serving: "2 cups (68g)" },
  { name: "Bok Choy", emoji: "🥬", description: "Asian cruciferous green with calcium and vitamins", nutrients: ["Vitamin A", "Vitamin C", "Vitamin K", "Calcium", "Folate", "Potassium"], benefits: ["Bone health", "Immune support", "Anti-inflammatory", "Low calorie"], serving: "1 cup cooked (170g)" },
];

const SUPERFOODS_BERRIES: Superfood[] = [
  { name: "Blueberries", emoji: "🫐", description: "Highest antioxidant fruit — brain food", nutrients: ["Anthocyanins", "Vitamin C", "Vitamin K", "Fiber", "Manganese", "Pterostilbene"], benefits: ["Memory improvement", "Brain health", "Anti-aging", "Heart health"], serving: "1 cup (148g)" },
  { name: "Pomegranate", emoji: "🍎", description: "Seeds bursting with punicalagin antioxidants", nutrients: ["Punicalagins", "Vitamin C", "Folate", "Potassium", "Fiber", "Vitamin K"], benefits: ["Strongest antioxidant of any fruit", "Heart health", "Anti-inflammatory", "Cancer prevention"], serving: "1/2 cup seeds (87g)" },
  { name: "Acai", emoji: "🍇", description: "Amazonian berry with massive antioxidant score", nutrients: ["Anthocyanins", "Healthy Fats", "Fiber", "Iron", "Calcium", "Vitamin A"], benefits: ["Highest ORAC score of any food", "Heart health", "Brain health", "Anti-aging"], serving: "100g pulp" },
  { name: "Tart Cherries", emoji: "🍒", description: "Only natural food source of melatonin", nutrients: ["Melatonin", "Anthocyanins", "Vitamin C", "Potassium", "Fiber", "Quercetin"], benefits: ["Sleep quality", "Muscle recovery", "Reduced DOMS", "Anti-inflammatory"], serving: "1 cup (138g)" },
  { name: "Goji Berries", emoji: "🫐", description: "Ancient Chinese superfood with zeaxanthin", nutrients: ["Zeaxanthin", "Vitamin A", "Vitamin C", "Iron", "Protein", "Fiber"], benefits: ["Eye health", "Immune support", "Blood sugar control", "Anti-aging"], serving: "1 oz dried (28g)" },
  { name: "Raspberries", emoji: "🫐", description: "High-fiber berry with powerful ellagic acid", nutrients: ["Fiber", "Vitamin C", "Manganese", "Ellagic Acid", "Vitamin K", "Folate"], benefits: ["Highest fiber berry", "Cancer prevention", "Blood sugar control", "Heart health"], serving: "1 cup (123g)" },
  { name: "Elderberries", emoji: "🫐", description: "Most studied berry for immune defense", nutrients: ["Anthocyanins", "Vitamin C", "Fiber", "Quercetin", "Potassium", "Vitamin A"], benefits: ["Reduces cold/flu duration", "Antiviral properties", "Immune modulation", "Antioxidant-rich"], serving: "1 cup (145g) or extract" },
];

const SUPERFOODS_PROTEIN: Superfood[] = [
  { name: "Salmon", emoji: "🐟", description: "Omega-3 rich fatty fish — brain and heart superfood", nutrients: ["Omega-3s", "Protein", "Vitamin D", "Vitamin B12", "Selenium", "Astaxanthin"], benefits: ["Heart health", "Brain function", "Reduces inflammation", "Muscle repair"], serving: "3 oz (85g)" },
  { name: "Eggs", emoji: "🥚", description: "Most nutrient-complete whole food available", nutrients: ["Complete Protein", "Choline", "Vitamin D", "Vitamin B12", "Selenium", "Lutein"], benefits: ["Brain health via choline", "Eye health", "Muscle building", "Hormone production"], serving: "1 large egg (50g)" },
  { name: "Greek Yogurt", emoji: "🥛", description: "Probiotic-rich protein food for gut and muscles", nutrients: ["Protein", "Probiotics", "Calcium", "Vitamin B12", "Phosphorus", "Selenium"], benefits: ["Gut microbiome support", "Bone strength", "Muscle building", "Immune support"], serving: "1 cup (245g)" },
  { name: "Sardines", emoji: "🐟", description: "Tiny fish with bone-in calcium and omega-3s", nutrients: ["Omega-3s", "Calcium", "Vitamin D", "Vitamin B12", "Selenium", "Protein"], benefits: ["Bone health", "Heart health", "Brain function", "Sustainable seafood"], serving: "3 oz (85g)" },
  { name: "Beef Liver", emoji: "🥩", description: "Most nutrient-dense organ meat — nature's multivitamin", nutrients: ["Vitamin A", "Vitamin B12", "Iron", "Copper", "Folate", "CoQ10"], benefits: ["Highest vitamin A food", "Energy production", "Red blood cell formation", "Immune function"], serving: "3 oz (85g)" },
  { name: "Mackerel", emoji: "🐟", description: "Fatty fish with more omega-3s than salmon", nutrients: ["Omega-3s", "Vitamin D", "Vitamin B12", "Selenium", "Protein", "Niacin"], benefits: ["Heart health", "Anti-inflammatory", "Brain function", "Thyroid support"], serving: "3 oz (85g)" },
];

const SUPERFOODS_SEEDS_FATS: Superfood[] = [
  { name: "Chia Seeds", emoji: "🌱", description: "Tiny seeds with the most omega-3s of any plant food", nutrients: ["Omega-3s", "Fiber", "Protein", "Calcium", "Magnesium", "Phosphorus"], benefits: ["Digestive health", "Heart health", "Bone strength", "Blood sugar control"], serving: "2 tbsp (28g)" },
  { name: "Avocado", emoji: "🥑", description: "Healthy fat powerhouse with the most potassium of any fruit", nutrients: ["Monounsaturated Fats", "Potassium", "Fiber", "Vitamin E", "Vitamin K", "Folate"], benefits: ["Heart health", "Fat-soluble nutrient absorption", "Satiety", "Skin health"], serving: "1/2 avocado (100g)" },
  { name: "Walnuts", emoji: "🥜", description: "Only nut with significant ALA omega-3s", nutrients: ["Omega-3 ALA", "Polyphenols", "Magnesium", "Phosphorus", "Copper", "Vitamin E"], benefits: ["Brain health", "Anti-inflammatory", "Heart health", "Gut microbiome support"], serving: "1 oz (28g)" },
  { name: "Flaxseeds", emoji: "🌾", description: "Richest plant source of lignans and omega-3 ALA", nutrients: ["Omega-3 ALA", "Lignans", "Fiber", "Magnesium", "Phosphorus", "Thiamine"], benefits: ["Hormone balance", "Heart health", "Digestive health", "Cancer prevention via lignans"], serving: "2 tbsp ground (14g)" },
  { name: "Hemp Seeds", emoji: "🌿", description: "Only seed with perfect 3:1 omega-6 to omega-3 ratio", nutrients: ["Complete Protein", "Omega-3 & Omega-6", "Magnesium", "Zinc", "Iron", "GLA"], benefits: ["Ideal omega ratio", "Complete plant protein", "Skin health", "Heart health"], serving: "3 tbsp (30g)" },
  { name: "Extra Virgin Olive Oil", emoji: "🫒", description: "Mediterranean staple with oleocanthal anti-inflammatory", nutrients: ["Monounsaturated Fats", "Oleocanthal", "Polyphenols", "Vitamin E", "Vitamin K", "Squalene"], benefits: ["Heart health", "Anti-inflammatory", "Brain health", "Cancer prevention"], serving: "1 tbsp (14g)" },
];

const SUPERFOODS_FUNCTIONAL: Superfood[] = [
  { name: "Turmeric", emoji: "🟡", description: "Golden spice with curcumin — most studied anti-inflammatory", nutrients: ["Curcumin", "Manganese", "Iron", "Potassium", "Vitamin C", "Fiber"], benefits: ["Anti-inflammatory", "Joint pain relief", "Brain health", "Cancer prevention"], serving: "1 tsp (3g) with black pepper" },
  { name: "Ginger", emoji: "🫚", description: "Root with gingerol — anti-nausea and inflammation fighter", nutrients: ["Gingerol", "Shogaol", "Magnesium", "Potassium", "Vitamin C", "Manganese"], benefits: ["Nausea relief", "Anti-inflammatory", "Digestive health", "Muscle recovery"], serving: "1 tsp fresh grated (5g)" },
  { name: "Garlic", emoji: "🧄", description: "Allicin-rich immune and cardiovascular superfood", nutrients: ["Allicin", "Alliin", "Vitamin C", "Manganese", "Selenium", "Vitamin B6"], benefits: ["Antibiotic properties", "Immune support", "Blood pressure reduction", "Heart health"], serving: "2 cloves (6g)" },
  { name: "Matcha", emoji: "🍵", description: "Whole-leaf green tea with L-theanine calm energy", nutrients: ["EGCG", "L-theanine", "Catechins", "Vitamin C", "Chlorophyll", "Caffeine"], benefits: ["Calm alertness via L-theanine", "Fat burning", "Cancer prevention via EGCG", "Detoxification via chlorophyll"], serving: "1 tsp powder (2g)" },
  { name: "Spirulina", emoji: "🟢", description: "Blue-green algae with the most protein per gram of any food", nutrients: ["Complete Protein", "Phycocyanin", "Iron", "Vitamin B12", "Beta-Carotene", "GLA"], benefits: ["Highest protein density", "Heavy metal detoxification", "Energy boost", "Anti-inflammatory"], serving: "1 tbsp (7g)" },
  { name: "Lion's Mane Mushroom", emoji: "🍄", description: "Functional mushroom that stimulates nerve growth factor", nutrients: ["Hericenones", "Erinacines", "Beta-Glucans", "Copper", "Selenium", "Zinc"], benefits: ["Nerve growth factor stimulation", "Memory improvement", "Anxiety reduction", "Immune support"], serving: "1 cup cooked (70g)" },
  { name: "Kimchi", emoji: "🥬", description: "Korean fermented cabbage with trillions of probiotics", nutrients: ["Probiotics", "Vitamin C", "Vitamin K", "Folate", "Iron", "Capsaicin"], benefits: ["Gut microbiome diversity", "Immune support", "Weight management", "Anti-inflammatory"], serving: "1/2 cup (75g)" },
  { name: "Raw Cacao", emoji: "🍫", description: "Purest form of chocolate — highest magnesium food", nutrients: ["Magnesium", "Iron", "Flavanols", "Copper", "Manganese", "Theobromine"], benefits: ["Heart health", "Mood improvement via theobromine", "Blood pressure reduction", "Antioxidant-rich"], serving: "1 tbsp powder (7g)" },
];

const SUPERFOODS_ALL: Superfood[] = [...SUPERFOODS_GREENS, ...SUPERFOODS_BERRIES, ...SUPERFOODS_PROTEIN, ...SUPERFOODS_SEEDS_FATS, ...SUPERFOODS_FUNCTIONAL];

const SUPERFOODS: Superfood[] = SUPERFOODS_ALL;

const allNutrients = getAllNutrientsAlphabetically();

const CARBS_GRAINS: Superfood[] = [
  { name: "Oats", emoji: "🌾", description: "Whole grain with the highest beta-glucan fiber content", nutrients: ["Carbohydrates", "Beta-Glucan", "Fiber", "Protein", "Magnesium", "Zinc"], benefits: ["Lowers LDL cholesterol", "Blood sugar control", "Sustained energy", "Gut health"], serving: "1 cup cooked (156g)" },
  { name: "Brown Rice", emoji: "🍚", description: "Whole grain with the bran and germ intact", nutrients: ["Carbohydrates", "Fiber", "Magnesium", "Phosphorus", "Selenium", "Manganese"], benefits: ["Long-lasting energy", "Digestive health", "Richer in nutrients than white rice", "Supports metabolism"], serving: "1 cup cooked (195g)" },
  { name: "Quinoa", emoji: "🌱", description: "Gluten-free complete protein grain", nutrients: ["Carbohydrates", "Complete Protein", "Fiber", "Magnesium", "Iron", "Zinc"], benefits: ["Only grain with all 9 essential amino acids", "Sustained energy", "Gluten-free", "Rich in minerals"], serving: "1 cup cooked (185g)" },
  { name: "Buckwheat", emoji: "🌿", description: "Gluten-free pseudocereal with a nutty flavour", nutrients: ["Carbohydrates", "Fiber", "Magnesium", "Manganese", "Copper", "Rutin"], benefits: ["Blood sugar control", "Heart health", "Gluten-free", "Rich in antioxidant rutin"], serving: "1 cup cooked (168g)" },
  { name: "Barley", emoji: "🌾", description: "Ancient grain richest in beta-glucan fiber", nutrients: ["Carbohydrates", "Beta-Glucan", "Fiber", "Selenium", "Manganese", "Phosphorus"], benefits: ["Strongest cholesterol-lowering grain", "Blood sugar control", "Gut health", "Heart health"], serving: "1 cup cooked (157g)" },
  { name: "Farro", emoji: "🌾", description: "Ancient wheat grain with dense nutrition", nutrients: ["Carbohydrates", "Fiber", "Protein", "Magnesium", "Zinc", "Iron"], benefits: ["High fiber for a wheat grain", "Rich in protein", "Sustained energy", "Joint health"], serving: "1 cup cooked (200g)" },
  { name: "Wild Rice", emoji: "🌾", description: "Native grass seed with more protein than white rice", nutrients: ["Carbohydrates", "Protein", "Fiber", "Manganese", "Phosphorus", "Zinc"], benefits: ["Higher protein than regular rice", "Rich in antioxidants", "Digestive health", "Heart health"], serving: "1 cup cooked (164g)" },
  { name: "Corn / Grits", emoji: "🌽", description: "Starchy grain and vegetable dual food", nutrients: ["Carbohydrates", "Fiber", "Vitamin C", "Magnesium", "Thiamine", "Lutein"], benefits: ["Eye health", "Energy fuel", "Gut-friendly fiber", "Rich in lutein"], serving: "1 cup cooked (154g)" },
];

const CARBS_LEGUMES: Superfood[] = [
  { name: "Black Beans", emoji: "🫘", description: "Fiber and antioxidant-rich legume", nutrients: ["Carbohydrates", "Fiber", "Protein", "Folate", "Magnesium", "Iron"], benefits: ["Blood sugar control", "Heart health", "Digestive health", "High in anthocyanins"], serving: "1 cup cooked (172g)" },
  { name: "Chickpeas", emoji: "🫘", description: "Versatile legume used in hummus and curries", nutrients: ["Carbohydrates", "Protein", "Fiber", "Folate", "Iron", "Manganese"], benefits: ["Blood sugar control", "Digestive health", "Heart health", "Satiety"], serving: "1 cup cooked (164g)" },
  { name: "Kidney Beans", emoji: "🫘", description: "Hearty legume rich in fiber and iron", nutrients: ["Carbohydrates", "Fiber", "Protein", "Iron", "Folate", "Potassium"], benefits: ["Heart health", "Blood sugar management", "Digestive health", "Rich in iron"], serving: "1 cup cooked (177g)" },
  { name: "Lentils", emoji: "🫙", description: "Fastest-cooking legume and iron powerhouse", nutrients: ["Carbohydrates", "Fiber", "Protein", "Iron", "Folate", "Manganese"], benefits: ["Highest iron per calorie of any plant food", "Heart health", "Gut health", "Stable blood sugar"], serving: "1 cup cooked (198g)" },
  { name: "Edamame", emoji: "🫛", description: "Whole soy bean — carbs with complete protein", nutrients: ["Carbohydrates", "Complete Protein", "Fiber", "Folate", "Vitamin K", "Magnesium"], benefits: ["Complete plant protein", "Hormone balance", "Bone health", "Heart health"], serving: "1 cup (155g)" },
  { name: "Green Peas", emoji: "🟢", description: "Sweet legume packed with vitamins and fiber", nutrients: ["Carbohydrates", "Fiber", "Vitamin C", "Vitamin K", "Thiamine", "Folate"], benefits: ["Immune support", "Digestive health", "Blood sugar control", "Eye health"], serving: "1 cup cooked (160g)" },
  { name: "Pinto Beans", emoji: "🫘", description: "Creamy bean high in fiber and folate", nutrients: ["Carbohydrates", "Fiber", "Protein", "Folate", "Manganese", "Phosphorus"], benefits: ["Heart health", "Digestive health", "Blood sugar management", "Energy support"], serving: "1 cup cooked (171g)" },
  { name: "Navy Beans", emoji: "🤍", description: "Small white bean highest in fiber of any legume", nutrients: ["Carbohydrates", "Fiber", "Protein", "Folate", "Manganese", "Thiamine"], benefits: ["Highest fiber bean", "Heart health", "Gut health", "Stable energy"], serving: "1 cup cooked (182g)" },
];

const CARBS_STARCHY_VEG: Superfood[] = [
  { name: "Sweet Potato", emoji: "🍠", description: "Nutrient-dense root vegetable with complex carbs", nutrients: ["Carbohydrates", "Vitamin A", "Vitamin C", "Fiber", "Potassium", "Manganese"], benefits: ["Eye health", "Immune support", "Stable energy", "Anti-inflammatory"], serving: "1 medium (150g)" },
  { name: "Beets", emoji: "🫚", description: "Root vegetable with nitrates that boost blood flow", nutrients: ["Carbohydrates", "Folate", "Manganese", "Potassium", "Nitrates", "Vitamin C"], benefits: ["Improves athletic stamina", "Blood pressure support", "Liver health", "Antioxidant-rich"], serving: "1 cup cooked (170g)" },
  { name: "White Potato", emoji: "🥔", description: "Misunderstood whole food rich in potassium", nutrients: ["Carbohydrates", "Potassium", "Vitamin C", "Vitamin B6", "Fiber", "Resistant Starch"], benefits: ["Highest potassium vegetable", "Gut-feeding resistant starch when cooled", "Filling", "Affordable"], serving: "1 medium (213g)" },
  { name: "Pumpkin", emoji: "🎃", description: "Low-calorie starchy squash loaded with vitamin A", nutrients: ["Carbohydrates", "Vitamin A", "Vitamin C", "Fiber", "Potassium", "Beta-Carotene"], benefits: ["Eye health", "Immune support", "Low calorie", "Antioxidant-rich"], serving: "1 cup cooked (245g)" },
  { name: "Butternut Squash", emoji: "🥕", description: "Sweet squash with ample fiber and vitamin A", nutrients: ["Carbohydrates", "Vitamin A", "Vitamin C", "Fiber", "Magnesium", "Potassium"], benefits: ["Vision support", "Heart health", "Immune support", "Weight management"], serving: "1 cup cubed (205g)" },
  { name: "Carrots", emoji: "🥕", description: "Beta-carotene rich root with moderate carbs", nutrients: ["Carbohydrates", "Beta-Carotene", "Vitamin K", "Potassium", "Fiber", "Vitamin C"], benefits: ["Eye health", "Immune support", "Skin health", "Heart health"], serving: "1 cup chopped (128g)" },
  { name: "Parsnips", emoji: "🌿", description: "Mild root vegetable with more fiber than carrots", nutrients: ["Carbohydrates", "Fiber", "Folate", "Vitamin C", "Potassium", "Manganese"], benefits: ["Digestive health", "Immune support", "Heart health", "Low calorie density"], serving: "1 cup cooked (156g)" },
];

const CARBS_FRUITS: Superfood[] = [
  { name: "Banana", emoji: "🍌", description: "Perfect pre-workout fruit with potassium", nutrients: ["Carbohydrates", "Potassium", "Vitamin B6", "Vitamin C", "Fiber", "Magnesium"], benefits: ["Quick energy", "Muscle cramp prevention", "Digestive health", "Mood support"], serving: "1 medium (118g)" },
  { name: "Oranges", emoji: "🍊", description: "Citrus packed with vitamin C and natural sugars", nutrients: ["Carbohydrates", "Vitamin C", "Fiber", "Folate", "Potassium", "Thiamine"], benefits: ["Immune support", "Skin health", "Aids iron absorption", "Heart health"], serving: "1 medium (130g)" },
  { name: "Blueberries", emoji: "🫐", description: "Low-sugar fruit with massive antioxidant load", nutrients: ["Carbohydrates", "Anthocyanins", "Vitamin C", "Vitamin K", "Fiber", "Manganese"], benefits: ["Brain health", "Memory improvement", "Heart health", "Anti-aging"], serving: "1 cup (148g)" },
  { name: "Apples", emoji: "🍎", description: "Fiber-rich fruit with gut-feeding pectin", nutrients: ["Carbohydrates", "Pectin Fiber", "Vitamin C", "Potassium", "Quercetin", "Vitamin K"], benefits: ["Digestive health", "Heart health", "Blood sugar control", "Anti-inflammatory quercetin"], serving: "1 medium (182g)" },
  { name: "Grapefruit", emoji: "🍊", description: "Low-GI citrus with fat-burning compounds", nutrients: ["Carbohydrates", "Vitamin C", "Fiber", "Potassium", "Vitamin A", "Folate"], benefits: ["Weight management", "Insulin sensitivity", "Heart health", "Immune support"], serving: "1/2 medium (123g)" },
  { name: "Mango", emoji: "🥭", description: "Tropical fruit rich in vitamin C and A", nutrients: ["Carbohydrates", "Vitamin C", "Vitamin A", "Folate", "Fiber", "Copper"], benefits: ["Immune support", "Skin health", "Eye health", "Digestive enzymes"], serving: "1 cup (165g)" },
  { name: "Dates", emoji: "🫙", description: "Concentrated natural sugar for quick energy", nutrients: ["Carbohydrates", "Potassium", "Magnesium", "Fiber", "Copper", "Vitamin B6"], benefits: ["Rapid energy", "Pre-workout fuel", "Bone health", "Digestive health"], serving: "2 dates (48g)" },
  { name: "Pineapple", emoji: "🍍", description: "Tropical fruit with bromelain digestive enzymes", nutrients: ["Carbohydrates", "Vitamin C", "Manganese", "Bromelain", "Fiber", "Thiamine"], benefits: ["Digestion support", "Anti-inflammatory", "Immune support", "Joint health"], serving: "1 cup chunks (165g)" },
];

const CARBS_ALL: Superfood[] = [...CARBS_GRAINS, ...CARBS_LEGUMES, ...CARBS_STARCHY_VEG, ...CARBS_FRUITS];

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

const FATS_WHOLE: Superfood[] = [
  { name: "Avocado", emoji: "🥑", description: "Creamy fruit loaded with monounsaturated fat", nutrients: ["Monounsaturated Fat", "Fiber", "Potassium", "Vitamin E", "Vitamin K", "Folate"], benefits: ["Heart health", "Nutrient absorption", "Skin health", "Sustained satiety"], serving: "1/2 avocado (100g)" },
  { name: "Olive Oil (Extra Virgin)", emoji: "🫒", description: "Cold-pressed oil rich in oleic acid and polyphenols", nutrients: ["Monounsaturated Fat", "Vitamin E", "Vitamin K", "Polyphenols", "Oleic Acid"], benefits: ["Heart health", "Anti-inflammatory", "Antioxidant-rich", "Reduces LDL cholesterol"], serving: "1 tbsp (14g)" },
  { name: "Coconut Oil", emoji: "🥥", description: "Tropical oil high in medium-chain triglycerides", nutrients: ["Saturated Fat", "MCTs", "Lauric Acid", "Caprylic Acid"], benefits: ["Quick energy from MCTs", "Antimicrobial properties", "Supports brain function", "Raises HDL cholesterol"], serving: "1 tbsp (14g)" },
  { name: "Butter", emoji: "🧈", description: "Dairy fat rich in fat-soluble vitamins", nutrients: ["Saturated Fat", "Vitamin A", "Vitamin D", "Vitamin K2", "Butyrate", "CLA"], benefits: ["Vitamin K2 for arteries", "Gut health via butyrate", "Fat-soluble vitamin absorption", "Energy dense"], serving: "1 tbsp (14g)" },
  { name: "Ghee", emoji: "🧈", description: "Clarified butter — lactose-free with concentrated nutrients", nutrients: ["Saturated Fat", "Vitamin A", "Vitamin D", "Vitamin K2", "Butyrate", "CLA"], benefits: ["Lactose-free", "High smoke point", "Gut health", "Rich in fat-soluble vitamins"], serving: "1 tbsp (13g)" },
  { name: "Olives", emoji: "🫒", description: "Whole food source of healthy monounsaturated fat", nutrients: ["Monounsaturated Fat", "Vitamin E", "Iron", "Copper", "Polyphenols", "Fiber"], benefits: ["Heart health", "Anti-inflammatory", "Antioxidant-rich", "Bone health"], serving: "10 olives (44g)" },
];

const FATS_NUTS_SEEDS: Superfood[] = [
  { name: "Almonds", emoji: "🥜", description: "Monounsaturated fat with vitamin E", nutrients: ["Monounsaturated Fat", "Vitamin E", "Magnesium", "Fiber", "Protein", "Calcium"], benefits: ["Heart health", "Blood sugar control", "Rich in antioxidants", "Bone strength"], serving: "1 oz (28g)" },
  { name: "Walnuts", emoji: "🌰", description: "Highest omega-3 content of any nut", nutrients: ["Omega-3 ALA", "Polyunsaturated Fat", "Magnesium", "Copper", "Manganese", "Folate"], benefits: ["Brain health", "Heart health", "Anti-inflammatory", "Reduces LDL cholesterol"], serving: "1 oz (28g)" },
  { name: "Macadamia Nuts", emoji: "🥜", description: "Richest nut in monounsaturated fat", nutrients: ["Monounsaturated Fat", "Thiamine", "Manganese", "Copper", "Fiber"], benefits: ["Heart health", "Anti-inflammatory", "Satiating", "Improves cholesterol ratio"], serving: "1 oz (28g)" },
  { name: "Pecans", emoji: "🌰", description: "Antioxidant-rich nut with healthy fats", nutrients: ["Monounsaturated Fat", "Zinc", "Manganese", "Copper", "Thiamine", "Fiber"], benefits: ["Heart health", "Antioxidant-rich", "Blood sugar support", "Anti-inflammatory"], serving: "1 oz (28g)" },
  { name: "Chia Seeds", emoji: "🌱", description: "Tiny seeds packed with omega-3 ALA", nutrients: ["Omega-3 ALA", "Fiber", "Calcium", "Magnesium", "Phosphorus", "Protein"], benefits: ["Heart health", "Digestive health", "Bone strength", "Blood sugar control"], serving: "2 tbsp (28g)" },
  { name: "Flaxseeds", emoji: "🌿", description: "Ground seeds with the highest plant omega-3", nutrients: ["Omega-3 ALA", "Fiber", "Lignan", "Magnesium", "Thiamine", "Phosphorus"], benefits: ["Hormone balance", "Heart health", "Digestive health", "Anti-inflammatory"], serving: "2 tbsp (20g)" },
  { name: "Hemp Seeds", emoji: "🌿", description: "Complete protein with balanced omega-3 to omega-6", nutrients: ["Omega-3 ALA", "Omega-6", "Protein", "Magnesium", "Iron", "Zinc"], benefits: ["Ideal omega ratio", "Complete amino acids", "Heart health", "Anti-inflammatory"], serving: "3 tbsp (30g)" },
  { name: "Sunflower Seeds", emoji: "🌻", description: "Vitamin E rich seed with polyunsaturated fats", nutrients: ["Polyunsaturated Fat", "Vitamin E", "Selenium", "Magnesium", "Thiamine", "Copper"], benefits: ["Antioxidant-rich", "Heart health", "Immune support", "Skin health"], serving: "1 oz (28g)" },
  { name: "Pumpkin Seeds", emoji: "🎃", description: "Zinc and magnesium rich seeds with healthy fats", nutrients: ["Monounsaturated Fat", "Zinc", "Magnesium", "Iron", "Copper", "Manganese"], benefits: ["Immune support", "Sleep quality", "Prostate health", "Anti-inflammatory"], serving: "1 oz (28g)" },
];

const FATS_FISH: Superfood[] = [
  { name: "Salmon", emoji: "🐟", description: "Best source of long-chain omega-3s EPA and DHA", nutrients: ["Omega-3 EPA", "Omega-3 DHA", "Protein", "Vitamin D", "Selenium", "Astaxanthin"], benefits: ["Heart health", "Brain function", "Reduces inflammation", "Eye health"], serving: "3 oz (85g)" },
  { name: "Mackerel", emoji: "🐟", description: "Fatty fish extremely high in omega-3s", nutrients: ["Omega-3 EPA", "Omega-3 DHA", "Vitamin D", "Vitamin B12", "Selenium", "Niacin"], benefits: ["Heart health", "Brain health", "Reduces triglycerides", "Anti-inflammatory"], serving: "3 oz (85g)" },
  { name: "Sardines", emoji: "🐟", description: "Small oily fish packed with omega-3s and calcium", nutrients: ["Omega-3 EPA", "Omega-3 DHA", "Calcium", "Vitamin D", "Vitamin B12", "Selenium"], benefits: ["Bone health", "Heart health", "Brain function", "Sustainable source"], serving: "3 oz (85g)" },
  { name: "Herring", emoji: "🐟", description: "Underrated fatty fish with great omega-3 profile", nutrients: ["Omega-3 EPA", "Omega-3 DHA", "Vitamin D", "Vitamin B12", "Selenium", "Iodine"], benefits: ["Heart health", "Thyroid support", "Brain health", "Rich in vitamin D"], serving: "3 oz (85g)" },
  { name: "Anchovies", emoji: "🐟", description: "Tiny fish with concentrated omega-3s", nutrients: ["Omega-3 EPA", "Omega-3 DHA", "Calcium", "Iron", "Selenium", "Niacin"], benefits: ["Heart health", "Anti-inflammatory", "Bone health", "Umami flavor boost"], serving: "1 oz (28g)" },
];

const FATS_DAIRY: Superfood[] = [
  { name: "Full-Fat Greek Yogurt", emoji: "🥛", description: "Probiotic dairy with healthy saturated fat", nutrients: ["Saturated Fat", "Protein", "Calcium", "Probiotics", "Vitamin B12", "CLA"], benefits: ["Gut health", "Bone strength", "Satiating", "CLA for body composition"], serving: "1 cup (245g)" },
  { name: "Hard Cheese (Cheddar)", emoji: "🧀", description: "Aged cheese with fat-soluble vitamins", nutrients: ["Saturated Fat", "Protein", "Calcium", "Vitamin K2", "Vitamin A", "Zinc"], benefits: ["Bone health", "Vitamin K2 for arteries", "Satiating", "Dental health"], serving: "1 oz (28g)" },
  { name: "Heavy Cream", emoji: "🥛", description: "High-fat dairy for cooking and calories", nutrients: ["Saturated Fat", "Vitamin A", "Vitamin D", "Choline", "Riboflavin"], benefits: ["Energy dense", "Fat-soluble vitamin source", "Keto-friendly", "Cooking versatility"], serving: "2 tbsp (30ml)" },
  { name: "Whole Milk", emoji: "🥛", description: "Balanced fat and protein dairy", nutrients: ["Saturated Fat", "Protein", "Calcium", "Vitamin D", "Phosphorus", "Riboflavin"], benefits: ["Bone health", "Muscle recovery", "CLA content", "Nutrient absorption"], serving: "1 cup (244ml)" },
];

const FATS_ALL: Superfood[] = [...FATS_WHOLE, ...FATS_NUTS_SEEDS, ...FATS_FISH, ...FATS_DAIRY];

const VITAMINS_FAT_SOLUBLE: Superfood[] = [
  { name: "Carrots", emoji: "🥕", description: "Highest beta-carotene (pro-vitamin A) vegetable", nutrients: ["Vitamin A", "Vitamin K", "Fiber", "Potassium", "Vitamin C"], benefits: ["Eye health", "Immune support", "Skin health", "Antioxidant-rich"], serving: "1 medium (61g)" },
  { name: "Sweet Potato", emoji: "🍠", description: "One of the richest sources of vitamin A", nutrients: ["Vitamin A", "Vitamin C", "Vitamin B6", "Potassium", "Fiber", "Manganese"], benefits: ["Eye health", "Immune support", "Skin health", "Stable energy"], serving: "1 medium (150g)" },
  { name: "Liver (Beef)", emoji: "🥩", description: "Most nutrient-dense food — richest source of vitamin A", nutrients: ["Vitamin A", "Vitamin B12", "Folate", "Iron", "Copper", "Riboflavin"], benefits: ["Eye health", "Immune support", "Red blood cell production", "Detoxification"], serving: "3 oz (85g)" },
  { name: "Egg Yolk", emoji: "🥚", description: "Natural source of vitamins A, D, E and K", nutrients: ["Vitamin A", "Vitamin D", "Vitamin E", "Vitamin K2", "Choline", "Selenium"], benefits: ["Eye health", "Bone health", "Brain health", "Fat-soluble vitamin package"], serving: "1 large yolk (17g)" },
  { name: "Salmon", emoji: "🐟", description: "Top food source of vitamin D3 and E", nutrients: ["Vitamin D", "Vitamin E", "Omega-3s", "Selenium", "Protein", "Vitamin B12"], benefits: ["Bone health", "Immune support", "Heart health", "Anti-inflammatory"], serving: "3 oz (85g)" },
  { name: "Sardines", emoji: "🐟", description: "Excellent vitamin D source with calcium", nutrients: ["Vitamin D", "Vitamin B12", "Calcium", "Omega-3s", "Selenium", "Phosphorus"], benefits: ["Bone health", "Immune support", "Brain health", "Heart health"], serving: "3 oz (85g)" },
  { name: "Cod Liver Oil", emoji: "🫙", description: "Concentrated vitamin A and D supplement food", nutrients: ["Vitamin A", "Vitamin D", "Vitamin E", "Omega-3 EPA", "Omega-3 DHA"], benefits: ["Bone health", "Immune support", "Eye health", "Anti-inflammatory"], serving: "1 tsp (5ml)" },
  { name: "Sunflower Seeds", emoji: "🌻", description: "Richest food source of vitamin E", nutrients: ["Vitamin E", "Selenium", "Magnesium", "Thiamine", "Copper", "Polyunsaturated Fat"], benefits: ["Antioxidant protection", "Immune support", "Heart health", "Skin health"], serving: "1 oz (28g)" },
  { name: "Almonds", emoji: "🥜", description: "Top plant source of vitamin E", nutrients: ["Vitamin E", "Magnesium", "Calcium", "Fiber", "Protein", "Monounsaturated Fat"], benefits: ["Antioxidant protection", "Heart health", "Blood sugar control", "Skin health"], serving: "1 oz (28g)" },
  { name: "Spinach", emoji: "🥬", description: "Richest leafy green for vitamin K1", nutrients: ["Vitamin K", "Vitamin A", "Vitamin C", "Folate", "Iron", "Calcium"], benefits: ["Blood clotting", "Bone health", "Antioxidant-rich", "Eye health"], serving: "1 cup cooked (180g)" },
  { name: "Kale", emoji: "🥗", description: "High in both vitamin K1 and K2", nutrients: ["Vitamin K", "Vitamin A", "Vitamin C", "Folate", "Calcium", "Iron"], benefits: ["Bone health", "Heart health", "Cancer prevention", "Anti-inflammatory"], serving: "1 cup raw (67g)" },
  { name: "Natto (Fermented Soy)", emoji: "🌱", description: "Highest food source of vitamin K2 (MK-7)", nutrients: ["Vitamin K2", "Protein", "Fiber", "Iron", "Calcium", "Nattokinase"], benefits: ["Arterial health", "Bone density", "Cardiovascular health", "Blood clot prevention"], serving: "3 oz (85g)" },
];

const VITAMINS_B: Superfood[] = [
  { name: "Beef Liver", emoji: "🥩", description: "Best overall source of all B vitamins", nutrients: ["Vitamin B12", "Riboflavin (B2)", "Niacin (B3)", "Folate (B9)", "B6", "Pantothenic Acid"], benefits: ["Energy production", "Red blood cell formation", "Nerve health", "Detoxification"], serving: "3 oz (85g)" },
  { name: "Salmon", emoji: "🐟", description: "Excellent source of B vitamins especially B12", nutrients: ["Vitamin B12", "Niacin (B3)", "Vitamin B6", "Riboflavin", "Thiamine", "Pantothenic Acid"], benefits: ["Nerve health", "Energy metabolism", "Heart health", "Brain function"], serving: "3 oz (85g)" },
  { name: "Eggs", emoji: "🥚", description: "Complete B vitamin profile especially biotin and B12", nutrients: ["Vitamin B12", "Biotin (B7)", "Riboflavin (B2)", "Pantothenic Acid", "Folate", "Choline"], benefits: ["Hair and nail health", "Energy production", "Brain health", "Nerve function"], serving: "1 large egg (50g)" },
  { name: "Lentils", emoji: "🥣", description: "Best plant source of folate (B9)", nutrients: ["Folate (B9)", "Thiamine (B1)", "Iron", "Fiber", "Protein", "Manganese"], benefits: ["Cell division", "Pregnancy health", "Red blood cell formation", "Heart health"], serving: "1 cup cooked (198g)" },
  { name: "Chickpeas", emoji: "🫘", description: "High in folate and vitamin B6", nutrients: ["Folate (B9)", "Vitamin B6", "Thiamine (B1)", "Protein", "Fiber", "Iron"], benefits: ["Brain health", "Cell growth", "Heart health", "Blood sugar control"], serving: "1 cup cooked (164g)" },
  { name: "Brown Rice", emoji: "🍚", description: "Good source of thiamine and niacin", nutrients: ["Thiamine (B1)", "Niacin (B3)", "Vitamin B6", "Magnesium", "Phosphorus", "Manganese"], benefits: ["Energy metabolism", "Nerve function", "Digestive health", "Blood sugar control"], serving: "1 cup cooked (195g)" },
  { name: "Nutritional Yeast", emoji: "🧬", description: "Complete B vitamin complex including B12", nutrients: ["Vitamin B12", "Thiamine (B1)", "Riboflavin (B2)", "Niacin (B3)", "Folate", "B6"], benefits: ["Vegan B12 source", "Energy production", "Immune support", "Savory umami flavor"], serving: "2 tbsp (16g)" },
  { name: "Avocado", emoji: "🥑", description: "Richest fruit in B vitamins", nutrients: ["Pantothenic Acid (B5)", "Folate (B9)", "Vitamin B6", "Riboflavin", "Niacin", "Thiamine"], benefits: ["Energy metabolism", "Hormone production", "Brain health", "Heart health"], serving: "1/2 avocado (100g)" },
  { name: "Turkey Breast", emoji: "🦃", description: "Excellent source of niacin (B3) and B6", nutrients: ["Niacin (B3)", "Vitamin B6", "Vitamin B12", "Pantothenic Acid", "Riboflavin", "Selenium"], benefits: ["Energy production", "Nerve health", "Mood regulation", "Muscle support"], serving: "3 oz (85g)" },
];

const VITAMINS_C: Superfood[] = [
  { name: "Red Bell Pepper", emoji: "🫑", description: "Highest vitamin C of any common vegetable", nutrients: ["Vitamin C", "Vitamin A", "Vitamin B6", "Folate", "Potassium", "Fiber"], benefits: ["Immune boost", "Collagen production", "Eye health", "Iron absorption"], serving: "1 medium (119g)" },
  { name: "Kiwi", emoji: "🥝", description: "Gram for gram more vitamin C than oranges", nutrients: ["Vitamin C", "Vitamin K", "Vitamin E", "Folate", "Fiber", "Potassium"], benefits: ["Immune support", "Digestive health", "Sleep quality", "Antioxidant-rich"], serving: "1 medium (69g)" },
  { name: "Strawberries", emoji: "🍓", description: "Sweet berry packed with vitamin C", nutrients: ["Vitamin C", "Manganese", "Folate", "Fiber", "Potassium", "Antioxidants"], benefits: ["Heart health", "Blood sugar control", "Immune support", "Skin health"], serving: "1 cup (152g)" },
  { name: "Broccoli", emoji: "🥦", description: "High vitamin C and K cruciferous vegetable", nutrients: ["Vitamin C", "Vitamin K", "Folate", "Fiber", "Potassium", "Sulforaphane"], benefits: ["Cancer prevention", "Immune support", "Bone health", "Detoxification"], serving: "1 cup chopped (91g)" },
  { name: "Oranges", emoji: "🍊", description: "Classic vitamin C citrus fruit", nutrients: ["Vitamin C", "Folate", "Thiamine", "Potassium", "Fiber", "Hesperidin"], benefits: ["Immune support", "Collagen production", "Heart health", "Iron absorption"], serving: "1 medium (130g)" },
  { name: "Guava", emoji: "🍈", description: "Tropical fruit with 4x more vitamin C than oranges", nutrients: ["Vitamin C", "Fiber", "Folate", "Potassium", "Vitamin A", "Lycopene"], benefits: ["Immune powerhouse", "Gut health", "Skin health", "Blood sugar control"], serving: "1 medium (55g)" },
  { name: "Papaya", emoji: "🍐", description: "Tropical fruit high in vitamin C and digestive enzymes", nutrients: ["Vitamin C", "Vitamin A", "Folate", "Potassium", "Papain", "Fiber"], benefits: ["Digestive health", "Immune support", "Anti-inflammatory", "Skin health"], serving: "1 cup cubed (145g)" },
  { name: "Brussels Sprouts", emoji: "🥦", description: "Cruciferous vegetable with high vitamin C and K", nutrients: ["Vitamin C", "Vitamin K", "Folate", "Fiber", "Vitamin B6", "Glucosinolates"], benefits: ["Cancer prevention", "Bone health", "Digestive health", "Immune support"], serving: "1 cup cooked (156g)" },
  { name: "Spinach", emoji: "🥬", description: "Leafy green with vitamin C, K and folate", nutrients: ["Vitamin C", "Vitamin K", "Folate", "Vitamin A", "Iron", "Calcium"], benefits: ["Immune support", "Iron absorption", "Bone health", "Eye health"], serving: "1 cup raw (30g)" },
];

const VITAMINS_ALL: Superfood[] = [...VITAMINS_FAT_SOLUBLE, ...VITAMINS_B, ...VITAMINS_C];

const MINERALS_ELECTROLYTES: Superfood[] = [
  { name: "Banana", emoji: "🍌", description: "Potassium-rich fruit for muscle and nerve function", nutrients: ["Potassium", "Vitamin B6", "Vitamin C", "Magnesium", "Fiber", "Carbohydrates"], benefits: ["Muscle function", "Blood pressure control", "Heart rhythm", "Reduces cramps"], serving: "1 medium (118g)" },
  { name: "Sweet Potato", emoji: "🍠", description: "High potassium and magnesium root vegetable", nutrients: ["Potassium", "Magnesium", "Vitamin A", "Fiber", "Manganese", "Vitamin C"], benefits: ["Blood pressure support", "Muscle health", "Heart health", "Electrolyte balance"], serving: "1 medium (150g)" },
  { name: "Avocado", emoji: "🥑", description: "Potassium-dense fruit — more than a banana", nutrients: ["Potassium", "Magnesium", "Sodium", "Fiber", "Vitamin K", "Folate"], benefits: ["Blood pressure control", "Heart health", "Muscle recovery", "Electrolyte balance"], serving: "1/2 avocado (100g)" },
  { name: "Spinach", emoji: "🤬", description: "Rich in magnesium and potassium", nutrients: ["Magnesium", "Potassium", "Calcium", "Iron", "Vitamin K", "Folate"], benefits: ["Muscle relaxation", "Blood pressure support", "Bone health", "Heart health"], serving: "1 cup cooked (180g)" },
  { name: "Coconut Water", emoji: "🥥", description: "Natural electrolyte-packed drink", nutrients: ["Potassium", "Sodium", "Magnesium", "Calcium", "Phosphorus"], benefits: ["Hydration", "Electrolyte replenishment", "Muscle recovery", "Blood pressure support"], serving: "1 cup (240ml)" },
  { name: "Dark Chocolate (70%+)", emoji: "🍫", description: "Rich in magnesium with antioxidants", nutrients: ["Magnesium", "Iron", "Copper", "Manganese", "Zinc", "Polyphenols"], benefits: ["Heart health", "Stress relief", "Antioxidant-rich", "Mood support"], serving: "1 oz (28g)" },
  { name: "Pumpkin Seeds", emoji: "🎃", description: "Highest magnesium content of any seed", nutrients: ["Magnesium", "Zinc", "Iron", "Copper", "Manganese", "Phosphorus"], benefits: ["Muscle function", "Sleep quality", "Immune support", "Blood sugar control"], serving: "1 oz (28g)" },
  { name: "Black Beans", emoji: "🫘", description: "Magnesium and potassium-rich legume", nutrients: ["Magnesium", "Potassium", "Iron", "Folate", "Fiber", "Protein"], benefits: ["Heart health", "Blood sugar control", "Digestive health", "Muscle function"], serving: "1 cup cooked (172g)" },
];

const MINERALS_BONE: Superfood[] = [
  { name: "Milk", emoji: "🥛", description: "Most bioavailable calcium dairy source", nutrients: ["Calcium", "Phosphorus", "Vitamin D", "Protein", "Vitamin B12", "Riboflavin"], benefits: ["Bone density", "Teeth strength", "Muscle contraction", "Nerve function"], serving: "1 cup (244ml)" },
  { name: "Greek Yogurt", emoji: "🥛", description: "High calcium probiotic dairy", nutrients: ["Calcium", "Phosphorus", "Protein", "Vitamin B12", "Probiotics", "Selenium"], benefits: ["Bone health", "Gut health", "Muscle support", "Immune support"], serving: "1 cup (245g)" },
  { name: "Parmesan Cheese", emoji: "🧀", description: "Highest calcium content of any cheese", nutrients: ["Calcium", "Phosphorus", "Protein", "Vitamin A", "Zinc", "Vitamin K2"], benefits: ["Bone density", "Teeth health", "Muscle support", "Low lactose"], serving: "1 oz (28g)" },
  { name: "Sardines (with bones)", emoji: "🐟", description: "Calcium-rich fish with edible bones", nutrients: ["Calcium", "Phosphorus", "Vitamin D", "Omega-3s", "Selenium", "Vitamin B12"], benefits: ["Bone health", "Heart health", "Anti-inflammatory", "Convenient protein"], serving: "3 oz (85g)" },
  { name: "Kale", emoji: "🤬", description: "Best non-dairy plant source of calcium", nutrients: ["Calcium", "Vitamin K", "Vitamin C", "Magnesium", "Manganese", "Folate"], benefits: ["Bone density", "Heart health", "Cancer prevention", "Anti-inflammatory"], serving: "1 cup raw (67g)" },
  { name: "Broccoli", emoji: "🥦", description: "Calcium and phosphorus cruciferous vegetable", nutrients: ["Calcium", "Phosphorus", "Vitamin C", "Vitamin K", "Folate", "Fiber"], benefits: ["Bone health", "Immune support", "Cancer prevention", "Digestive health"], serving: "1 cup chopped (91g)" },
  { name: "Almonds", emoji: "🥜", description: "Best nut for calcium intake", nutrients: ["Calcium", "Magnesium", "Phosphorus", "Vitamin E", "Fiber", "Protein"], benefits: ["Bone strength", "Heart health", "Blood sugar control", "Antioxidant-rich"], serving: "1 oz (28g)" },
  { name: "Edamame", emoji: "🫛", description: "Calcium and phosphorus-rich soy", nutrients: ["Calcium", "Phosphorus", "Magnesium", "Protein", "Fiber", "Folate"], benefits: ["Bone health", "Plant-based calcium", "Muscle support", "Heart health"], serving: "1 cup (155g)" },
];

const MINERALS_TRACE: Superfood[] = [
  { name: "Oysters", emoji: "🐚", description: "Highest zinc and copper food source", nutrients: ["Zinc", "Copper", "Selenium", "Iron", "Vitamin B12", "Omega-3s"], benefits: ["Immune function", "Wound healing", "Fertility support", "Antioxidant-rich"], serving: "3 oz (85g)" },
  { name: "Beef (Sirloin)", emoji: "🥩", description: "Richest source of heme iron and zinc", nutrients: ["Iron", "Zinc", "Selenium", "Vitamin B12", "Creatine", "Phosphorus"], benefits: ["Red blood cell formation", "Immune support", "Muscle building", "Energy production"], serving: "3 oz (85g)" },
  { name: "Spinach", emoji: "🤬", description: "Iron-rich leafy green (non-heme)", nutrients: ["Iron", "Calcium", "Magnesium", "Vitamin C", "Folate", "Vitamin K"], benefits: ["Anemia prevention", "Immune support", "Bone health", "Energy production"], serving: "1 cup cooked (180g)" },
  { name: "Lentils", emoji: "🥣", description: "Best plant source of iron and manganese", nutrients: ["Iron", "Manganese", "Folate", "Copper", "Phosphorus", "Fiber"], benefits: ["Iron for vegetarians", "Blood health", "Heart health", "Digestive health"], serving: "1 cup cooked (198g)" },
  { name: "Brazil Nuts", emoji: "🥜", description: "Highest selenium food — just 1-2 per day", nutrients: ["Selenium", "Magnesium", "Phosphorus", "Copper", "Manganese", "Zinc"], benefits: ["Thyroid function", "Antioxidant protection", "Immune support", "Mood regulation"], serving: "1 oz / 6 nuts (28g)" },
  { name: "Salmon", emoji: "🐟", description: "Selenium and iodine-rich fatty fish", nutrients: ["Selenium", "Iodine", "Phosphorus", "Potassium", "Magnesium", "Vitamin D"], benefits: ["Thyroid support", "Heart health", "Brain function", "Anti-inflammatory"], serving: "3 oz (85g)" },
  { name: "Shiitake Mushrooms", emoji: "🍄", description: "Rich in copper, manganese and selenium", nutrients: ["Copper", "Manganese", "Selenium", "Zinc", "Vitamin B5", "Fiber"], benefits: ["Immune support", "Antioxidant protection", "Heart health", "Anti-inflammatory"], serving: "1 cup cooked (145g)" },
  { name: "Cashews", emoji: "🥜", description: "High in copper and manganese", nutrients: ["Copper", "Manganese", "Magnesium", "Phosphorus", "Iron", "Zinc"], benefits: ["Nerve function", "Bone health", "Immune support", "Energy production"], serving: "1 oz (28g)" },
  { name: "Cod", emoji: "🐟", description: "Richest common food source of iodine", nutrients: ["Iodine", "Selenium", "Protein", "Phosphorus", "Vitamin B12", "Niacin"], benefits: ["Thyroid function", "Metabolism support", "Brain development", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Seaweed (Nori)", emoji: "🌿", description: "Ocean plant packed with iodine and trace minerals", nutrients: ["Iodine", "Manganese", "Iron", "Calcium", "Magnesium", "Omega-3s"], benefits: ["Thyroid support", "Gut health", "Antioxidant-rich", "Anti-inflammatory"], serving: "1 sheet / 2.5g" },
];

const MINERALS_ALL: Superfood[] = [...MINERALS_ELECTROLYTES, ...MINERALS_BONE, ...MINERALS_TRACE];

function LearnPage() {
  // Filter nutrients based on search
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'alphabetical' | 'category' | 'carbohydrates' | 'proteins' | 'fats' | 'vitamins' | 'minerals' | 'superfoods'>('category');
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
            <button onClick={() => setView('fats')} className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'fats' ? 'bg-amber-900 text-white dark:bg-amber-100 dark:text-amber-900' : 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-800 dark:text-amber-300 dark:hover:bg-amber-700'}`}>Healthy Fats</button>
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
        // Carbohydrates View
        <div>
          <div className="mb-6 rounded-xl bg-blue-50 p-6 dark:bg-blue-950/30">
            <h2 className="mb-2 text-2xl font-bold">🍞 Carbohydrates</h2>
            <p className="text-zinc-700 dark:text-zinc-300">Foods rich in carbohydrates, grouped by type</p>
          </div>

          <div className="space-y-10">
            {/* Whole Grains */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🌾 Whole Grains</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CARBS_GRAINS.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(CARBS_ALL, CARBS_ALL.findIndex(f => f.name === food.name))} />
                ))}
              </div>
            </div>

            {/* Legumes */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🫘 Legumes & Beans</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CARBS_LEGUMES.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(CARBS_ALL, CARBS_ALL.findIndex(f => f.name === food.name))} />
                ))}
              </div>
            </div>

            {/* Starchy Vegetables */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🥔 Starchy Vegetables</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CARBS_STARCHY_VEG.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(CARBS_ALL, CARBS_ALL.findIndex(f => f.name === food.name))} />
                ))}
              </div>
            </div>

            {/* Fruits */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🍎 Fruits</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CARBS_FRUITS.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(CARBS_ALL, CARBS_ALL.findIndex(f => f.name === food.name))} />
                ))}
              </div>
            </div>
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
        ) : view === 'fats' ? (
        // Healthy Fats View — grouped by sub-category
        <div>
          <div className="mb-6 rounded-xl bg-amber-50 p-6 dark:bg-amber-950/30">
            <h2 className="mb-2 text-2xl font-bold">🥑 Healthy Fats</h2>
            <p className="text-zinc-700 dark:text-zinc-300">Foods rich in healthy fats, grouped by type</p>
          </div>

          <div className="space-y-10">
            {/* Whole Food Fats */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🫒 Whole Food Fats & Oils</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FATS_WHOLE.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(FATS_ALL, FATS_ALL.findIndex(f => f.name === food.name))} />
                ))}
              </div>
            </div>

            {/* Nuts & Seeds */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🥜 Nuts & Seeds</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FATS_NUTS_SEEDS.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(FATS_ALL, FATS_ALL.findIndex(f => f.name === food.name))} />
                ))}
              </div>
            </div>

            {/* Fatty Fish */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🐟 Fatty Fish</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FATS_FISH.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(FATS_ALL, FATS_ALL.findIndex(f => f.name === food.name))} />
                ))}
              </div>
            </div>

            {/* Dairy Fats */}
            <div>
              <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🧀 Dairy</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FATS_DAIRY.map((food) => (
                  <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(FATS_ALL, FATS_ALL.findIndex(f => f.name === food.name))} />
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
              <p className="text-zinc-700 dark:text-zinc-300">Foods rich in vitamins, grouped by type</p>
            </div>

            <div className="space-y-10">
              {/* Fat-Soluble: A, D, E, K */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">☀️ Fat-Soluble Vitamins (A, D, E, K)</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {VITAMINS_FAT_SOLUBLE.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(VITAMINS_ALL, VITAMINS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* B Vitamins */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">⚡ B Vitamins (B1, B2, B3, B5, B6, B7, B9, B12)</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {VITAMINS_B.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(VITAMINS_ALL, VITAMINS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* Vitamin C */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🍊 Vitamin C</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {VITAMINS_C.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(VITAMINS_ALL, VITAMINS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : view === 'minerals' ? (
          // Minerals Food Sources View
          <div>
            <div className="mb-6 rounded-xl bg-yellow-50 p-6 dark:bg-yellow-950/30">
              <h2 className="mb-2 text-2xl font-bold">🪨 Minerals</h2>
              <p className="text-zinc-700 dark:text-zinc-300">Foods rich in minerals, grouped by type</p>
            </div>

            <div className="space-y-10">
              {/* Electrolytes */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">⚡ Electrolytes (Potassium, Magnesium, Sodium)</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {MINERALS_ELECTROLYTES.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(MINERALS_ALL, MINERALS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* Bone Minerals */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🦴 Bone Minerals (Calcium, Phosphorus)</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {MINERALS_BONE.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(MINERALS_ALL, MINERALS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* Trace Minerals */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🔬 Trace Minerals (Iron, Zinc, Selenium, Copper, Iodine)</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {MINERALS_TRACE.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(MINERALS_ALL, MINERALS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>
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

            <div className="space-y-10">
              {/* Leafy Greens & Cruciferous */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🥬 Leafy Greens &amp; Cruciferous</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {SUPERFOODS_GREENS.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(SUPERFOODS_ALL, SUPERFOODS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* Berries & Antioxidant Fruits */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🫐 Berries &amp; Antioxidant Fruits</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {SUPERFOODS_BERRIES.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(SUPERFOODS_ALL, SUPERFOODS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* Protein Powerhouses */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🥚 Protein Powerhouses</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {SUPERFOODS_PROTEIN.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(SUPERFOODS_ALL, SUPERFOODS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* Seeds, Nuts & Healthy Fats */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🌱 Seeds, Nuts &amp; Healthy Fats</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {SUPERFOODS_SEEDS_FATS.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(SUPERFOODS_ALL, SUPERFOODS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>

              {/* Functional & Adaptogenic */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-zinc-800 dark:text-zinc-100">🍵 Functional &amp; Adaptogenic</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {SUPERFOODS_FUNCTIONAL.map((food) => (
                    <SuperfoodCard key={food.name} superfood={food} onClick={() => openFood(SUPERFOODS_ALL, SUPERFOODS_ALL.findIndex(f => f.name === food.name))} />
                  ))}
                </div>
              </div>
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
