/**
 * Comprehensive nutrient database with educational information
 */

export type NutrientInfo = {
  name: string;
  category: 'Macronutrients' | 'Vitamins' | 'Minerals';
  description: string;
  benefits: string[];
  sources: string[];
  dailyValue?: string;
  unit: string;
};

export const nutrientDatabase: Record<string, NutrientInfo> = {
  // MACRONUTRIENTS
  protein: {
    name: 'Protein',
    category: 'Macronutrients',
    unit: 'g',
    description: 'Essential macronutrient made of amino acids that builds and repairs tissues, makes enzymes and hormones, and supports immune function.',
    benefits: [
      'Builds and repairs muscle tissue',
      'Supports immune system function',
      'Creates enzymes and hormones',
      'Helps maintain healthy skin, hair, and nails',
      'Promotes satiety and weight management'
    ],
    sources: [
      'Chicken, turkey, lean beef',
      'Fish and seafood',
      'Eggs and dairy products',
      'Legumes (beans, lentils)',
      'Tofu, tempeh, seitan',
      'Nuts and seeds',
      'Quinoa'
    ],
    dailyValue: '50g (based on 2,000 calorie diet)'
  },
  carbs: {
    name: 'Carbohydrates',
    category: 'Macronutrients',
    unit: 'g',
    description: 'Primary energy source for the body, particularly the brain and muscles. Includes sugars, starches, and fiber.',
    benefits: [
      'Provides quick energy for physical activity',
      'Fuels brain and nervous system',
      'Supports digestive health (fiber)',
      'Helps preserve muscle mass',
      'Enhances athletic performance'
    ],
    sources: [
      'Whole grains (oats, brown rice, quinoa)',
      'Fruits and vegetables',
      'Legumes and beans',
      'Sweet potatoes',
      'Whole wheat bread and pasta',
      'Dairy products'
    ],
    dailyValue: '275g (based on 2,000 calorie diet)'
  },
  fat: {
    name: 'Total Fat',
    category: 'Macronutrients',
    unit: 'g',
    description: 'Essential macronutrient that provides energy, supports cell growth, protects organs, and helps absorb certain vitamins.',
    benefits: [
      'Provides concentrated energy',
      'Absorbs fat-soluble vitamins (A, D, E, K)',
      'Supports brain and nervous system health',
      'Produces important hormones',
      'Maintains healthy skin and hair',
      'Insulates and protects organs'
    ],
    sources: [
      'Avocados',
      'Nuts and nut butters',
      'Seeds (chia, flax, hemp)',
      'Olive oil and coconut oil',
      'Fatty fish (salmon, mackerel)',
      'Dark chocolate',
      'Eggs'
    ],
    dailyValue: '78g (based on 2,000 calorie diet)'
  },
  fiber: {
    name: 'Dietary Fiber',
    category: 'Macronutrients',
    unit: 'g',
    description: 'Indigestible carbohydrate that supports digestive health, helps control blood sugar, and promotes satiety.',
    benefits: [
      'Promotes digestive regularity',
      'Supports healthy gut bacteria',
      'Helps control blood sugar levels',
      'Lowers cholesterol',
      'Aids in weight management',
      'Reduces risk of chronic diseases'
    ],
    sources: [
      'Whole grains and oats',
      'Beans and lentils',
      'Fruits (especially with skin)',
      'Vegetables',
      'Nuts and seeds',
      'Chia seeds and flaxseed'
    ],
    dailyValue: '28g'
  },
  
  // VITAMINS
  vitamin_a: {
    name: 'Vitamin A',
    category: 'Vitamins',
    unit: 'µg',
    description: 'Fat-soluble vitamin essential for vision, immune function, reproduction, and cellular communication.',
    benefits: [
      'Maintains healthy vision and eye health',
      'Supports immune system function',
      'Promotes skin health and cell growth',
      'Essential for reproduction',
      'Supports heart, lung, and kidney function'
    ],
    sources: [
      'Sweet potatoes and carrots',
      'Spinach and kale',
      'Liver',
      'Eggs',
      'Dairy products',
      'Cantaloupe and mango',
      'Red bell peppers'
    ],
    dailyValue: '900 µg (men), 700 µg (women)'
  },
  vitamin_c: {
    name: 'Vitamin C',
    category: 'Vitamins',
    unit: 'mg',
    description: 'Water-soluble antioxidant vitamin essential for immune function, collagen production, and iron absorption.',
    benefits: [
      'Boosts immune system',
      'Produces collagen for skin and wound healing',
      'Powerful antioxidant protection',
      'Enhances iron absorption',
      'Supports cardiovascular health',
      'May reduce duration of colds'
    ],
    sources: [
      'Citrus fruits (oranges, lemons, grapefruit)',
      'Strawberries and kiwi',
      'Bell peppers',
      'Broccoli and Brussels sprouts',
      'Tomatoes',
      'Spinach and kale'
    ],
    dailyValue: '90 mg (men), 75 mg (women)'
  },
  vitamin_d: {
    name: 'Vitamin D',
    category: 'Vitamins',
    unit: 'µg',
    description: 'Fat-soluble vitamin crucial for calcium absorption, bone health, immune function, and mood regulation.',
    benefits: [
      'Promotes calcium absorption for strong bones',
      'Supports immune system health',
      'Reduces inflammation',
      'Regulates mood and may prevent depression',
      'Supports muscle function',
      'May reduce cancer risk'
    ],
    sources: [
      'Sunlight exposure (primary source)',
      'Fatty fish (salmon, tuna, mackerel)',
      'Fortified milk and plant milks',
      'Egg yolks',
      'Fortified cereals',
      'Mushrooms exposed to UV light'
    ],
    dailyValue: '15-20 µg (600-800 IU)'
  },
  vitamin_e: {
    name: 'Vitamin E',
    category: 'Vitamins',
    unit: 'mg',
    description: 'Fat-soluble antioxidant that protects cells from damage and supports immune function.',
    benefits: [
      'Powerful antioxidant protection',
      'Supports immune health',
      'Promotes skin health',
      'Protects eye health',
      'May reduce heart disease risk',
      'Supports brain health'
    ],
    sources: [
      'Sunflower seeds and almonds',
      'Spinach and Swiss chard',
      'Avocados',
      'Wheat germ oil',
      'Peanut butter',
      'Red bell peppers'
    ],
    dailyValue: '15 mg'
  },
  vitamin_k: {
    name: 'Vitamin K',
    category: 'Vitamins',
    unit: 'µg',
    description: 'Fat-soluble vitamin essential for blood clotting and bone metabolism.',
    benefits: [
      'Essential for blood clotting',
      'Supports bone health and strength',
      'May improve heart health',
      'Promotes wound healing',
      'May prevent calcification of arteries'
    ],
    sources: [
      'Kale, spinach, and collard greens',
      'Brussels sprouts and broccoli',
      'Parsley and basil',
      'Asparagus',
      'Cabbage',
      'Fermented foods (natto)'
    ],
    dailyValue: '120 µg (men), 90 µg (women)'
  },
  thiamin: {
    name: 'Thiamin (Vitamin B1)',
    category: 'Vitamins',
    unit: 'mg',
    description: 'Water-soluble B vitamin essential for energy metabolism and nerve function.',
    benefits: [
      'Converts food into energy',
      'Supports nerve function',
      'Promotes healthy metabolism',
      'Supports cardiovascular health',
      'May improve mood and memory'
    ],
    sources: [
      'Whole grains and fortified cereals',
      'Pork and ham',
      'Legumes and beans',
      'Sunflower seeds',
      'Nutritional yeast',
      'Brown rice'
    ],
    dailyValue: '1.2 mg (men), 1.1 mg (women)'
  },
  riboflavin: {
    name: 'Riboflavin (Vitamin B2)',
    category: 'Vitamins',
    unit: 'mg',
    description: 'Water-soluble B vitamin important for energy production and cellular function.',
    benefits: [
      'Helps convert food to energy',
      'Supports healthy skin and eyes',
      'Aids in red blood cell production',
      'Supports nervous system',
      'Promotes growth and development'
    ],
    sources: [
      'Dairy products (milk, yogurt)',
      'Eggs',
      'Lean meats and organ meats',
      'Green vegetables',
      'Fortified cereals',
      'Almonds'
    ],
    dailyValue: '1.3 mg (men), 1.1 mg (women)'
  },
  niacin: {
    name: 'Niacin (Vitamin B3)',
    category: 'Vitamins',
    unit: 'mg',
    description: 'Water-soluble B vitamin essential for DNA repair, energy metabolism, and nervous system function.',
    benefits: [
      'Supports energy metabolism',
      'Improves cholesterol levels',
      'Supports brain function',
      'Promotes healthy skin',
      'Aids in DNA repair',
      'Supports digestive health'
    ],
    sources: [
      'Chicken, turkey, and tuna',
      'Beef and liver',
      'Peanuts and legumes',
      'Whole grains',
      'Mushrooms',
      'Fortified cereals'
    ],
    dailyValue: '16 mg (men), 14 mg (women)'
  },
  vitamin_b6: {
    name: 'Vitamin B6',
    category: 'Vitamins',
    unit: 'mg',
    description: 'Water-soluble vitamin involved in over 100 enzyme reactions, particularly protein metabolism.',
    benefits: [
      'Supports brain development and function',
      'Helps produce neurotransmitters',
      'Aids in hemoglobin production',
      'Supports immune function',
      'May reduce symptoms of depression',
      'Helps regulate hormones'
    ],
    sources: [
      'Chickpeas and poultry',
      'Fish (salmon, tuna)',
      'Potatoes and sweet potatoes',
      'Bananas',
      'Fortified cereals',
      'Spinach'
    ],
    dailyValue: '1.3-1.7 mg'
  },
  folate: {
    name: 'Folate (Vitamin B9)',
    category: 'Vitamins',
    unit: 'µg',
    description: 'Water-soluble B vitamin crucial for DNA synthesis, cell division, and preventing birth defects.',
    benefits: [
      'Essential for fetal development',
      'Supports DNA and RNA formation',
      'Aids in red blood cell production',
      'Prevents neural tube defects',
      'May reduce depression risk',
      'Supports heart health'
    ],
    sources: [
      'Leafy greens (spinach, kale)',
      'Legumes and lentils',
      'Asparagus and broccoli',
      'Avocados',
      'Fortified grains and cereals',
      'Citrus fruits'
    ],
    dailyValue: '400 µg'
  },
  vitamin_b12: {
    name: 'Vitamin B12',
    category: 'Vitamins',
    unit: 'µg',
    description: 'Water-soluble vitamin essential for nerve function, DNA synthesis, and red blood cell formation.',
    benefits: [
      'Supports nerve function and health',
      'Aids in red blood cell formation',
      'Supports DNA synthesis',
      'Boosts energy and reduces fatigue',
      'Improves mood and cognitive function',
      'Supports bone health'
    ],
    sources: [
      'Meat, poultry, and fish',
      'Eggs and dairy products',
      'Fortified plant milks',
      'Fortified cereals',
      'Nutritional yeast',
      'Shellfish (clams, mussels)'
    ],
    dailyValue: '2.4 µg'
  },
  
  // MINERALS
  calcium: {
    name: 'Calcium',
    category: 'Minerals',
    unit: 'mg',
    description: 'Essential mineral for building and maintaining strong bones and teeth, and supporting various cellular functions.',
    benefits: [
      'Builds and maintains strong bones and teeth',
      'Supports muscle function and contraction',
      'Enables nerve signal transmission',
      'Regulates heart rhythm',
      'Helps blood clotting',
      'May reduce risk of osteoporosis'
    ],
    sources: [
      'Dairy products (milk, cheese, yogurt)',
      'Fortified plant milks',
      'Leafy greens (kale, collards)',
      'Sardines and canned salmon with bones',
      'Tofu (calcium-set)',
      'Almonds'
    ],
    dailyValue: '1,000-1,200 mg'
  },
  iron: {
    name: 'Iron',
    category: 'Minerals',
    unit: 'mg',
    description: 'Essential mineral for oxygen transport in blood and energy production.',
    benefits: [
      'Transports oxygen throughout the body',
      'Supports energy production',
      'Boosts immune function',
      'Improves concentration and focus',
      'Regulates body temperature',
      'Prevents anemia'
    ],
    sources: [
      'Red meat and organ meats',
      'Poultry and seafood',
      'Beans and lentils',
      'Spinach and Swiss chard',
      'Fortified cereals',
      'Tofu and tempeh',
      'Pumpkin seeds'
    ],
    dailyValue: '8 mg (men), 18 mg (women)'
  },
  magnesium: {
    name: 'Magnesium',
    category: 'Minerals',
    unit: 'mg',
    description: 'Essential mineral involved in over 300 biochemical reactions, including energy production and muscle function.',
    benefits: [
      'Supports muscle and nerve function',
      'Regulates blood pressure',
      'Supports bone health',
      'Helps control blood sugar',
      'Reduces inflammation',
      'May improve sleep quality',
      'Reduces anxiety and stress'
    ],
    sources: [
      'Dark leafy greens (spinach, Swiss chard)',
      'Nuts (almonds, cashews)',
      'Seeds (pumpkin, chia)',
      'Whole grains',
      'Legumes',
      'Avocados',
      'Dark chocolate'
    ],
    dailyValue: '400-420 mg (men), 310-320 mg (women)'
  },
  phosphorus: {
    name: 'Phosphorus',
    category: 'Minerals',
    unit: 'mg',
    description: 'Essential mineral for bone health, energy production, and cellular function.',
    benefits: [
      'Builds strong bones and teeth',
      'Supports energy production (ATP)',
      'Helps filter waste in kidneys',
      'Aids in muscle recovery',
      'Supports DNA and RNA synthesis',
      'Maintains pH balance'
    ],
    sources: [
      'Dairy products',
      'Meat and poultry',
      'Fish and seafood',
      'Eggs',
      'Nuts and seeds',
      'Whole grains',
      'Legumes'
    ],
    dailyValue: '700 mg'
  },
  potassium: {
    name: 'Potassium',
    category: 'Minerals',
    unit: 'mg',
    description: 'Essential mineral and electrolyte for heart health, muscle function, and blood pressure regulation.',
    benefits: [
      'Regulates blood pressure',
      'Supports heart health',
      'Reduces stroke risk',
      'Prevents muscle cramps',
      'Supports bone health',
      'Reduces kidney stone risk',
      'Maintains fluid balance'
    ],
    sources: [
      'Bananas and oranges',
      'Sweet potatoes and potatoes',
      'Spinach and Swiss chard',
      'Avocados',
      'Beans and lentils',
      'Yogurt',
      'Salmon and tuna'
    ],
    dailyValue: '3,400 mg (men), 2,600 mg (women)'
  },
  sodium: {
    name: 'Sodium',
    category: 'Minerals',
    unit: 'mg',
    description: 'Essential electrolyte for fluid balance, nerve function, and muscle contraction. Most people consume too much.',
    benefits: [
      'Maintains fluid balance',
      'Supports nerve signal transmission',
      'Enables muscle contraction',
      'Regulates blood pressure and volume'
    ],
    sources: [
      'Table salt',
      'Processed and packaged foods',
      'Canned soups and vegetables',
      'Deli meats',
      'Cheese',
      'Bread and baked goods'
    ],
    dailyValue: '2,300 mg (limit)'
  },
  zinc: {
    name: 'Zinc',
    category: 'Minerals',
    unit: 'mg',
    description: 'Essential mineral for immune function, wound healing, DNA synthesis, and cell division.',
    benefits: [
      'Boosts immune system function',
      'Promotes wound healing',
      'Supports sense of taste and smell',
      'Aids in DNA synthesis',
      'Supports growth and development',
      'May reduce duration of colds'
    ],
    sources: [
      'Oysters and shellfish',
      'Red meat and poultry',
      'Beans and lentils',
      'Nuts and seeds',
      'Whole grains',
      'Dairy products',
      'Dark chocolate'
    ],
    dailyValue: '11 mg (men), 8 mg (women)'
  },
  selenium: {
    name: 'Selenium',
    category: 'Minerals',
    unit: 'µg',
    description: 'Essential trace mineral with powerful antioxidant properties that protects cells from damage.',
    benefits: [
      'Powerful antioxidant protection',
      'Supports thyroid function',
      'Boosts immune system',
      'May reduce cancer risk',
      'Protects cognitive function',
      'Supports heart health'
    ],
    sources: [
      'Brazil nuts (richest source)',
      'Seafood (tuna, sardines)',
      'Meat and poultry',
      'Eggs',
      'Whole grains',
      'Sunflower seeds'
    ],
    dailyValue: '55 µg'
  },
  cholesterol: {
    name: 'Cholesterol',
    category: 'Macronutrients',
    unit: 'mg',
    description: 'Waxy substance found in animal products. Your body makes cholesterol and also gets it from food.',
    benefits: [
      'Produces hormones (estrogen, testosterone)',
      'Builds cell membranes',
      'Produces vitamin D',
      'Helps digest fats'
    ],
    sources: [
      'Egg yolks',
      'Shellfish (shrimp, lobster)',
      'Organ meats',
      'Cheese and butter',
      'Red meat'
    ],
    dailyValue: '<300 mg (limit for healthy individuals)'
  },
  saturated_fat: {
    name: 'Saturated Fat',
    category: 'Macronutrients',
    unit: 'g',
    description: 'Type of fat typically solid at room temperature. Should be consumed in moderation.',
    benefits: [
      'Provides energy',
      'Supports hormone production',
      'Helps absorb fat-soluble vitamins'
    ],
    sources: [
      'Butter and ghee',
      'Coconut oil',
      'Red meat',
      'Cheese and cream',
      'Palm oil',
      'Processed baked goods'
    ],
    dailyValue: '<22 g (limit, based on 2,000 calorie diet)'
  },
  sugars: {
    name: 'Total Sugars',
    category: 'Macronutrients',
    unit: 'g',
    description: 'Simple carbohydrates that provide quick energy. Includes both natural and added sugars.',
    benefits: [
      'Provides quick energy',
      'Enhances flavor of foods',
      'Can improve athletic performance (when timed appropriately)'
    ],
    sources: [
      'Fruits (natural sugars)',
      'Milk and yogurt (lactose)',
      'Honey and maple syrup',
      'Candy and sweets',
      'Soft drinks',
      'Baked goods'
    ],
    dailyValue: '<50 g (limit for added sugars)'
  }
};

/**
 * Get all nutrients organized by category and sorted alphabetically
 */
export function getNutrientsByCategory() {
  const categories: Record<string, NutrientInfo[]> = {
    'Macronutrients': [],
    'Vitamins': [],
    'Minerals': []
  };

  Object.values(nutrientDatabase).forEach(nutrient => {
    categories[nutrient.category].push(nutrient);
  });

  // Sort each category alphabetically
  Object.keys(categories).forEach(category => {
    categories[category].sort((a, b) => a.name.localeCompare(b.name));
  });

  return categories;
}

/**
 * Get all nutrients sorted alphabetically (A-Z directory)
 */
export function getAllNutrientsAlphabetically() {
  return Object.values(nutrientDatabase).sort((a, b) => 
    a.name.localeCompare(b.name)
  );
}
