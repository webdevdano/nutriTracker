"use client";

import { useState } from "react";
import { getAllNutrientsAlphabetically, getNutrientsByCategory, type NutrientInfo } from "@/lib/nutrient-data";

// Sample food sources for each category

type Superfood = {
  name: string;
  emoji: string;
  description: string;
  nutrients: { name: string; amount: string }[];
  benefits: string[];
  serving: string;
};

const SUPERFOODS_GREENS: Superfood[] = [
  { name: "Spinach", emoji: "🥬", description: "Nutrient-dense leafy green powerhouse", nutrients: [{ name: "Iron", amount: "6.4mg" }, { name: "Calcium", amount: "245mg" }, { name: "Vitamin A", amount: "943mcg" }, { name: "Vitamin K", amount: "888mcg" }, { name: "Vitamin C", amount: "18mg" }, { name: "Folate", amount: "263mcg" }, { name: "Magnesium", amount: "157mg" }], benefits: ["Supports bone health", "Boosts immune system", "Improves eye health", "Rich in antioxidants"], serving: "1 cup cooked (180g)" },
  { name: "Kale", emoji: "🥗", description: "King of leafy greens — vitamin K champion", nutrients: [{ name: "Vitamin K", amount: "547mcg" }, { name: "Vitamin A", amount: "206mcg" }, { name: "Vitamin C", amount: "80mg" }, { name: "Calcium", amount: "101mg" }, { name: "Iron", amount: "1.1mg" }, { name: "Folate", amount: "19mcg" }, { name: "Manganese", amount: "0.5mg" }], benefits: ["Bone health", "Anti-inflammatory", "Cancer prevention", "Detoxification"], serving: "1 cup raw (67g)" },
  { name: "Broccoli", emoji: "🥦", description: "Cruciferous vegetable with cancer-fighting sulforaphane", nutrients: [{ name: "Vitamin C", amount: "81mg" }, { name: "Vitamin K", amount: "93mcg" }, { name: "Folate", amount: "57mcg" }, { name: "Fiber", amount: "2.4g" }, { name: "Potassium", amount: "288mg" }, { name: "Sulforaphane", amount: "~30mg" }], benefits: ["Cancer prevention", "Gut health", "Immune support", "Bone health"], serving: "1 cup chopped (91g)" },
  { name: "Swiss Chard", emoji: "🌿", description: "Colorful leafy green with exceptional mineral content", nutrients: [{ name: "Vitamin K", amount: "572mcg" }, { name: "Vitamin A", amount: "268mcg" }, { name: "Vitamin C", amount: "32mg" }, { name: "Magnesium", amount: "150mg" }, { name: "Iron", amount: "4mg" }, { name: "Potassium", amount: "961mg" }], benefits: ["Blood sugar control", "Bone health", "Antioxidant-rich", "Heart health"], serving: "1 cup cooked (175g)" },
  { name: "Brussels Sprouts", emoji: "🥦", description: "Mini cabbages packed with sulforaphane and vitamin K", nutrients: [{ name: "Vitamin K", amount: "219mcg" }, { name: "Vitamin C", amount: "97mg" }, { name: "Folate", amount: "94mcg" }, { name: "Fiber", amount: "4g" }, { name: "Potassium", amount: "495mg" }, { name: "Manganese", amount: "0.3mg" }], benefits: ["Cancer prevention", "Digestive health", "Heart health", "Immune support"], serving: "1 cup cooked (156g)" },
  { name: "Arugula", emoji: "🌿", description: "Peppery green high in nitrates for blood flow", nutrients: [{ name: "Vitamin K", amount: "109mcg" }, { name: "Vitamin A", amount: "95mcg" }, { name: "Folate", amount: "39mcg" }, { name: "Calcium", amount: "160mg" }, { name: "Nitrates", amount: "480mg" }, { name: "Vitamin C", amount: "6mg" }], benefits: ["Exercise performance", "Blood pressure support", "Eye health", "Anti-inflammatory"], serving: "2 cups raw (80g)" },
  { name: "Watercress", emoji: "🌿", description: "Most nutrient-dense food per calorie according to CDC", nutrients: [{ name: "Vitamin K", amount: "113mcg" }, { name: "Vitamin C", amount: "28mg" }, { name: "Vitamin A", amount: "66mcg" }, { name: "Calcium", amount: "103mg" }, { name: "PEITC", amount: "~5mg" }, { name: "Iodine", amount: "14mcg" }], benefits: ["Highest nutrient density of any food", "Cancer prevention", "Bone health", "Thyroid support"], serving: "2 cups (68g)" },
  { name: "Bok Choy", emoji: "🥬", description: "Asian cruciferous green with calcium and vitamins", nutrients: [{ name: "Vitamin A", amount: "361mcg" }, { name: "Vitamin C", amount: "44mg" }, { name: "Vitamin K", amount: "57mcg" }, { name: "Calcium", amount: "158mg" }, { name: "Folate", amount: "70mcg" }, { name: "Potassium", amount: "630mg" }], benefits: ["Bone health", "Immune support", "Anti-inflammatory", "Low calorie"], serving: "1 cup cooked (170g)" },
];

const SUPERFOODS_BERRIES: Superfood[] = [
  { name: "Blueberries", emoji: "🫐", description: "Highest antioxidant fruit — brain food", nutrients: [{ name: "Anthocyanins", amount: "180mg" }, { name: "Vitamin C", amount: "14mg" }, { name: "Vitamin K", amount: "29mcg" }, { name: "Fiber", amount: "3.6g" }, { name: "Manganese", amount: "0.5mg" }, { name: "Pterostilbene", amount: "~0.1mg" }], benefits: ["Memory improvement", "Brain health", "Anti-aging", "Heart health"], serving: "1 cup (148g)" },
  { name: "Pomegranate", emoji: "🍎", description: "Seeds bursting with punicalagin antioxidants", nutrients: [{ name: "Punicalagins", amount: "250mg" }, { name: "Vitamin C", amount: "9mg" }, { name: "Folate", amount: "33mcg" }, { name: "Potassium", amount: "205mg" }, { name: "Fiber", amount: "3.5g" }, { name: "Vitamin K", amount: "14mcg" }], benefits: ["Strongest antioxidant of any fruit", "Heart health", "Anti-inflammatory", "Cancer prevention"], serving: "1/2 cup seeds (87g)" },
  { name: "Acai", emoji: "🍇", description: "Amazonian berry with massive antioxidant score", nutrients: [{ name: "Anthocyanins", amount: "320mg" }, { name: "Healthy Fats", amount: "5g" }, { name: "Fiber", amount: "2g" }, { name: "Iron", amount: "0.7mg" }, { name: "Calcium", amount: "35mg" }, { name: "Vitamin A", amount: "76mcg" }], benefits: ["Highest ORAC score of any food", "Heart health", "Brain health", "Anti-aging"], serving: "100g pulp" },
  { name: "Tart Cherries", emoji: "🍒", description: "Only natural food source of melatonin", nutrients: [{ name: "Melatonin", amount: "13mcg" }, { name: "Anthocyanins", amount: "82mg" }, { name: "Vitamin C", amount: "10mg" }, { name: "Potassium", amount: "306mg" }, { name: "Fiber", amount: "2.5g" }, { name: "Quercetin", amount: "6mg" }], benefits: ["Sleep quality", "Muscle recovery", "Reduced DOMS", "Anti-inflammatory"], serving: "1 cup (138g)" },
  { name: "Goji Berries", emoji: "🫐", description: "Ancient Chinese superfood with zeaxanthin", nutrients: [{ name: "Zeaxanthin", amount: "11mg" }, { name: "Vitamin A", amount: "140mcg" }, { name: "Vitamin C", amount: "3mg" }, { name: "Iron", amount: "1.5mg" }, { name: "Protein", amount: "3g" }, { name: "Fiber", amount: "1.8g" }], benefits: ["Eye health", "Immune support", "Blood sugar control", "Anti-aging"], serving: "1 oz dried (28g)" },
  { name: "Raspberries", emoji: "🫐", description: "High-fiber berry with powerful ellagic acid", nutrients: [{ name: "Fiber", amount: "8g" }, { name: "Vitamin C", amount: "32mg" }, { name: "Manganese", amount: "0.8mg" }, { name: "Ellagic Acid", amount: "15mg" }, { name: "Vitamin K", amount: "10mcg" }, { name: "Folate", amount: "26mcg" }], benefits: ["Highest fiber berry", "Cancer prevention", "Blood sugar control", "Heart health"], serving: "1 cup (123g)" },
  { name: "Elderberries", emoji: "🫐", description: "Most studied berry for immune defense", nutrients: [{ name: "Anthocyanins", amount: "726mg" }, { name: "Vitamin C", amount: "52mg" }, { name: "Fiber", amount: "10g" }, { name: "Potassium", amount: "406mg" }, { name: "Quercetin", amount: "12mg" }, { name: "Vitamin A", amount: "30mcg" }], benefits: ["Reduces cold/flu duration", "Antiviral properties", "Immune modulation", "Antioxidant-rich"], serving: "1 cup (145g) or extract" },
];

const SUPERFOODS_PROTEIN: Superfood[] = [
  { name: "Salmon", emoji: "🐟", description: "Omega-3 rich fatty fish — brain and heart superfood", nutrients: [{ name: "Omega-3s", amount: "1.8g" }, { name: "Protein", amount: "22g" }, { name: "Vitamin D", amount: "447 IU" }, { name: "Vitamin B12", amount: "2.6mcg" }, { name: "Selenium", amount: "36mcg" }, { name: "Astaxanthin", amount: "3.6mg" }], benefits: ["Heart health", "Brain function", "Reduces inflammation", "Muscle repair"], serving: "3 oz (85g)" },
  { name: "Eggs", emoji: "🥚", description: "Most nutrient-complete whole food available", nutrients: [{ name: "Protein", amount: "6g" }, { name: "Choline", amount: "147mg" }, { name: "Vitamin D", amount: "44 IU" }, { name: "Vitamin B12", amount: "0.6mcg" }, { name: "Selenium", amount: "15mcg" }, { name: "Lutein", amount: "252mcg" }], benefits: ["Brain health via choline", "Eye health", "Muscle building", "Hormone production"], serving: "1 large egg (50g)" },
  { name: "Greek Yogurt", emoji: "🥛", description: "Probiotic-rich protein food for gut and muscles", nutrients: [{ name: "Protein", amount: "23g" }, { name: "Probiotics", amount: "1B+ CFU" }, { name: "Calcium", amount: "257mg" }, { name: "Vitamin B12", amount: "1.3mcg" }, { name: "Phosphorus", amount: "246mg" }, { name: "Selenium", amount: "9mcg" }], benefits: ["Gut microbiome support", "Bone strength", "Muscle building", "Immune support"], serving: "1 cup (245g)" },
  { name: "Sardines", emoji: "🐟", description: "Tiny fish with bone-in calcium and omega-3s", nutrients: [{ name: "Omega-3s", amount: "1.3g" }, { name: "Calcium", amount: "325mg" }, { name: "Vitamin D", amount: "164 IU" }, { name: "Vitamin B12", amount: "4.8mcg" }, { name: "Selenium", amount: "45mcg" }, { name: "Protein", amount: "21g" }], benefits: ["Bone health", "Heart health", "Brain function", "Sustainable seafood"], serving: "3 oz (85g)" },
  { name: "Beef Liver", emoji: "🥩", description: "Most nutrient-dense organ meat — nature's multivitamin", nutrients: [{ name: "Vitamin A", amount: "6,582mcg" }, { name: "Vitamin B12", amount: "70mcg" }, { name: "Iron", amount: "5.2mg" }, { name: "Copper", amount: "12mg" }, { name: "Folate", amount: "215mcg" }, { name: "CoQ10", amount: "~3mg" }], benefits: ["Highest vitamin A food", "Energy production", "Red blood cell formation", "Immune function"], serving: "3 oz (85g)" },
  { name: "Mackerel", emoji: "🐟", description: "Fatty fish with more omega-3s than salmon", nutrients: [{ name: "Omega-3s", amount: "2.6g" }, { name: "Vitamin D", amount: "388 IU" }, { name: "Vitamin B12", amount: "16mcg" }, { name: "Selenium", amount: "44mcg" }, { name: "Protein", amount: "20g" }, { name: "Niacin", amount: "6mg" }], benefits: ["Heart health", "Anti-inflammatory", "Brain function", "Thyroid support"], serving: "3 oz (85g)" },
];

const SUPERFOODS_SEEDS_FATS: Superfood[] = [
  { name: "Chia Seeds", emoji: "🌱", description: "Tiny seeds with the most omega-3s of any plant food", nutrients: [{ name: "Omega-3 ALA", amount: "5.1g" }, { name: "Fiber", amount: "10g" }, { name: "Protein", amount: "4.7g" }, { name: "Calcium", amount: "179mg" }, { name: "Magnesium", amount: "95mg" }, { name: "Phosphorus", amount: "244mg" }], benefits: ["Digestive health", "Heart health", "Bone strength", "Blood sugar control"], serving: "2 tbsp (28g)" },
  { name: "Avocado", emoji: "🥑", description: "Healthy fat powerhouse with the most potassium of any fruit", nutrients: [{ name: "Monounsaturated Fat", amount: "10g" }, { name: "Potassium", amount: "485mg" }, { name: "Fiber", amount: "6.7g" }, { name: "Vitamin E", amount: "2.1mg" }, { name: "Vitamin K", amount: "21mcg" }, { name: "Folate", amount: "81mcg" }], benefits: ["Heart health", "Fat-soluble nutrient absorption", "Satiety", "Skin health"], serving: "1/2 avocado (100g)" },
  { name: "Walnuts", emoji: "🥜", description: "Only nut with significant ALA omega-3s", nutrients: [{ name: "Omega-3 ALA", amount: "2.6g" }, { name: "Polyphenols", amount: "70mg" }, { name: "Magnesium", amount: "45mg" }, { name: "Phosphorus", amount: "98mg" }, { name: "Copper", amount: "0.4mg" }, { name: "Protein", amount: "4.3g" }], benefits: ["Brain health", "Anti-inflammatory", "Heart health", "Gut microbiome support"], serving: "1 oz (28g)" },
  { name: "Flaxseeds", emoji: "🌾", description: "Richest plant source of lignans and omega-3 ALA", nutrients: [{ name: "Omega-3 ALA", amount: "3.2g" }, { name: "Lignans", amount: "85mg" }, { name: "Fiber", amount: "3.8g" }, { name: "Magnesium", amount: "55mg" }, { name: "Phosphorus", amount: "90mg" }, { name: "Thiamine", amount: "0.3mg" }], benefits: ["Hormone balance", "Heart health", "Digestive health", "Cancer prevention via lignans"], serving: "2 tbsp ground (14g)" },
  { name: "Hemp Seeds", emoji: "🌿", description: "Only seed with perfect 3:1 omega-6 to omega-3 ratio", nutrients: [{ name: "Protein", amount: "9.5g" }, { name: "Omega-3 ALA", amount: "2.5g" }, { name: "Magnesium", amount: "120mg" }, { name: "Zinc", amount: "3mg" }, { name: "Iron", amount: "2mg" }, { name: "GLA", amount: "375mg" }], benefits: ["Ideal omega ratio", "Complete plant protein", "Skin health", "Heart health"], serving: "3 tbsp (30g)" },
  { name: "Extra Virgin Olive Oil", emoji: "🫒", description: "Mediterranean staple with oleocanthal anti-inflammatory", nutrients: [{ name: "Monounsaturated Fat", amount: "10g" }, { name: "Oleocanthal", amount: "~200mg" }, { name: "Polyphenols", amount: "36mg" }, { name: "Vitamin E", amount: "1.9mg" }, { name: "Vitamin K", amount: "8.1mcg" }, { name: "Squalene", amount: "~100mg" }], benefits: ["Heart health", "Anti-inflammatory", "Brain health", "Cancer prevention"], serving: "1 tbsp (14g)" },
];

const SUPERFOODS_FUNCTIONAL: Superfood[] = [
  { name: "Turmeric", emoji: "🟡", description: "Golden spice with curcumin — most studied anti-inflammatory", nutrients: [{ name: "Curcumin", amount: "~200mg" }, { name: "Manganese", amount: "0.4mg" }, { name: "Iron", amount: "0.9mg" }, { name: "Potassium", amount: "56mg" }, { name: "Fiber", amount: "0.2g" }, { name: "Vitamin C", amount: "0.5mg" }], benefits: ["Anti-inflammatory", "Joint pain relief", "Brain health", "Cancer prevention"], serving: "1 tsp (3g) with black pepper" },
  { name: "Ginger", emoji: "🫚", description: "Root with gingerol — anti-nausea and inflammation fighter", nutrients: [{ name: "Gingerol", amount: "~1mg" }, { name: "Shogaol", amount: "~0.5mg" }, { name: "Magnesium", amount: "2mg" }, { name: "Potassium", amount: "32mg" }, { name: "Vitamin C", amount: "0.5mg" }, { name: "Manganese", amount: "0.03mg" }], benefits: ["Nausea relief", "Anti-inflammatory", "Digestive health", "Muscle recovery"], serving: "1 tsp fresh grated (5g)" },
  { name: "Garlic", emoji: "🧄", description: "Allicin-rich immune and cardiovascular superfood", nutrients: [{ name: "Allicin", amount: "~8mg" }, { name: "Alliin", amount: "~6mg" }, { name: "Vitamin C", amount: "2mg" }, { name: "Manganese", amount: "0.1mg" }, { name: "Selenium", amount: "1.4mcg" }, { name: "Vitamin B6", amount: "0.1mg" }], benefits: ["Antibiotic properties", "Immune support", "Blood pressure reduction", "Heart health"], serving: "2 cloves (6g)" },
  { name: "Matcha", emoji: "🍵", description: "Whole-leaf green tea with L-theanine calm energy", nutrients: [{ name: "EGCG", amount: "54mg" }, { name: "L-theanine", amount: "19mg" }, { name: "Catechins", amount: "105mg" }, { name: "Caffeine", amount: "34mg" }, { name: "Chlorophyll", amount: "2mg" }, { name: "Vitamin C", amount: "12mg" }], benefits: ["Calm alertness via L-theanine", "Fat burning", "Cancer prevention via EGCG", "Detoxification via chlorophyll"], serving: "1 tsp powder (2g)" },
  { name: "Spirulina", emoji: "🟢", description: "Blue-green algae with the most protein per gram of any food", nutrients: [{ name: "Protein", amount: "4g" }, { name: "Phycocyanin", amount: "700mg" }, { name: "Iron", amount: "2mg" }, { name: "Vitamin B12", amount: "0.3mcg" }, { name: "Beta-Carotene", amount: "570mcg" }, { name: "GLA", amount: "65mg" }], benefits: ["Highest protein density", "Heavy metal detoxification", "Energy boost", "Anti-inflammatory"], serving: "1 tbsp (7g)" },
  { name: "Lion's Mane Mushroom", emoji: "🍄", description: "Functional mushroom that stimulates nerve growth factor", nutrients: [{ name: "Hericenones", amount: "~5mg" }, { name: "Erinacines", amount: "~3mg" }, { name: "Beta-Glucans", amount: "2g" }, { name: "Copper", amount: "0.4mg" }, { name: "Selenium", amount: "3.6mcg" }, { name: "Zinc", amount: "0.5mg" }], benefits: ["Nerve growth factor stimulation", "Memory improvement", "Anxiety reduction", "Immune support"], serving: "1 cup cooked (70g)" },
  { name: "Kimchi", emoji: "🥬", description: "Korean fermented cabbage with trillions of probiotics", nutrients: [{ name: "Probiotics", amount: "1B+ CFU" }, { name: "Vitamin C", amount: "7mg" }, { name: "Vitamin K", amount: "24mcg" }, { name: "Folate", amount: "25mcg" }, { name: "Iron", amount: "0.5mg" }, { name: "Capsaicin", amount: "~2mg" }], benefits: ["Gut microbiome diversity", "Immune support", "Weight management", "Anti-inflammatory"], serving: "1/2 cup (75g)" },
  { name: "Raw Cacao", emoji: "🍫", description: "Purest form of chocolate — highest magnesium food", nutrients: [{ name: "Magnesium", amount: "27mg" }, { name: "Iron", amount: "1.1mg" }, { name: "Flavanols", amount: "~200mg" }, { name: "Copper", amount: "0.2mg" }, { name: "Manganese", amount: "0.2mg" }, { name: "Theobromine", amount: "~100mg" }], benefits: ["Heart health", "Mood improvement via theobromine", "Blood pressure reduction", "Antioxidant-rich"], serving: "1 tbsp powder (7g)" },
];

const SUPERFOODS_ALL: Superfood[] = [...SUPERFOODS_GREENS, ...SUPERFOODS_BERRIES, ...SUPERFOODS_PROTEIN, ...SUPERFOODS_SEEDS_FATS, ...SUPERFOODS_FUNCTIONAL];

const SUPERFOODS: Superfood[] = SUPERFOODS_ALL;

const allNutrients = getAllNutrientsAlphabetically();

const CARBS_GRAINS: Superfood[] = [
  { name: "Oats", emoji: "🌾", description: "Cholesterol-lowering beta-glucan grain", nutrients: [{ name: "Carbohydrates", amount: "27g" }, { name: "Beta-Glucan", amount: "3g" }, { name: "Fiber", amount: "4g" }, { name: "Protein", amount: "6g" }, { name: "Magnesium", amount: "63mg" }, { name: "Zinc", amount: "2.1mg" }], benefits: ["Lowers LDL cholesterol", "Blood sugar stability", "Sustained energy", "Gut health"], serving: "1 cup cooked (156g)" },
  { name: "Brown Rice", emoji: "🍚", description: "Whole grain with selenium and manganese", nutrients: [{ name: "Carbohydrates", amount: "45g" }, { name: "Fiber", amount: "3.5g" }, { name: "Magnesium", amount: "84mg" }, { name: "Phosphorus", amount: "162mg" }, { name: "Selenium", amount: "14mcg" }, { name: "Manganese", amount: "1.8mg" }], benefits: ["Sustained energy", "Digestive health", "Manganese source", "Gluten-free"], serving: "1 cup cooked (195g)" },
  { name: "Quinoa", emoji: "🌱", description: "Complete protein pseudo-grain with all 9 amino acids", nutrients: [{ name: "Carbohydrates", amount: "39g" }, { name: "Protein", amount: "8g" }, { name: "Fiber", amount: "5g" }, { name: "Magnesium", amount: "118mg" }, { name: "Iron", amount: "2.8mg" }, { name: "Zinc", amount: "2mg" }], benefits: ["Complete amino acid profile", "Blood sugar control", "Digestive health", "Muscle support"], serving: "1 cup cooked (185g)" },
  { name: "Buckwheat", emoji: "🌿", description: "Seed-grain with rutin for blood vessel health", nutrients: [{ name: "Carbohydrates", amount: "33g" }, { name: "Fiber", amount: "4.5g" }, { name: "Magnesium", amount: "86mg" }, { name: "Manganese", amount: "0.6mg" }, { name: "Copper", amount: "0.2mg" }, { name: "Rutin", amount: "~50mg" }], benefits: ["Blood vessel strength via rutin", "Gluten-free", "Heart health", "Blood sugar control"], serving: "1 cup cooked (168g)" },
  { name: "Barley", emoji: "🌾", description: "Highest beta-glucan of all whole grains", nutrients: [{ name: "Carbohydrates", amount: "44g" }, { name: "Beta-Glucan", amount: "3g" }, { name: "Fiber", amount: "6g" }, { name: "Selenium", amount: "13mcg" }, { name: "Manganese", amount: "0.4mg" }, { name: "Phosphorus", amount: "85mg" }], benefits: ["Highest fiber grain", "Cholesterol reduction", "Blood sugar stability", "Prebiotic fiber"], serving: "1 cup cooked (157g)" },
  { name: "Farro", emoji: "🌾", description: "Ancient wheat grain with chewy texture and rich nutrition", nutrients: [{ name: "Carbohydrates", amount: "42g" }, { name: "Fiber", amount: "7g" }, { name: "Protein", amount: "8g" }, { name: "Magnesium", amount: "50mg" }, { name: "Zinc", amount: "1.5mg" }, { name: "Iron", amount: "1.4mg" }], benefits: ["High fiber", "Heart health", "Blood sugar control", "Satiety"], serving: "1 cup cooked (200g)" },
  { name: "Wild Rice", emoji: "🌾", description: "Native American grain — technically a grass seed", nutrients: [{ name: "Carbohydrates", amount: "35g" }, { name: "Protein", amount: "6.5g" }, { name: "Fiber", amount: "3g" }, { name: "Manganese", amount: "0.4mg" }, { name: "Phosphorus", amount: "134mg" }, { name: "Zinc", amount: "2.2mg" }], benefits: ["High protein for a grain", "Antioxidant-rich", "Gluten-free", "Blood sugar stability"], serving: "1 cup cooked (164g)" },
  { name: "Corn / Grits", emoji: "🌽", description: "Whole corn with lutein for eye health and sustained energy", nutrients: [{ name: "Carbohydrates", amount: "41g" }, { name: "Fiber", amount: "2.3g" }, { name: "Magnesium", amount: "25mg" }, { name: "Lutein", amount: "580mcg" }, { name: "Thiamine", amount: "0.2mg" }, { name: "Vitamin C", amount: "0.4mg" }], benefits: ["Eye health via lutein", "Energy supply", "Digestive health", "Gluten-free"], serving: "1 cup cooked (154g)" },
];

const CARBS_LEGUMES: Superfood[] = [
  { name: "Black Beans", emoji: "🫘", description: "Fiber and protein champion with folate", nutrients: [{ name: "Carbohydrates", amount: "41g" }, { name: "Fiber", amount: "15g" }, { name: "Protein", amount: "15g" }, { name: "Folate", amount: "256mcg" }, { name: "Magnesium", amount: "120mg" }, { name: "Iron", amount: "3.6mg" }], benefits: ["Digestive health", "Blood sugar control", "Heart health", "Muscle building"], serving: "1 cup cooked (172g)" },
  { name: "Chickpeas", emoji: "🫘", description: "Versatile legume high in folate and plant protein", nutrients: [{ name: "Carbohydrates", amount: "45g" }, { name: "Protein", amount: "15g" }, { name: "Fiber", amount: "12g" }, { name: "Folate", amount: "282mcg" }, { name: "Iron", amount: "4.7mg" }, { name: "Manganese", amount: "1.7mg" }], benefits: ["Satiety", "Blood sugar regulation", "Heart health", "Bone health"], serving: "1 cup cooked (164g)" },
  { name: "Kidney Beans", emoji: "🫘", description: "Red beans high in potassium, fiber, and plant protein", nutrients: [{ name: "Carbohydrates", amount: "40g" }, { name: "Fiber", amount: "13g" }, { name: "Protein", amount: "15g" }, { name: "Iron", amount: "3.9mg" }, { name: "Folate", amount: "229mcg" }, { name: "Potassium", amount: "713mg" }], benefits: ["Heart health", "Iron for energy", "Digestive health", "Blood sugar stability"], serving: "1 cup cooked (177g)" },
  { name: "Lentils", emoji: "🫙", description: "Fastest-cooking legume with most iron of any plant food", nutrients: [{ name: "Carbohydrates", amount: "40g" }, { name: "Fiber", amount: "15.6g" }, { name: "Protein", amount: "18g" }, { name: "Iron", amount: "6.6mg" }, { name: "Folate", amount: "358mcg" }, { name: "Manganese", amount: "1mg" }], benefits: ["Highest plant iron", "Blood sugar stability", "Heart health", "Anemia prevention"], serving: "1 cup cooked (198g)" },
  { name: "Edamame", emoji: "🫛", description: "Whole soybeans with complete plant protein and folate", nutrients: [{ name: "Carbohydrates", amount: "14g" }, { name: "Protein", amount: "17g" }, { name: "Fiber", amount: "8g" }, { name: "Folate", amount: "482mcg" }, { name: "Vitamin K", amount: "33mcg" }, { name: "Magnesium", amount: "99mg" }], benefits: ["Complete plant protein", "Bone health", "Heart health", "Hormonal balance"], serving: "1 cup (155g)" },
  { name: "Green Peas", emoji: "🟢", description: "Sweet legume with thiamine and fiber", nutrients: [{ name: "Carbohydrates", amount: "25g" }, { name: "Fiber", amount: "8.8g" }, { name: "Vitamin C", amount: "23mg" }, { name: "Vitamin K", amount: "41mcg" }, { name: "Thiamine", amount: "0.4mg" }, { name: "Folate", amount: "101mcg" }], benefits: ["Digestive health", "Immune support", "Vision health", "Blood clotting"], serving: "1 cup cooked (160g)" },
  { name: "Pinto Beans", emoji: "🫘", description: "Most consumed bean in the US — folate and fiber rich", nutrients: [{ name: "Carbohydrates", amount: "45g" }, { name: "Fiber", amount: "15g" }, { name: "Protein", amount: "15g" }, { name: "Folate", amount: "294mcg" }, { name: "Manganese", amount: "0.8mg" }, { name: "Phosphorus", amount: "251mg" }], benefits: ["Digestive health", "Folate for cell growth", "Blood sugar stability", "Bone health"], serving: "1 cup cooked (171g)" },
  { name: "Navy Beans", emoji: "🤍", description: "Highest fiber bean — great for gut microbiome", nutrients: [{ name: "Carbohydrates", amount: "47g" }, { name: "Fiber", amount: "19g" }, { name: "Protein", amount: "15g" }, { name: "Folate", amount: "255mcg" }, { name: "Manganese", amount: "1mg" }, { name: "Thiamine", amount: "0.4mg" }], benefits: ["Highest fiber legume", "Prebiotic for gut health", "Heart health", "Blood sugar control"], serving: "1 cup cooked (182g)" },
];

const CARBS_STARCHY_VEG: Superfood[] = [
  { name: "Sweet Potato", emoji: "🍠", description: "Beta-carotene superstar with slow-release carbs", nutrients: [{ name: "Carbohydrates", amount: "27g" }, { name: "Vitamin A", amount: "961mcg" }, { name: "Vitamin C", amount: "22mg" }, { name: "Fiber", amount: "3.8g" }, { name: "Potassium", amount: "542mg" }, { name: "Manganese", amount: "0.3mg" }], benefits: ["Eye health via beta-carotene", "Immune support", "Blood sugar stability", "Heart health"], serving: "1 medium (150g)" },
  { name: "Beets", emoji: "🫚", description: "Nitrate-rich root for athletic performance", nutrients: [{ name: "Carbohydrates", amount: "17g" }, { name: "Folate", amount: "136mcg" }, { name: "Manganese", amount: "0.5mg" }, { name: "Potassium", amount: "518mg" }, { name: "Nitrates", amount: "~300mg" }, { name: "Vitamin C", amount: "6mg" }], benefits: ["Exercise endurance via nitrates", "Blood pressure reduction", "Liver detoxification", "Brain health"], serving: "1 cup cooked (170g)" },
  { name: "White Potato", emoji: "🥔", description: "Misunderstood potato — potassium king and satiety champion", nutrients: [{ name: "Carbohydrates", amount: "37g" }, { name: "Potassium", amount: "897mg" }, { name: "Vitamin C", amount: "17mg" }, { name: "Vitamin B6", amount: "0.5mg" }, { name: "Fiber", amount: "3.8g" }, { name: "Resistant Starch", amount: "~3g" }], benefits: ["Most satiating food tested", "Heart health via potassium", "Gut health via resistant starch", "Brain function via B6"], serving: "1 medium with skin (213g)" },
  { name: "Pumpkin", emoji: "🎃", description: "Highest beta-carotene vegetable for immune function", nutrients: [{ name: "Carbohydrates", amount: "12g" }, { name: "Vitamin A", amount: "1,906mcg" }, { name: "Vitamin C", amount: "11mg" }, { name: "Fiber", amount: "2.7g" }, { name: "Potassium", amount: "564mg" }, { name: "Beta-Carotene", amount: "11,400mcg" }], benefits: ["Immune support via beta-carotene", "Eye health", "Heart health", "Low calorie"], serving: "1 cup cooked (245g)" },
  { name: "Butternut Squash", emoji: "🥕", description: "Winter squash with vitamin A and potassium", nutrients: [{ name: "Carbohydrates", amount: "22g" }, { name: "Vitamin A", amount: "1,144mcg" }, { name: "Vitamin C", amount: "29mg" }, { name: "Fiber", amount: "3g" }, { name: "Magnesium", amount: "55mg" }, { name: "Potassium", amount: "582mg" }], benefits: ["Eye health", "Immune support", "Blood pressure regulation", "Anti-inflammatory"], serving: "1 cup cubed (205g)" },
  { name: "Carrots", emoji: "🥕", description: "Highest beta-carotene vegetable — vision protector", nutrients: [{ name: "Carbohydrates", amount: "12g" }, { name: "Beta-Carotene", amount: "10,600mcg" }, { name: "Vitamin K", amount: "16mcg" }, { name: "Potassium", amount: "410mg" }, { name: "Fiber", amount: "3.6g" }, { name: "Vitamin C", amount: "7mg" }], benefits: ["Night vision support", "Antioxidant-rich", "Heart health", "Skin health"], serving: "1 cup chopped (128g)" },
  { name: "Parsnips", emoji: "🌿", description: "Sweet root vegetable with folate and fiber", nutrients: [{ name: "Carbohydrates", amount: "27g" }, { name: "Fiber", amount: "5.6g" }, { name: "Folate", amount: "90mcg" }, { name: "Vitamin C", amount: "20mg" }, { name: "Potassium", amount: "573mg" }, { name: "Manganese", amount: "0.7mg" }], benefits: ["Digestive health", "Heart health", "Cell growth via folate", "Immune support"], serving: "1 cup cooked (156g)" },
];

const CARBS_FRUITS: Superfood[] = [
  { name: "Banana", emoji: "🍌", description: "Potassium and B6 for heart and brain function", nutrients: [{ name: "Carbohydrates", amount: "27g" }, { name: "Potassium", amount: "422mg" }, { name: "Vitamin B6", amount: "0.4mg" }, { name: "Vitamin C", amount: "10mg" }, { name: "Fiber", amount: "3g" }, { name: "Magnesium", amount: "32mg" }], benefits: ["Heart health via potassium", "Brain function via B6", "Exercise recovery", "Mood support"], serving: "1 medium (118g)" },
  { name: "Oranges", emoji: "🍊", description: "Vitamin C citrus with hesperidin for circulation", nutrients: [{ name: "Carbohydrates", amount: "15g" }, { name: "Vitamin C", amount: "70mg" }, { name: "Fiber", amount: "3.1g" }, { name: "Folate", amount: "39mcg" }, { name: "Potassium", amount: "237mg" }, { name: "Hesperidin", amount: "~50mg" }], benefits: ["Immune support", "Collagen synthesis", "Heart health via hesperidin", "Blood pressure reduction"], serving: "1 medium (130g)" },
  { name: "Blueberries", emoji: "🫐", description: "Carb-light berry with massive antioxidant power", nutrients: [{ name: "Carbohydrates", amount: "21g" }, { name: "Anthocyanins", amount: "180mg" }, { name: "Vitamin C", amount: "14mg" }, { name: "Vitamin K", amount: "29mcg" }, { name: "Fiber", amount: "3.6g" }, { name: "Manganese", amount: "0.5mg" }], benefits: ["Brain health", "Anti-aging", "Heart health", "Blood sugar stability"], serving: "1 cup (148g)" },
  { name: "Apples", emoji: "🍎", description: "Pectin fiber and quercetin — doctors' daily recommendation", nutrients: [{ name: "Carbohydrates", amount: "25g" }, { name: "Pectin Fiber", amount: "4.4g" }, { name: "Vitamin C", amount: "8mg" }, { name: "Potassium", amount: "195mg" }, { name: "Quercetin", amount: "4.4mg" }, { name: "Vitamin K", amount: "4mcg" }], benefits: ["Gut microbiome support via pectin", "Heart health", "Blood sugar stability", "Cancer prevention via quercetin"], serving: "1 medium with skin (182g)" },
  { name: "Grapefruit", emoji: "🍊", description: "Citrus with naringenin for metabolism and fat burning", nutrients: [{ name: "Carbohydrates", amount: "13g" }, { name: "Vitamin C", amount: "44mg" }, { name: "Fiber", amount: "1.8g" }, { name: "Potassium", amount: "166mg" }, { name: "Vitamin A", amount: "71mcg" }, { name: "Folate", amount: "15mcg" }], benefits: ["Weight management", "Insulin sensitivity", "Heart health", "Immune support"], serving: "1/2 medium (123g)" },
  { name: "Mango", emoji: "🥭", description: "Tropical fruit high in vitamin C, A, and folate", nutrients: [{ name: "Carbohydrates", amount: "25g" }, { name: "Vitamin C", amount: "60mg" }, { name: "Vitamin A", amount: "89mcg" }, { name: "Folate", amount: "71mcg" }, { name: "Fiber", amount: "2.6g" }, { name: "Copper", amount: "0.2mg" }], benefits: ["Immune support", "Eye health", "Digestive enzymes", "Skin health"], serving: "1 cup cubed (165g)" },
  { name: "Dates", emoji: "🫙", description: "Natural energy-dense sweetener with potassium and fiber", nutrients: [{ name: "Carbohydrates", amount: "36g" }, { name: "Potassium", amount: "280mg" }, { name: "Magnesium", amount: "14mg" }, { name: "Fiber", amount: "3.4g" }, { name: "Copper", amount: "0.1mg" }, { name: "Vitamin B6", amount: "0.1mg" }], benefits: ["Quick natural energy", "Iron absorption support", "Gut health", "Labor facilitation in pregnancy"], serving: "2 dates (48g)" },
  { name: "Pineapple", emoji: "🍍", description: "Tropical fruit with bromelain digestive enzyme", nutrients: [{ name: "Carbohydrates", amount: "22g" }, { name: "Vitamin C", amount: "79mg" }, { name: "Manganese", amount: "1.5mg" }, { name: "Bromelain", amount: "~45mg" }, { name: "Fiber", amount: "2.3g" }, { name: "Thiamine", amount: "0.1mg" }], benefits: ["Digestive enzyme support via bromelain", "Anti-inflammatory", "Immune support", "Bone health via manganese"], serving: "1 cup chunks (165g)" },
];

const CARBS_ALL: Superfood[] = [...CARBS_GRAINS, ...CARBS_LEGUMES, ...CARBS_STARCHY_VEG, ...CARBS_FRUITS];

const PROTEINS_POULTRY: Superfood[] = [
  { name: "Chicken Breast", emoji: "🍗", description: "Lean animal protein — the gold standard for muscle building", nutrients: [{ name: "Protein", amount: "26g" }, { name: "Niacin", amount: "12mg" }, { name: "Vitamin B6", amount: "0.9mg" }, { name: "Phosphorus", amount: "220mg" }, { name: "Selenium", amount: "27mcg" }, { name: "Fat", amount: "2.7g" }], benefits: ["Muscle building", "Weight management", "Supports metabolism", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Chicken Thigh", emoji: "🍗", description: "Juicier cut with more iron and flavor than breast", nutrients: [{ name: "Protein", amount: "22g" }, { name: "Niacin", amount: "6mg" }, { name: "Zinc", amount: "1.5mg" }, { name: "Iron", amount: "1mg" }, { name: "Vitamin B6", amount: "0.3mg" }, { name: "Selenium", amount: "22mcg" }], benefits: ["Muscle building", "Higher iron than breast", "More satiating", "Rich in zinc"], serving: "3 oz (85g)" },
  { name: "Turkey Breast", emoji: "🦃", description: "Very lean poultry high in niacin and selenium", nutrients: [{ name: "Protein", amount: "25g" }, { name: "Niacin", amount: "6.6mg" }, { name: "Vitamin B6", amount: "0.5mg" }, { name: "Phosphorus", amount: "196mg" }, { name: "Selenium", amount: "26mcg" }, { name: "Zinc", amount: "1.8mg" }], benefits: ["Muscle building", "Immune support", "Weight management", "Rich in B vitamins"], serving: "3 oz (85g)" },
  { name: "Ground Turkey", emoji: "🦃", description: "Lean ground meat for versatile low-fat cooking", nutrients: [{ name: "Protein", amount: "22g" }, { name: "Niacin", amount: "5mg" }, { name: "Phosphorus", amount: "189mg" }, { name: "Selenium", amount: "27mcg" }, { name: "Zinc", amount: "1.8mg" }, { name: "Iron", amount: "1.1mg" }], benefits: ["Lean muscle fuel", "Low in saturated fat", "Versatile cooking protein", "Weight management"], serving: "3 oz (85g)" },
  { name: "Ground Beef (80/20)", emoji: "🥩", description: "Classic ground beef with balanced fat and creatine", nutrients: [{ name: "Protein", amount: "21g" }, { name: "Iron", amount: "2.7mg" }, { name: "Zinc", amount: "4.8mg" }, { name: "Vitamin B12", amount: "2.1mcg" }, { name: "Creatine", amount: "~0.4g" }, { name: "Niacin", amount: "4.5mg" }], benefits: ["Muscle building", "Rich in heme iron", "High in creatine", "Satisfying and energy-dense"], serving: "3 oz (85g)" },
  { name: "Duck Breast", emoji: "🦆", description: "Rich poultry with high iron content", nutrients: [{ name: "Protein", amount: "23g" }, { name: "Iron", amount: "2.3mg" }, { name: "Zinc", amount: "2mg" }, { name: "Niacin", amount: "4.5mg" }, { name: "Riboflavin", amount: "0.2mg" }, { name: "Selenium", amount: "12mcg" }], benefits: ["High-quality protein", "Rich in iron", "Supports red blood cells", "Energy dense"], serving: "3 oz (85g)" },
  { name: "Lean Beef (Sirloin)", emoji: "🥩", description: "Red meat rich in complete protein, iron, and creatine", nutrients: [{ name: "Protein", amount: "26g" }, { name: "Iron", amount: "2.5mg" }, { name: "Zinc", amount: "4.7mg" }, { name: "Vitamin B12", amount: "2.4mcg" }, { name: "Creatine", amount: "~0.5g" }, { name: "Selenium", amount: "22mcg" }], benefits: ["Muscle building", "Rich in heme iron", "Supports red blood cells", "High in creatine"], serving: "3 oz (85g)" },
  { name: "Lean Pork (Tenderloin)", emoji: "🥩", description: "One of the leanest cuts with the most thiamine", nutrients: [{ name: "Protein", amount: "26g" }, { name: "Thiamine", amount: "0.6mg" }, { name: "Niacin", amount: "5.4mg" }, { name: "Phosphorus", amount: "253mg" }, { name: "Selenium", amount: "27mcg" }, { name: "Zinc", amount: "1.8mg" }], benefits: ["Muscle repair", "Rich in thiamine", "Low in fat", "Supports metabolism"], serving: "3 oz (85g)" },
  { name: "Bison", emoji: "🦬", description: "Leaner than beef with a rich grass-fed nutrient profile", nutrients: [{ name: "Protein", amount: "24g" }, { name: "Iron", amount: "2.1mg" }, { name: "Zinc", amount: "3.2mg" }, { name: "Vitamin B12", amount: "2.6mcg" }, { name: "Selenium", amount: "17mcg" }, { name: "Omega-3s", amount: "~0.1g" }], benefits: ["Lower fat than beef", "Rich in heme iron", "Supports immunity", "Grass-fed omega-3s"], serving: "3 oz (85g)" },
  { name: "Venison", emoji: "🦌", description: "Wild game meat — very lean and protein-dense", nutrients: [{ name: "Protein", amount: "26g" }, { name: "Iron", amount: "3.8mg" }, { name: "Zinc", amount: "2.5mg" }, { name: "Vitamin B12", amount: "3.1mcg" }, { name: "Niacin", amount: "5.1mg" }, { name: "Phosphorus", amount: "191mg" }], benefits: ["Very low in fat", "High protein density", "Rich in iron", "Wild-sourced nutrients"], serving: "3 oz (85g)" },
];

const PROTEINS_FISH: Superfood[] = [
  { name: "Salmon", emoji: "🐟", description: "Omega-3 rich fatty fish", nutrients: [{ name: "Protein", amount: "22g" }, { name: "Omega-3s", amount: "1.8g" }, { name: "Vitamin D", amount: "447 IU" }, { name: "Vitamin B12", amount: "2.6mcg" }, { name: "Selenium", amount: "36mcg" }, { name: "Niacin", amount: "7.3mg" }], benefits: ["Heart health", "Brain function", "Reduces inflammation", "High-quality protein"], serving: "3 oz (85g)" },
  { name: "Tuna", emoji: "🐠", description: "High-protein lean fish", nutrients: [{ name: "Protein", amount: "25g" }, { name: "Selenium", amount: "68mcg" }, { name: "Vitamin B12", amount: "2.1mcg" }, { name: "Niacin", amount: "10.9mg" }, { name: "Omega-3s", amount: "0.7g" }, { name: "Vitamin D", amount: "68 IU" }], benefits: ["Muscle building", "Heart health", "Brain health", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Halibut", emoji: "🐡", description: "Dense white fish with clean protein", nutrients: [{ name: "Protein", amount: "23g" }, { name: "Selenium", amount: "39mcg" }, { name: "Magnesium", amount: "27mg" }, { name: "Phosphorus", amount: "241mg" }, { name: "Niacin", amount: "6.1mg" }, { name: "Vitamin B6", amount: "0.3mg" }], benefits: ["Muscle repair", "Supports metabolism", "Heart health", "Low in saturated fat"], serving: "3 oz (85g)" },
  { name: "Tilapia", emoji: "🐟", description: "Mild white fish, low-fat protein", nutrients: [{ name: "Protein", amount: "23g" }, { name: "Phosphorus", amount: "170mg" }, { name: "Selenium", amount: "47mcg" }, { name: "Niacin", amount: "4.3mg" }, { name: "Vitamin B12", amount: "1.5mcg" }, { name: "Fat", amount: "2.3g" }], benefits: ["Muscle building", "Bone health", "Weight management", "Low in calories"], serving: "3 oz (85g)" },
  { name: "Cod", emoji: "🐟", description: "Lean white fish with mild flavor", nutrients: [{ name: "Protein", amount: "20g" }, { name: "Vitamin B12", amount: "0.9mcg" }, { name: "Iodine", amount: "99mcg" }, { name: "Selenium", amount: "32mcg" }, { name: "Phosphorus", amount: "117mg" }, { name: "Niacin", amount: "1.5mg" }], benefits: ["Thyroid support", "Muscle building", "Heart health", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Pollock", emoji: "🐟", description: "Affordable lean white fish", nutrients: [{ name: "Protein", amount: "20g" }, { name: "Selenium", amount: "40mcg" }, { name: "Vitamin B12", amount: "1.4mcg" }, { name: "Phosphorus", amount: "200mg" }, { name: "Niacin", amount: "1.8mg" }, { name: "Fat", amount: "0.9g" }], benefits: ["Muscle repair", "Budget-friendly protein", "Heart health", "Low in calories"], serving: "3 oz (85g)" },
  { name: "Dried Fish", emoji: "🐟", description: "Concentrated protein source", nutrients: [{ name: "Protein", amount: "17g" }, { name: "Calcium", amount: "46mg" }, { name: "Iron", amount: "1.7mg" }, { name: "Selenium", amount: "42mcg" }, { name: "Sodium", amount: "350mg" }, { name: "Omega-3s", amount: "0.8g" }], benefits: ["High protein density", "Long shelf life", "Bone health", "Portable snack"], serving: "1 oz (28g)" },
];

const PROTEINS_SHELLFISH: Superfood[] = [
  { name: "Shrimp", emoji: "🍤", description: "Low-calorie shellfish with lean protein", nutrients: [{ name: "Protein", amount: "20g" }, { name: "Selenium", amount: "35mcg" }, { name: "Iodine", amount: "35mcg" }, { name: "Phosphorus", amount: "201mg" }, { name: "Vitamin B12", amount: "1.4mcg" }, { name: "Astaxanthin", amount: "~4mg" }], benefits: ["Muscle building", "Thyroid support", "Low in calories", "Antioxidant-rich"], serving: "3 oz (85g)" },
  { name: "Lobster", emoji: "🦞", description: "Luxurious shellfish high in protein", nutrients: [{ name: "Protein", amount: "17g" }, { name: "Zinc", amount: "2.5mg" }, { name: "Copper", amount: "1.2mg" }, { name: "Selenium", amount: "36mcg" }, { name: "Phosphorus", amount: "157mg" }, { name: "Vitamin B12", amount: "2.7mcg" }], benefits: ["Immune support", "Bone health", "Muscle building", "Rich in copper"], serving: "3 oz (85g)" },
  { name: "Crab", emoji: "🦀", description: "Sweet shellfish with lean protein", nutrients: [{ name: "Protein", amount: "17g" }, { name: "Zinc", amount: "3.6mg" }, { name: "Copper", amount: "0.7mg" }, { name: "Selenium", amount: "37mcg" }, { name: "Vitamin B12", amount: "8.8mcg" }, { name: "Omega-3s", amount: "0.4g" }], benefits: ["Immune function", "Brain health", "Muscle repair", "Rich in minerals"], serving: "3 oz (85g)" },
  { name: "Scallops", emoji: "🐚", description: "Low-fat shellfish with dense protein", nutrients: [{ name: "Protein", amount: "17g" }, { name: "Selenium", amount: "18mcg" }, { name: "Magnesium", amount: "31mg" }, { name: "Phosphorus", amount: "267mg" }, { name: "Vitamin B12", amount: "1.8mcg" }, { name: "Omega-3s", amount: "0.3g" }], benefits: ["Heart health", "Muscle building", "Very low in fat", "Brain health"], serving: "3 oz (85g)" },
  { name: "Clams", emoji: "🐚", description: "Iron and B12 powerhouse shellfish", nutrients: [{ name: "Protein", amount: "12g" }, { name: "Vitamin B12", amount: "84mcg" }, { name: "Iron", amount: "23.8mg" }, { name: "Zinc", amount: "2.3mg" }, { name: "Selenium", amount: "25mcg" }, { name: "Omega-3s", amount: "0.2g" }], benefits: ["Highest B12 of any food", "Rich in iron", "Supports red blood cells", "Heart health"], serving: "3 oz (85g)" },
  { name: "Oysters", emoji: "🐚", description: "Zinc-rich shellfish with dense nutrients", nutrients: [{ name: "Protein", amount: "8g" }, { name: "Zinc", amount: "32mg" }, { name: "Iron", amount: "5.1mg" }, { name: "Selenium", amount: "56mcg" }, { name: "Vitamin B12", amount: "16mcg" }, { name: "Omega-3s", amount: "0.7g" }], benefits: ["Highest food source of zinc", "Immune support", "Sexual health", "Heart health"], serving: "3 oz (85g)" },
  { name: "Mussels", emoji: "🐚", description: "Sustainable shellfish rich in omega-3s", nutrients: [{ name: "Protein", amount: "20g" }, { name: "Omega-3s", amount: "0.7g" }, { name: "Vitamin B12", amount: "20.4mcg" }, { name: "Iron", amount: "5.7mg" }, { name: "Manganese", amount: "3.4mg" }, { name: "Selenium", amount: "51mcg" }], benefits: ["Heart health", "Brain function", "Sustainable protein", "Rich in B12"], serving: "3 oz (85g)" },
];

const PROTEINS_EGGS_DAIRY: Superfood[] = [
  { name: "Eggs", emoji: "🥚", description: "Complete protein with essential nutrients", nutrients: [{ name: "Protein", amount: "6g" }, { name: "Vitamin B12", amount: "0.6mcg" }, { name: "Vitamin D", amount: "44 IU" }, { name: "Selenium", amount: "15mcg" }, { name: "Choline", amount: "147mg" }, { name: "Riboflavin", amount: "0.2mg" }], benefits: ["Muscle building", "Brain health", "Eye health", "Nutrient-dense"], serving: "1 large egg (50g)" },
  { name: "Egg Whites", emoji: "🥚", description: "Pure protein with almost no fat or carbs", nutrients: [{ name: "Protein", amount: "11g" }, { name: "Riboflavin", amount: "0.2mg" }, { name: "Selenium", amount: "10mcg" }, { name: "Potassium", amount: "163mg" }, { name: "Fat", amount: "0.2g" }, { name: "Carbohydrates", amount: "1g" }], benefits: ["Lean muscle building", "Very low calorie", "No cholesterol", "High protein density"], serving: "3 large whites (99g)" },
  { name: "Greek Yogurt", emoji: "🥛", description: "High-protein probiotic dairy", nutrients: [{ name: "Protein", amount: "23g" }, { name: "Calcium", amount: "257mg" }, { name: "Vitamin B12", amount: "1.3mcg" }, { name: "Probiotics", amount: "1B+ CFU" }, { name: "Phosphorus", amount: "246mg" }, { name: "Selenium", amount: "9mcg" }], benefits: ["Gut health", "Bone strength", "Muscle building", "Immune support"], serving: "1 cup (245g)" },
  { name: "Cottage Cheese", emoji: "🥛", description: "High-protein, low-fat dairy with casein", nutrients: [{ name: "Protein", amount: "12.5g" }, { name: "Calcium", amount: "99mg" }, { name: "Phosphorus", amount: "151mg" }, { name: "Selenium", amount: "20mcg" }, { name: "Vitamin B12", amount: "0.4mcg" }, { name: "Riboflavin", amount: "0.1mg" }], benefits: ["Slow-digesting protein", "Bone health", "Muscle repair overnight", "Low in fat"], serving: "1/2 cup (113g)" },
  { name: "Milk", emoji: "🥛", description: "Complete protein with calcium and vitamin D", nutrients: [{ name: "Protein", amount: "8g" }, { name: "Calcium", amount: "305mg" }, { name: "Vitamin D", amount: "115 IU" }, { name: "Vitamin B12", amount: "1.1mcg" }, { name: "Phosphorus", amount: "246mg" }, { name: "Riboflavin", amount: "0.4mg" }], benefits: ["Bone health", "Muscle recovery", "Immune support", "Hydration"], serving: "1 cup (244ml)" },
  { name: "Parmesan Cheese", emoji: "🧀", description: "Aged hard cheese dense in protein and calcium", nutrients: [{ name: "Protein", amount: "10g" }, { name: "Calcium", amount: "335mg" }, { name: "Phosphorus", amount: "197mg" }, { name: "Vitamin A", amount: "68mcg" }, { name: "Zinc", amount: "0.8mg" }, { name: "Vitamin B12", amount: "0.4mcg" }], benefits: ["Bone strength", "Muscle support", "Gut-friendly (low lactose)", "Rich in calcium"], serving: "1 oz (28g)" },
  { name: "Cheddar Cheese", emoji: "🧀", description: "Protein-rich aged cheese", nutrients: [{ name: "Protein", amount: "7g" }, { name: "Calcium", amount: "202mg" }, { name: "Vitamin A", amount: "75mcg" }, { name: "Phosphorus", amount: "145mg" }, { name: "Vitamin K2", amount: "~10mcg" }, { name: "Zinc", amount: "0.9mg" }], benefits: ["Bone health", "Muscle support", "Vitamin K2 for arteries", "Satiating"], serving: "1 oz (28g)" },
  { name: "Whey Protein", emoji: "🥤", description: "Fast-absorbing complete dairy protein", nutrients: [{ name: "Protein", amount: "25g" }, { name: "Leucine", amount: "2.7g" }, { name: "BCAAs", amount: "6g" }, { name: "Calcium", amount: "130mg" }, { name: "Fat", amount: "1.5g" }, { name: "Carbohydrates", amount: "3g" }], benefits: ["Rapid muscle recovery", "Highest leucine content", "Easy to digest", "Convenient"], serving: "1 scoop (30g)" },
];

const PROTEINS_PLANT: Superfood[] = [
  { name: "Lentils", emoji: "🥣", description: "Legume packed with protein and fiber", nutrients: [{ name: "Protein", amount: "18g" }, { name: "Fiber", amount: "15.6g" }, { name: "Iron", amount: "6.6mg" }, { name: "Folate", amount: "358mcg" }, { name: "Manganese", amount: "1mg" }, { name: "Fat", amount: "0.8g" }], benefits: ["Heart health", "Digestive health", "Blood sugar control", "Rich in iron"], serving: "1 cup cooked (198g)" },
  { name: "Tofu", emoji: "🍥", description: "Soy-based complete protein", nutrients: [{ name: "Protein", amount: "8g" }, { name: "Calcium", amount: "350mg" }, { name: "Iron", amount: "2mg" }, { name: "Magnesium", amount: "37mg" }, { name: "Isoflavones", amount: "24mg" }, { name: "Fat", amount: "4g" }], benefits: ["Heart health", "Bone health", "Plant-based protein", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Tempeh", emoji: "🟫", description: "Fermented soy with dense protein", nutrients: [{ name: "Protein", amount: "16g" }, { name: "Fiber", amount: "4g" }, { name: "Iron", amount: "1.9mg" }, { name: "Calcium", amount: "92mg" }, { name: "Magnesium", amount: "58mg" }, { name: "Manganese", amount: "1.3mg" }], benefits: ["Gut health", "Muscle building", "Bone strength", "Rich in iron"], serving: "3 oz (85g)" },
  { name: "Edamame", emoji: "🫛", description: "Young soybeans — complete plant protein", nutrients: [{ name: "Protein", amount: "17g" }, { name: "Fiber", amount: "8g" }, { name: "Iron", amount: "3.5mg" }, { name: "Folate", amount: "482mcg" }, { name: "Vitamin K", amount: "33mcg" }, { name: "Isoflavones", amount: "25mg" }], benefits: ["Complete protein", "Heart health", "Bone health", "Easy snack"], serving: "1 cup (155g)" },
  { name: "Black Beans", emoji: "🫘", description: "Fiber-rich legume with solid protein", nutrients: [{ name: "Protein", amount: "15g" }, { name: "Fiber", amount: "15g" }, { name: "Iron", amount: "3.6mg" }, { name: "Folate", amount: "256mcg" }, { name: "Magnesium", amount: "120mg" }, { name: "Potassium", amount: "611mg" }], benefits: ["Blood sugar control", "Heart health", "Digestive health", "Antioxidant-rich"], serving: "1 cup cooked (172g)" },
  { name: "Chickpeas", emoji: "🫘", description: "Versatile legume high in protein and fiber", nutrients: [{ name: "Protein", amount: "15g" }, { name: "Fiber", amount: "12g" }, { name: "Folate", amount: "282mcg" }, { name: "Iron", amount: "4.7mg" }, { name: "Phosphorus", amount: "276mg" }, { name: "Manganese", amount: "1.7mg" }], benefits: ["Sustained energy", "Digestive health", "Heart health", "Blood sugar control"], serving: "1 cup cooked (164g)" },
  { name: "Hemp Seeds", emoji: "🌿", description: "Complete plant protein with healthy fats", nutrients: [{ name: "Protein", amount: "9.5g" }, { name: "Omega-3 ALA", amount: "2.5g" }, { name: "Magnesium", amount: "120mg" }, { name: "Zinc", amount: "3mg" }, { name: "Iron", amount: "2mg" }, { name: "GLA", amount: "375mg" }], benefits: ["Complete amino acid profile", "Heart health", "Anti-inflammatory", "Easy to add to meals"], serving: "3 tbsp (30g)" },
  { name: "Seitan", emoji: "🍞", description: "Wheat gluten — very high protein meat alternative", nutrients: [{ name: "Protein", amount: "21g" }, { name: "Selenium", amount: "16mcg" }, { name: "Iron", amount: "1.9mg" }, { name: "Phosphorus", amount: "95mg" }, { name: "Fat", amount: "1g" }, { name: "Carbohydrates", amount: "6g" }], benefits: ["Highest plant protein density", "Meat-like texture", "Low in fat", "Muscle building"], serving: "3 oz (85g)" },
];

// Flat list used for the food detail modal navigation within the proteins tab
const PROTEINS_FOODS_ALL: Superfood[] = [...PROTEINS_POULTRY, ...PROTEINS_FISH, ...PROTEINS_SHELLFISH, ...PROTEINS_EGGS_DAIRY, ...PROTEINS_PLANT];

const FATS_WHOLE: Superfood[] = [
  { name: "Avocado", emoji: "🥑", description: "Creamy fruit loaded with monounsaturated fat", nutrients: [{ name: "Monounsaturated Fat", amount: "10g" }, { name: "Fiber", amount: "6.7g" }, { name: "Potassium", amount: "485mg" }, { name: "Vitamin E", amount: "2.1mg" }, { name: "Vitamin K", amount: "21mcg" }, { name: "Folate", amount: "81mcg" }], benefits: ["Heart health", "Nutrient absorption", "Skin health", "Sustained satiety"], serving: "1/2 avocado (100g)" },
  { name: "Olive Oil (Extra Virgin)", emoji: "🫒", description: "Cold-pressed oil rich in oleic acid and polyphenols", nutrients: [{ name: "Monounsaturated Fat", amount: "10g" }, { name: "Vitamin E", amount: "1.9mg" }, { name: "Vitamin K", amount: "8.1mcg" }, { name: "Polyphenols", amount: "36mg" }, { name: "Oleocanthal", amount: "~200mg" }, { name: "Squalene", amount: "~100mg" }], benefits: ["Heart health", "Anti-inflammatory", "Antioxidant-rich", "Reduces LDL cholesterol"], serving: "1 tbsp (14g)" },
  { name: "Coconut Oil", emoji: "🥥", description: "Tropical oil high in medium-chain triglycerides", nutrients: [{ name: "Saturated Fat", amount: "12g" }, { name: "MCTs", amount: "7g" }, { name: "Lauric Acid", amount: "6.2g" }, { name: "Caprylic Acid", amount: "0.9g" }, { name: "Fat", amount: "14g" }, { name: "Calories", amount: "120kcal" }], benefits: ["Quick energy from MCTs", "Antimicrobial properties", "Supports brain function", "Raises HDL cholesterol"], serving: "1 tbsp (14g)" },
  { name: "Butter", emoji: "🧈", description: "Dairy fat rich in fat-soluble vitamins", nutrients: [{ name: "Saturated Fat", amount: "7g" }, { name: "Vitamin A", amount: "97mcg" }, { name: "Vitamin D", amount: "9.8 IU" }, { name: "Vitamin K2", amount: "~4mcg" }, { name: "Butyrate", amount: "~1g" }, { name: "CLA", amount: "~0.1g" }], benefits: ["Vitamin K2 for arteries", "Gut health via butyrate", "Fat-soluble vitamin absorption", "Energy dense"], serving: "1 tbsp (14g)" },
  { name: "Ghee", emoji: "🧈", description: "Clarified butter — lactose-free with concentrated nutrients", nutrients: [{ name: "Saturated Fat", amount: "7.9g" }, { name: "Vitamin A", amount: "108mcg" }, { name: "Vitamin K2", amount: "~4mcg" }, { name: "Butyrate", amount: "~1g" }, { name: "CLA", amount: "~0.1g" }, { name: "Fat", amount: "13g" }], benefits: ["Lactose-free", "High smoke point", "Gut health", "Rich in fat-soluble vitamins"], serving: "1 tbsp (13g)" },
  { name: "Olives", emoji: "🫒", description: "Whole food source of healthy monounsaturated fat", nutrients: [{ name: "Monounsaturated Fat", amount: "3.5g" }, { name: "Vitamin E", amount: "0.5mg" }, { name: "Iron", amount: "0.5mg" }, { name: "Copper", amount: "0.02mg" }, { name: "Fiber", amount: "0.9g" }, { name: "Polyphenols", amount: "~25mg" }], benefits: ["Heart health", "Anti-inflammatory", "Antioxidant-rich", "Bone health"], serving: "10 olives (44g)" },
];

const FATS_NUTS_SEEDS: Superfood[] = [
  { name: "Almonds", emoji: "🥜", description: "Monounsaturated fat with vitamin E", nutrients: [{ name: "Monounsaturated Fat", amount: "9g" }, { name: "Vitamin E", amount: "7.4mg" }, { name: "Magnesium", amount: "77mg" }, { name: "Fiber", amount: "3.5g" }, { name: "Protein", amount: "6g" }, { name: "Calcium", amount: "76mg" }], benefits: ["Heart health", "Blood sugar control", "Rich in antioxidants", "Bone strength"], serving: "1 oz (28g)" },
  { name: "Walnuts", emoji: "🌰", description: "Highest omega-3 content of any nut", nutrients: [{ name: "Omega-3 ALA", amount: "2.6g" }, { name: "Polyphenols", amount: "70mg" }, { name: "Magnesium", amount: "45mg" }, { name: "Phosphorus", amount: "98mg" }, { name: "Copper", amount: "0.4mg" }, { name: "Protein", amount: "4.3g" }], benefits: ["Brain health", "Heart health", "Anti-inflammatory", "Reduces LDL cholesterol"], serving: "1 oz (28g)" },
  { name: "Macadamia Nuts", emoji: "🥜", description: "Richest nut in monounsaturated fat", nutrients: [{ name: "Monounsaturated Fat", amount: "17g" }, { name: "Fiber", amount: "2.4g" }, { name: "Thiamine", amount: "0.3mg" }, { name: "Manganese", amount: "1.2mg" }, { name: "Copper", amount: "0.2mg" }, { name: "Protein", amount: "2.2g" }], benefits: ["Heart health", "Anti-inflammatory", "Satiating", "Improves cholesterol ratio"], serving: "1 oz (28g)" },
  { name: "Pecans", emoji: "🌰", description: "Antioxidant-rich nut with healthy fats", nutrients: [{ name: "Monounsaturated Fat", amount: "12g" }, { name: "Zinc", amount: "1.3mg" }, { name: "Manganese", amount: "1.3mg" }, { name: "Copper", amount: "0.3mg" }, { name: "Thiamine", amount: "0.2mg" }, { name: "Fiber", amount: "2.7g" }], benefits: ["Heart health", "Antioxidant-rich", "Blood sugar support", "Anti-inflammatory"], serving: "1 oz (28g)" },
  { name: "Chia Seeds", emoji: "🌱", description: "Tiny seeds packed with omega-3 ALA", nutrients: [{ name: "Omega-3 ALA", amount: "5.1g" }, { name: "Fiber", amount: "10g" }, { name: "Calcium", amount: "179mg" }, { name: "Magnesium", amount: "95mg" }, { name: "Phosphorus", amount: "244mg" }, { name: "Protein", amount: "4.7g" }], benefits: ["Heart health", "Digestive health", "Bone strength", "Blood sugar control"], serving: "2 tbsp (28g)" },
  { name: "Flaxseeds", emoji: "🌿", description: "Ground seeds with the highest plant omega-3", nutrients: [{ name: "Omega-3 ALA", amount: "3.2g" }, { name: "Lignans", amount: "85mg" }, { name: "Fiber", amount: "3.8g" }, { name: "Magnesium", amount: "55mg" }, { name: "Thiamine", amount: "0.3mg" }, { name: "Phosphorus", amount: "90mg" }], benefits: ["Hormone balance", "Heart health", "Digestive health", "Anti-inflammatory"], serving: "2 tbsp ground (14g)" },
  { name: "Hemp Seeds", emoji: "🌿", description: "Complete protein with balanced omega-3 to omega-6", nutrients: [{ name: "Omega-3 ALA", amount: "2.5g" }, { name: "Protein", amount: "9.5g" }, { name: "Magnesium", amount: "120mg" }, { name: "Zinc", amount: "3mg" }, { name: "Iron", amount: "2mg" }, { name: "GLA", amount: "375mg" }], benefits: ["Ideal omega ratio", "Complete amino acids", "Heart health", "Anti-inflammatory"], serving: "3 tbsp (30g)" },
  { name: "Sunflower Seeds", emoji: "🌻", description: "Vitamin E rich seed with polyunsaturated fats", nutrients: [{ name: "Vitamin E", amount: "7.4mg" }, { name: "Selenium", amount: "11mcg" }, { name: "Magnesium", amount: "37mg" }, { name: "Thiamine", amount: "0.3mg" }, { name: "Copper", amount: "0.2mg" }, { name: "Polyunsaturated Fat", amount: "9g" }], benefits: ["Antioxidant-rich", "Heart health", "Immune support", "Skin health"], serving: "1 oz (28g)" },
  { name: "Pumpkin Seeds", emoji: "🎃", description: "Zinc and magnesium rich seeds with healthy fats", nutrients: [{ name: "Magnesium", amount: "156mg" }, { name: "Zinc", amount: "2.2mg" }, { name: "Iron", amount: "2.5mg" }, { name: "Copper", amount: "0.4mg" }, { name: "Manganese", amount: "0.6mg" }, { name: "Protein", amount: "8.5g" }], benefits: ["Immune support", "Sleep quality", "Prostate health", "Anti-inflammatory"], serving: "1 oz (28g)" },
];

const FATS_FISH: Superfood[] = [
  { name: "Salmon", emoji: "🐟", description: "Best source of long-chain omega-3s EPA and DHA", nutrients: [{ name: "Omega-3 EPA", amount: "0.4g" }, { name: "Omega-3 DHA", amount: "1.2g" }, { name: "Protein", amount: "22g" }, { name: "Vitamin D", amount: "447 IU" }, { name: "Selenium", amount: "36mcg" }, { name: "Astaxanthin", amount: "3.6mg" }], benefits: ["Heart health", "Brain function", "Reduces inflammation", "Eye health"], serving: "3 oz (85g)" },
  { name: "Mackerel", emoji: "🐟", description: "Fatty fish extremely high in omega-3s", nutrients: [{ name: "Omega-3 EPA", amount: "0.7g" }, { name: "Omega-3 DHA", amount: "1.1g" }, { name: "Vitamin D", amount: "388 IU" }, { name: "Vitamin B12", amount: "16mcg" }, { name: "Selenium", amount: "44mcg" }, { name: "Protein", amount: "20g" }], benefits: ["Heart health", "Brain health", "Reduces triglycerides", "Anti-inflammatory"], serving: "3 oz (85g)" },
  { name: "Sardines", emoji: "🐟", description: "Small oily fish packed with omega-3s and calcium", nutrients: [{ name: "Omega-3 EPA", amount: "0.5g" }, { name: "Omega-3 DHA", amount: "0.7g" }, { name: "Calcium", amount: "325mg" }, { name: "Vitamin D", amount: "164 IU" }, { name: "Vitamin B12", amount: "4.8mcg" }, { name: "Selenium", amount: "45mcg" }], benefits: ["Bone health", "Heart health", "Brain function", "Sustainable source"], serving: "3 oz (85g)" },
  { name: "Herring", emoji: "🐟", description: "Underrated fatty fish with great omega-3 profile", nutrients: [{ name: "Omega-3 EPA", amount: "0.7g" }, { name: "Omega-3 DHA", amount: "0.9g" }, { name: "Vitamin D", amount: "214 IU" }, { name: "Vitamin B12", amount: "13mcg" }, { name: "Selenium", amount: "39mcg" }, { name: "Iodine", amount: "47mcg" }], benefits: ["Heart health", "Thyroid support", "Brain health", "Rich in vitamin D"], serving: "3 oz (85g)" },
  { name: "Anchovies", emoji: "🐟", description: "Tiny fish with concentrated omega-3s", nutrients: [{ name: "Omega-3 EPA", amount: "0.5g" }, { name: "Omega-3 DHA", amount: "0.8g" }, { name: "Calcium", amount: "88mg" }, { name: "Iron", amount: "1.3mg" }, { name: "Selenium", amount: "38mcg" }, { name: "Niacin", amount: "4.8mg" }], benefits: ["Heart health", "Anti-inflammatory", "Bone health", "Umami flavor boost"], serving: "1 oz (28g)" },
];

const FATS_DAIRY: Superfood[] = [
  { name: "Full-Fat Greek Yogurt", emoji: "🥛", description: "Probiotic dairy with healthy saturated fat", nutrients: [{ name: "Saturated Fat", amount: "5g" }, { name: "Protein", amount: "22g" }, { name: "Calcium", amount: "257mg" }, { name: "Probiotics", amount: "1B+ CFU" }, { name: "Vitamin B12", amount: "1.3mcg" }, { name: "CLA", amount: "0.2g" }], benefits: ["Gut health", "Bone strength", "Satiating", "CLA for body composition"], serving: "1 cup (245g)" },
  { name: "Hard Cheese (Cheddar)", emoji: "🧀", description: "Aged cheese with fat-soluble vitamins", nutrients: [{ name: "Saturated Fat", amount: "6g" }, { name: "Protein", amount: "7g" }, { name: "Calcium", amount: "202mg" }, { name: "Vitamin K2", amount: "~10mcg" }, { name: "Vitamin A", amount: "75mcg" }, { name: "Zinc", amount: "0.9mg" }], benefits: ["Bone health", "Vitamin K2 for arteries", "Satiating", "Dental health"], serving: "1 oz (28g)" },
  { name: "Heavy Cream", emoji: "🥛", description: "High-fat dairy for cooking and calories", nutrients: [{ name: "Saturated Fat", amount: "5.4g" }, { name: "Vitamin A", amount: "156mcg" }, { name: "Vitamin D", amount: "15 IU" }, { name: "Choline", amount: "12mg" }, { name: "Riboflavin", amount: "0.03mg" }], benefits: ["Energy dense", "Fat-soluble vitamin source", "Keto-friendly", "Cooking versatility"], serving: "2 tbsp (30ml)" },
  { name: "Whole Milk", emoji: "🥛", description: "Balanced fat and protein dairy", nutrients: [{ name: "Saturated Fat", amount: "4.6g" }, { name: "Protein", amount: "8g" }, { name: "Calcium", amount: "305mg" }, { name: "Vitamin D", amount: "115 IU" }, { name: "Phosphorus", amount: "246mg" }, { name: "Riboflavin", amount: "0.4mg" }], benefits: ["Bone health", "Muscle recovery", "CLA content", "Nutrient absorption"], serving: "1 cup (244ml)" },
];

const FATS_ALL: Superfood[] = [...FATS_WHOLE, ...FATS_NUTS_SEEDS, ...FATS_FISH, ...FATS_DAIRY];

const VITAMINS_FAT_SOLUBLE: Superfood[] = [
  { name: "Carrots", emoji: "🥕", description: "Highest beta-carotene (pro-vitamin A) vegetable", nutrients: [{ name: "Vitamin A", amount: "459mcg" }, { name: "Vitamin K", amount: "8mcg" }, { name: "Fiber", amount: "1.7g" }, { name: "Potassium", amount: "195mg" }, { name: "Vitamin C", amount: "3.6mg" }], benefits: ["Eye health", "Immune support", "Skin health", "Antioxidant-rich"], serving: "1 medium (61g)" },
  { name: "Sweet Potato", emoji: "🍠", description: "One of the richest sources of vitamin A", nutrients: [{ name: "Vitamin A", amount: "961mcg" }, { name: "Vitamin C", amount: "22mg" }, { name: "Vitamin B6", amount: "0.3mg" }, { name: "Potassium", amount: "542mg" }, { name: "Fiber", amount: "3.8g" }, { name: "Manganese", amount: "0.3mg" }], benefits: ["Eye health", "Immune support", "Skin health", "Stable energy"], serving: "1 medium (150g)" },
  { name: "Liver (Beef)", emoji: "🥩", description: "Most nutrient-dense food — richest source of vitamin A", nutrients: [{ name: "Vitamin A", amount: "6,582mcg" }, { name: "Vitamin B12", amount: "70mcg" }, { name: "Folate", amount: "215mcg" }, { name: "Iron", amount: "5.2mg" }, { name: "Copper", amount: "12mg" }, { name: "Riboflavin", amount: "2.8mg" }], benefits: ["Eye health", "Immune support", "Red blood cell production", "Detoxification"], serving: "3 oz (85g)" },
  { name: "Egg Yolk", emoji: "🥚", description: "Natural source of vitamins A, D, E and K", nutrients: [{ name: "Vitamin A", amount: "65mcg" }, { name: "Vitamin D", amount: "37 IU" }, { name: "Vitamin E", amount: "0.5mg" }, { name: "Vitamin K2", amount: "~4mcg" }, { name: "Choline", amount: "147mg" }, { name: "Selenium", amount: "9.5mcg" }], benefits: ["Eye health", "Bone health", "Brain health", "Fat-soluble vitamin package"], serving: "1 large yolk (17g)" },
  { name: "Salmon", emoji: "🐟", description: "Top food source of vitamin D3 and E", nutrients: [{ name: "Vitamin D", amount: "447 IU" }, { name: "Vitamin E", amount: "0.5mg" }, { name: "Omega-3s", amount: "1.8g" }, { name: "Selenium", amount: "36mcg" }, { name: "Protein", amount: "22g" }, { name: "Vitamin B12", amount: "2.6mcg" }], benefits: ["Bone health", "Immune support", "Heart health", "Anti-inflammatory"], serving: "3 oz (85g)" },
  { name: "Sardines", emoji: "🐟", description: "Excellent vitamin D source with calcium", nutrients: [{ name: "Vitamin D", amount: "164 IU" }, { name: "Vitamin B12", amount: "4.8mcg" }, { name: "Calcium", amount: "325mg" }, { name: "Omega-3s", amount: "1.3g" }, { name: "Selenium", amount: "45mcg" }, { name: "Phosphorus", amount: "452mg" }], benefits: ["Bone health", "Immune support", "Brain health", "Heart health"], serving: "3 oz (85g)" },
  { name: "Cod Liver Oil", emoji: "🫙", description: "Concentrated vitamin A and D supplement food", nutrients: [{ name: "Vitamin A", amount: "1,350mcg" }, { name: "Vitamin D", amount: "450 IU" }, { name: "Vitamin E", amount: "1mg" }, { name: "Omega-3 EPA", amount: "0.3g" }, { name: "Omega-3 DHA", amount: "0.5g" }], benefits: ["Bone health", "Immune support", "Eye health", "Anti-inflammatory"], serving: "1 tsp (5ml)" },
  { name: "Sunflower Seeds", emoji: "🌻", description: "Richest food source of vitamin E", nutrients: [{ name: "Vitamin E", amount: "7.4mg" }, { name: "Selenium", amount: "11mcg" }, { name: "Magnesium", amount: "37mg" }, { name: "Thiamine", amount: "0.3mg" }, { name: "Copper", amount: "0.2mg" }, { name: "Polyunsaturated Fat", amount: "9g" }], benefits: ["Antioxidant protection", "Immune support", "Heart health", "Skin health"], serving: "1 oz (28g)" },
  { name: "Almonds", emoji: "🥜", description: "Top plant source of vitamin E", nutrients: [{ name: "Vitamin E", amount: "7.4mg" }, { name: "Magnesium", amount: "77mg" }, { name: "Calcium", amount: "76mg" }, { name: "Fiber", amount: "3.5g" }, { name: "Protein", amount: "6g" }, { name: "Monounsaturated Fat", amount: "9g" }], benefits: ["Antioxidant protection", "Heart health", "Blood sugar control", "Skin health"], serving: "1 oz (28g)" },
  { name: "Spinach", emoji: "🥬", description: "Richest leafy green for vitamin K1", nutrients: [{ name: "Vitamin K", amount: "888mcg" }, { name: "Vitamin A", amount: "943mcg" }, { name: "Vitamin C", amount: "18mg" }, { name: "Folate", amount: "263mcg" }, { name: "Iron", amount: "6.4mg" }, { name: "Calcium", amount: "245mg" }], benefits: ["Blood clotting", "Bone health", "Antioxidant-rich", "Eye health"], serving: "1 cup cooked (180g)" },
  { name: "Kale", emoji: "🥗", description: "High in both vitamin K1 and K2", nutrients: [{ name: "Vitamin K", amount: "547mcg" }, { name: "Vitamin A", amount: "206mcg" }, { name: "Vitamin C", amount: "80mg" }, { name: "Folate", amount: "19mcg" }, { name: "Calcium", amount: "101mg" }, { name: "Iron", amount: "1.1mg" }], benefits: ["Bone health", "Heart health", "Cancer prevention", "Anti-inflammatory"], serving: "1 cup raw (67g)" },
  { name: "Natto (Fermented Soy)", emoji: "🌱", description: "Highest food source of vitamin K2 (MK-7)", nutrients: [{ name: "Vitamin K2", amount: "850mcg" }, { name: "Protein", amount: "12g" }, { name: "Fiber", amount: "3g" }, { name: "Iron", amount: "2.7mg" }, { name: "Calcium", amount: "100mg" }, { name: "Nattokinase", amount: "~6mg" }], benefits: ["Arterial health", "Bone density", "Cardiovascular health", "Blood clot prevention"], serving: "3 oz (85g)" },
];

const VITAMINS_B: Superfood[] = [
  { name: "Beef Liver", emoji: "🥩", description: "Best overall source of all B vitamins", nutrients: [{ name: "Vitamin B12", amount: "70mcg" }, { name: "Riboflavin (B2)", amount: "2.8mg" }, { name: "Niacin (B3)", amount: "14.7mg" }, { name: "Folate (B9)", amount: "215mcg" }, { name: "Vitamin B6", amount: "0.8mg" }, { name: "Pantothenic Acid", amount: "7mg" }], benefits: ["Energy production", "Red blood cell formation", "Nerve health", "Detoxification"], serving: "3 oz (85g)" },
  { name: "Salmon", emoji: "🐟", description: "Excellent source of B vitamins especially B12", nutrients: [{ name: "Vitamin B12", amount: "2.6mcg" }, { name: "Niacin (B3)", amount: "7.3mg" }, { name: "Vitamin B6", amount: "0.6mg" }, { name: "Riboflavin", amount: "0.1mg" }, { name: "Thiamine", amount: "0.2mg" }, { name: "Pantothenic Acid", amount: "0.5mg" }], benefits: ["Nerve health", "Energy metabolism", "Heart health", "Brain function"], serving: "3 oz (85g)" },
  { name: "Eggs", emoji: "🥚", description: "Complete B vitamin profile especially biotin and B12", nutrients: [{ name: "Vitamin B12", amount: "0.6mcg" }, { name: "Biotin (B7)", amount: "10mcg" }, { name: "Riboflavin (B2)", amount: "0.2mg" }, { name: "Pantothenic Acid", amount: "0.7mg" }, { name: "Folate", amount: "24mcg" }, { name: "Choline", amount: "147mg" }], benefits: ["Hair and nail health", "Energy production", "Brain health", "Nerve function"], serving: "1 large egg (50g)" },
  { name: "Lentils", emoji: "🥣", description: "Best plant source of folate (B9)", nutrients: [{ name: "Folate (B9)", amount: "358mcg" }, { name: "Thiamine (B1)", amount: "0.3mg" }, { name: "Iron", amount: "6.6mg" }, { name: "Fiber", amount: "15.6g" }, { name: "Protein", amount: "18g" }, { name: "Manganese", amount: "1mg" }], benefits: ["Cell division", "Pregnancy health", "Red blood cell formation", "Heart health"], serving: "1 cup cooked (198g)" },
  { name: "Chickpeas", emoji: "🫘", description: "High in folate and vitamin B6", nutrients: [{ name: "Folate (B9)", amount: "282mcg" }, { name: "Vitamin B6", amount: "0.2mg" }, { name: "Thiamine (B1)", amount: "0.2mg" }, { name: "Protein", amount: "15g" }, { name: "Fiber", amount: "12g" }, { name: "Iron", amount: "4.7mg" }], benefits: ["Brain health", "Cell growth", "Heart health", "Blood sugar control"], serving: "1 cup cooked (164g)" },
  { name: "Brown Rice", emoji: "🍚", description: "Good source of thiamine and niacin", nutrients: [{ name: "Thiamine (B1)", amount: "0.2mg" }, { name: "Niacin (B3)", amount: "3mg" }, { name: "Vitamin B6", amount: "0.2mg" }, { name: "Magnesium", amount: "84mg" }, { name: "Phosphorus", amount: "162mg" }, { name: "Manganese", amount: "1.8mg" }], benefits: ["Energy metabolism", "Nerve function", "Digestive health", "Blood sugar control"], serving: "1 cup cooked (195g)" },
  { name: "Nutritional Yeast", emoji: "🧬", description: "Complete B vitamin complex including B12", nutrients: [{ name: "Vitamin B12", amount: "2.4mcg" }, { name: "Thiamine (B1)", amount: "1.5mg" }, { name: "Riboflavin (B2)", amount: "1.3mg" }, { name: "Niacin (B3)", amount: "9.7mg" }, { name: "Folate", amount: "60mcg" }, { name: "Vitamin B6", amount: "1.1mg" }], benefits: ["Vegan B12 source", "Energy production", "Immune support", "Savory umami flavor"], serving: "2 tbsp (16g)" },
  { name: "Avocado", emoji: "🥑", description: "Richest fruit in B vitamins", nutrients: [{ name: "Pantothenic Acid (B5)", amount: "1.4mg" }, { name: "Folate (B9)", amount: "81mcg" }, { name: "Vitamin B6", amount: "0.3mg" }, { name: "Riboflavin", amount: "0.1mg" }, { name: "Niacin", amount: "1.7mg" }, { name: "Thiamine", amount: "0.1mg" }], benefits: ["Energy metabolism", "Hormone production", "Brain health", "Heart health"], serving: "1/2 avocado (100g)" },
  { name: "Turkey Breast", emoji: "🦃", description: "Excellent source of niacin (B3) and B6", nutrients: [{ name: "Niacin (B3)", amount: "6.6mg" }, { name: "Vitamin B6", amount: "0.5mg" }, { name: "Vitamin B12", amount: "0.3mcg" }, { name: "Pantothenic Acid", amount: "0.6mg" }, { name: "Riboflavin", amount: "0.1mg" }, { name: "Selenium", amount: "26mcg" }], benefits: ["Energy production", "Nerve health", "Mood regulation", "Muscle support"], serving: "3 oz (85g)" },
];

const VITAMINS_C: Superfood[] = [
  { name: "Red Bell Pepper", emoji: "🫑", description: "Highest vitamin C of any common vegetable", nutrients: [{ name: "Vitamin C", amount: "152mg" }, { name: "Vitamin A", amount: "117mcg" }, { name: "Vitamin B6", amount: "0.3mg" }, { name: "Folate", amount: "46mcg" }, { name: "Potassium", amount: "251mg" }, { name: "Fiber", amount: "1.7g" }], benefits: ["Immune boost", "Collagen production", "Eye health", "Iron absorption"], serving: "1 medium (119g)" },
  { name: "Kiwi", emoji: "🥝", description: "Gram for gram more vitamin C than oranges", nutrients: [{ name: "Vitamin C", amount: "64mg" }, { name: "Vitamin K", amount: "28mcg" }, { name: "Vitamin E", amount: "1.1mg" }, { name: "Folate", amount: "17mcg" }, { name: "Fiber", amount: "2.1g" }, { name: "Potassium", amount: "215mg" }], benefits: ["Immune support", "Digestive health", "Sleep quality", "Antioxidant-rich"], serving: "1 medium (69g)" },
  { name: "Strawberries", emoji: "🍓", description: "Sweet berry packed with vitamin C", nutrients: [{ name: "Vitamin C", amount: "89mg" }, { name: "Manganese", amount: "0.6mg" }, { name: "Folate", amount: "36mcg" }, { name: "Fiber", amount: "3g" }, { name: "Potassium", amount: "233mg" }, { name: "Anthocyanins", amount: "36mg" }], benefits: ["Heart health", "Blood sugar control", "Immune support", "Skin health"], serving: "1 cup (152g)" },
  { name: "Broccoli", emoji: "🥦", description: "High vitamin C and K cruciferous vegetable", nutrients: [{ name: "Vitamin C", amount: "81mg" }, { name: "Vitamin K", amount: "93mcg" }, { name: "Folate", amount: "57mcg" }, { name: "Fiber", amount: "2.4g" }, { name: "Potassium", amount: "288mg" }, { name: "Sulforaphane", amount: "~30mg" }], benefits: ["Cancer prevention", "Immune support", "Bone health", "Detoxification"], serving: "1 cup chopped (91g)" },
  { name: "Oranges", emoji: "🍊", description: "Classic vitamin C citrus fruit", nutrients: [{ name: "Vitamin C", amount: "70mg" }, { name: "Folate", amount: "39mcg" }, { name: "Thiamine", amount: "0.1mg" }, { name: "Potassium", amount: "237mg" }, { name: "Fiber", amount: "3.1g" }, { name: "Hesperidin", amount: "~50mg" }], benefits: ["Immune support", "Collagen production", "Heart health", "Iron absorption"], serving: "1 medium (130g)" },
  { name: "Guava", emoji: "🍈", description: "Tropical fruit with 4x more vitamin C than oranges", nutrients: [{ name: "Vitamin C", amount: "126mg" }, { name: "Fiber", amount: "3g" }, { name: "Folate", amount: "27mcg" }, { name: "Potassium", amount: "229mg" }, { name: "Vitamin A", amount: "16mcg" }, { name: "Lycopene", amount: "5.4mg" }], benefits: ["Immune powerhouse", "Gut health", "Skin health", "Blood sugar control"], serving: "1 medium (55g)" },
  { name: "Papaya", emoji: "🍐", description: "Tropical fruit high in vitamin C and digestive enzymes", nutrients: [{ name: "Vitamin C", amount: "87mg" }, { name: "Vitamin A", amount: "77mcg" }, { name: "Folate", amount: "58mcg" }, { name: "Potassium", amount: "264mg" }, { name: "Papain", amount: "~45mg" }, { name: "Fiber", amount: "2.5g" }], benefits: ["Digestive health", "Immune support", "Anti-inflammatory", "Skin health"], serving: "1 cup cubed (145g)" },
  { name: "Brussels Sprouts", emoji: "🥦", description: "Cruciferous vegetable with high vitamin C and K", nutrients: [{ name: "Vitamin C", amount: "97mg" }, { name: "Vitamin K", amount: "219mcg" }, { name: "Folate", amount: "94mcg" }, { name: "Fiber", amount: "4g" }, { name: "Vitamin B6", amount: "0.3mg" }, { name: "Glucosinolates", amount: "~65mg" }], benefits: ["Cancer prevention", "Bone health", "Digestive health", "Immune support"], serving: "1 cup cooked (156g)" },
  { name: "Spinach", emoji: "🥬", description: "Leafy green with vitamin C, K and folate", nutrients: [{ name: "Vitamin C", amount: "8.4mg" }, { name: "Vitamin K", amount: "145mcg" }, { name: "Folate", amount: "58mcg" }, { name: "Vitamin A", amount: "141mcg" }, { name: "Iron", amount: "0.8mg" }, { name: "Calcium", amount: "30mg" }], benefits: ["Immune support", "Iron absorption", "Bone health", "Eye health"], serving: "1 cup raw (30g)" },
];

const VITAMINS_ALL: Superfood[] = [...VITAMINS_FAT_SOLUBLE, ...VITAMINS_B, ...VITAMINS_C];

const MINERALS_ELECTROLYTES: Superfood[] = [
  { name: "Banana", emoji: "🍌", description: "Potassium-rich fruit for muscle and nerve function", nutrients: [{ name: "Potassium", amount: "422mg" }, { name: "Vitamin B6", amount: "0.4mg" }, { name: "Vitamin C", amount: "10mg" }, { name: "Magnesium", amount: "32mg" }, { name: "Fiber", amount: "3g" }, { name: "Carbohydrates", amount: "27g" }], benefits: ["Muscle function", "Blood pressure control", "Heart rhythm", "Reduces cramps"], serving: "1 medium (118g)" },
  { name: "Sweet Potato", emoji: "🍠", description: "High potassium and magnesium root vegetable", nutrients: [{ name: "Potassium", amount: "542mg" }, { name: "Magnesium", amount: "33mg" }, { name: "Vitamin A", amount: "961mcg" }, { name: "Fiber", amount: "3.8g" }, { name: "Manganese", amount: "0.3mg" }, { name: "Vitamin C", amount: "22mg" }], benefits: ["Blood pressure support", "Muscle health", "Heart health", "Electrolyte balance"], serving: "1 medium (150g)" },
  { name: "Avocado", emoji: "🥑", description: "Potassium-dense fruit — more than a banana", nutrients: [{ name: "Potassium", amount: "485mg" }, { name: "Magnesium", amount: "29mg" }, { name: "Sodium", amount: "7mg" }, { name: "Fiber", amount: "6.7g" }, { name: "Vitamin K", amount: "21mcg" }, { name: "Folate", amount: "81mcg" }], benefits: ["Blood pressure control", "Heart health", "Muscle recovery", "Electrolyte balance"], serving: "1/2 avocado (100g)" },
  { name: "Spinach", emoji: "🥬", description: "Rich in magnesium and potassium", nutrients: [{ name: "Magnesium", amount: "157mg" }, { name: "Potassium", amount: "839mg" }, { name: "Calcium", amount: "245mg" }, { name: "Iron", amount: "6.4mg" }, { name: "Vitamin K", amount: "888mcg" }, { name: "Folate", amount: "263mcg" }], benefits: ["Muscle relaxation", "Blood pressure support", "Bone health", "Heart health"], serving: "1 cup cooked (180g)" },
  { name: "Coconut Water", emoji: "🥥", description: "Natural electrolyte-packed drink", nutrients: [{ name: "Potassium", amount: "600mg" }, { name: "Sodium", amount: "252mg" }, { name: "Magnesium", amount: "60mg" }, { name: "Calcium", amount: "57.6mg" }, { name: "Phosphorus", amount: "48mg" }], benefits: ["Hydration", "Electrolyte replenishment", "Muscle recovery", "Blood pressure support"], serving: "1 cup (240ml)" },
  { name: "Dark Chocolate (70%+)", emoji: "🍫", description: "Rich in magnesium with antioxidants", nutrients: [{ name: "Magnesium", amount: "64mg" }, { name: "Iron", amount: "3.4mg" }, { name: "Copper", amount: "0.5mg" }, { name: "Manganese", amount: "0.5mg" }, { name: "Zinc", amount: "0.9mg" }, { name: "Polyphenols", amount: "170mg" }], benefits: ["Heart health", "Stress relief", "Antioxidant-rich", "Mood support"], serving: "1 oz (28g)" },
  { name: "Pumpkin Seeds", emoji: "🎃", description: "Highest magnesium content of any seed", nutrients: [{ name: "Magnesium", amount: "156mg" }, { name: "Zinc", amount: "2.2mg" }, { name: "Iron", amount: "2.5mg" }, { name: "Copper", amount: "0.4mg" }, { name: "Manganese", amount: "0.6mg" }, { name: "Phosphorus", amount: "333mg" }], benefits: ["Muscle function", "Sleep quality", "Immune support", "Blood sugar control"], serving: "1 oz (28g)" },
  { name: "Black Beans", emoji: "🫘", description: "Magnesium and potassium-rich legume", nutrients: [{ name: "Magnesium", amount: "120mg" }, { name: "Potassium", amount: "611mg" }, { name: "Iron", amount: "3.6mg" }, { name: "Folate", amount: "256mcg" }, { name: "Fiber", amount: "15g" }, { name: "Protein", amount: "15g" }], benefits: ["Heart health", "Blood sugar control", "Digestive health", "Muscle function"], serving: "1 cup cooked (172g)" },
];

const MINERALS_BONE: Superfood[] = [
  { name: "Milk", emoji: "🥛", description: "Most bioavailable calcium dairy source", nutrients: [{ name: "Calcium", amount: "305mg" }, { name: "Phosphorus", amount: "246mg" }, { name: "Vitamin D", amount: "115 IU" }, { name: "Protein", amount: "8g" }, { name: "Vitamin B12", amount: "1.1mcg" }, { name: "Riboflavin", amount: "0.4mg" }], benefits: ["Bone density", "Teeth strength", "Muscle contraction", "Nerve function"], serving: "1 cup (244ml)" },
  { name: "Greek Yogurt", emoji: "🥛", description: "High calcium probiotic dairy", nutrients: [{ name: "Calcium", amount: "257mg" }, { name: "Phosphorus", amount: "246mg" }, { name: "Protein", amount: "23g" }, { name: "Vitamin B12", amount: "1.3mcg" }, { name: "Probiotics", amount: "1B+ CFU" }, { name: "Selenium", amount: "9mcg" }], benefits: ["Bone health", "Gut health", "Muscle support", "Immune support"], serving: "1 cup (245g)" },
  { name: "Parmesan Cheese", emoji: "🧀", description: "Highest calcium content of any cheese", nutrients: [{ name: "Calcium", amount: "335mg" }, { name: "Phosphorus", amount: "197mg" }, { name: "Protein", amount: "10g" }, { name: "Vitamin A", amount: "68mcg" }, { name: "Zinc", amount: "0.8mg" }, { name: "Vitamin K2", amount: "~8mcg" }], benefits: ["Bone density", "Teeth health", "Muscle support", "Low lactose"], serving: "1 oz (28g)" },
  { name: "Sardines (with bones)", emoji: "🐟", description: "Calcium-rich fish with edible bones", nutrients: [{ name: "Calcium", amount: "325mg" }, { name: "Phosphorus", amount: "452mg" }, { name: "Vitamin D", amount: "164 IU" }, { name: "Omega-3s", amount: "1.3g" }, { name: "Selenium", amount: "45mcg" }, { name: "Vitamin B12", amount: "4.8mcg" }], benefits: ["Bone health", "Heart health", "Anti-inflammatory", "Convenient protein"], serving: "3 oz (85g)" },
  { name: "Kale", emoji: "🥬", description: "Best non-dairy plant source of calcium", nutrients: [{ name: "Calcium", amount: "101mg" }, { name: "Vitamin K", amount: "547mcg" }, { name: "Vitamin C", amount: "80mg" }, { name: "Magnesium", amount: "23mg" }, { name: "Manganese", amount: "0.5mg" }, { name: "Folate", amount: "19mcg" }], benefits: ["Bone density", "Heart health", "Cancer prevention", "Anti-inflammatory"], serving: "1 cup raw (67g)" },
  { name: "Broccoli", emoji: "🥦", description: "Calcium and phosphorus cruciferous vegetable", nutrients: [{ name: "Calcium", amount: "43mg" }, { name: "Phosphorus", amount: "60mg" }, { name: "Vitamin C", amount: "81mg" }, { name: "Vitamin K", amount: "93mcg" }, { name: "Folate", amount: "57mcg" }, { name: "Fiber", amount: "2.4g" }], benefits: ["Bone health", "Immune support", "Cancer prevention", "Digestive health"], serving: "1 cup chopped (91g)" },
  { name: "Almonds", emoji: "🥜", description: "Best nut for calcium intake", nutrients: [{ name: "Calcium", amount: "76mg" }, { name: "Magnesium", amount: "77mg" }, { name: "Phosphorus", amount: "137mg" }, { name: "Vitamin E", amount: "7.4mg" }, { name: "Fiber", amount: "3.5g" }, { name: "Protein", amount: "6g" }], benefits: ["Bone strength", "Heart health", "Blood sugar control", "Antioxidant-rich"], serving: "1 oz (28g)" },
  { name: "Edamame", emoji: "🫛", description: "Calcium and phosphorus-rich soy", nutrients: [{ name: "Calcium", amount: "98mg" }, { name: "Phosphorus", amount: "262mg" }, { name: "Magnesium", amount: "99mg" }, { name: "Protein", amount: "17g" }, { name: "Fiber", amount: "8g" }, { name: "Folate", amount: "482mcg" }], benefits: ["Bone health", "Plant-based calcium", "Muscle support", "Heart health"], serving: "1 cup (155g)" },
];

const MINERALS_TRACE: Superfood[] = [
  { name: "Oysters", emoji: "🐚", description: "Highest zinc and copper food source", nutrients: [{ name: "Zinc", amount: "32mg" }, { name: "Copper", amount: "4.5mg" }, { name: "Selenium", amount: "56mcg" }, { name: "Iron", amount: "5.1mg" }, { name: "Vitamin B12", amount: "16mcg" }, { name: "Omega-3s", amount: "0.7g" }], benefits: ["Immune function", "Wound healing", "Fertility support", "Antioxidant-rich"], serving: "3 oz (85g)" },
  { name: "Beef (Sirloin)", emoji: "🥩", description: "Richest source of heme iron and zinc", nutrients: [{ name: "Iron", amount: "2.5mg" }, { name: "Zinc", amount: "4.7mg" }, { name: "Selenium", amount: "22mcg" }, { name: "Vitamin B12", amount: "2.4mcg" }, { name: "Creatine", amount: "~0.5g" }, { name: "Phosphorus", amount: "195mg" }], benefits: ["Red blood cell formation", "Immune support", "Muscle building", "Energy production"], serving: "3 oz (85g)" },
  { name: "Spinach", emoji: "🥬", description: "Iron-rich leafy green (non-heme)", nutrients: [{ name: "Iron", amount: "6.4mg" }, { name: "Calcium", amount: "245mg" }, { name: "Magnesium", amount: "157mg" }, { name: "Vitamin C", amount: "18mg" }, { name: "Folate", amount: "263mcg" }, { name: "Vitamin K", amount: "888mcg" }], benefits: ["Anemia prevention", "Immune support", "Bone health", "Energy production"], serving: "1 cup cooked (180g)" },
  { name: "Lentils", emoji: "🥣", description: "Best plant source of iron and manganese", nutrients: [{ name: "Iron", amount: "6.6mg" }, { name: "Manganese", amount: "1mg" }, { name: "Folate", amount: "358mcg" }, { name: "Copper", amount: "0.5mg" }, { name: "Phosphorus", amount: "356mg" }, { name: "Fiber", amount: "15.6g" }], benefits: ["Iron for vegetarians", "Blood health", "Heart health", "Digestive health"], serving: "1 cup cooked (198g)" },
  { name: "Brazil Nuts", emoji: "🥜", description: "Highest selenium food — just 1-2 per day", nutrients: [{ name: "Selenium", amount: "544mcg" }, { name: "Magnesium", amount: "107mg" }, { name: "Phosphorus", amount: "206mg" }, { name: "Copper", amount: "0.5mg" }, { name: "Manganese", amount: "0.4mg" }, { name: "Zinc", amount: "1.2mg" }], benefits: ["Thyroid function", "Antioxidant protection", "Immune support", "Mood regulation"], serving: "1 oz / 6 nuts (28g)" },
  { name: "Salmon", emoji: "🐟", description: "Selenium and iodine-rich fatty fish", nutrients: [{ name: "Selenium", amount: "36mcg" }, { name: "Iodine", amount: "16mcg" }, { name: "Phosphorus", amount: "218mg" }, { name: "Potassium", amount: "534mg" }, { name: "Magnesium", amount: "30mg" }, { name: "Vitamin D", amount: "447 IU" }], benefits: ["Thyroid support", "Heart health", "Brain function", "Anti-inflammatory"], serving: "3 oz (85g)" },
  { name: "Shiitake Mushrooms", emoji: "🍄", description: "Rich in copper, manganese and selenium", nutrients: [{ name: "Copper", amount: "1.6mg" }, { name: "Manganese", amount: "0.7mg" }, { name: "Selenium", amount: "16mcg" }, { name: "Zinc", amount: "1.9mg" }, { name: "Vitamin B5", amount: "3mg" }, { name: "Fiber", amount: "3g" }], benefits: ["Immune support", "Antioxidant protection", "Heart health", "Anti-inflammatory"], serving: "1 cup cooked (145g)" },
  { name: "Cashews", emoji: "🥜", description: "High in copper and manganese", nutrients: [{ name: "Copper", amount: "0.6mg" }, { name: "Manganese", amount: "0.5mg" }, { name: "Magnesium", amount: "83mg" }, { name: "Phosphorus", amount: "168mg" }, { name: "Iron", amount: "1.9mg" }, { name: "Zinc", amount: "1.6mg" }], benefits: ["Nerve function", "Bone health", "Immune support", "Energy production"], serving: "1 oz (28g)" },
  { name: "Cod", emoji: "🐟", description: "Richest common food source of iodine", nutrients: [{ name: "Iodine", amount: "99mcg" }, { name: "Selenium", amount: "32mcg" }, { name: "Protein", amount: "20g" }, { name: "Phosphorus", amount: "117mg" }, { name: "Vitamin B12", amount: "0.9mcg" }, { name: "Niacin", amount: "1.5mg" }], benefits: ["Thyroid function", "Metabolism support", "Brain development", "Low in fat"], serving: "3 oz (85g)" },
  { name: "Seaweed (Nori)", emoji: "🌿", description: "Ocean plant packed with iodine and trace minerals", nutrients: [{ name: "Iodine", amount: "47mcg" }, { name: "Manganese", amount: "0.06mg" }, { name: "Iron", amount: "0.37mg" }, { name: "Calcium", amount: "9mg" }, { name: "Magnesium", amount: "3mg" }, { name: "Omega-3s", amount: "12mg" }], benefits: ["Thyroid support", "Gut health", "Antioxidant-rich", "Anti-inflammatory"], serving: "1 sheet / 2.5g" },
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
            {nutrient.name}
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
            <h3 className="mb-3 text-lg font-semibold">Key Nutrients <span className="text-xs font-normal text-zinc-500 dark:text-zinc-400">per serving</span></h3>
            <div className="space-y-1.5">
              {superfood.nutrients.map((nutrient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg bg-green-50 px-3 py-1.5 dark:bg-green-950/40"
                >
                  <span className="text-sm font-medium text-green-800 dark:text-green-200">{nutrient.name}</span>
                  <span className="text-sm font-bold text-green-700 dark:text-green-300">{nutrient.amount}</span>
                </div>
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
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-green-700 sm:w-auto"
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
