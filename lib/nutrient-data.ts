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
  absorptionTips?: string[];
  overdoseRisks?: string[];
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
      'Pork, lamb, and other meats',
      'Fish, shrimp, crab and other seafood',
      'Eggs and dairy products',
      'Legumes (beans, lentils)',
      'Tofu, tempeh, seitan',
      'Nuts and seeds',
      'Quinoa and whole grains'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can strain kidneys, especially in people with kidney disease',
      'May lead to dehydration if water intake is insufficient',
      'Excessive intake can displace other important nutrients',
      'May contribute to weight gain if consumed in excess calories'
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
      'Grains (bread, pasta, oats, rice, quinoa)',
      'Fruits and vegetables',
      'Legumes and beans',
      'Sweet potatoes',
      'Dairy products'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Excess refined carbs can lead to weight gain and obesity',
      'May increase risk of type 2 diabetes',
      'Can cause blood sugar spikes and crashes',
      'May contribute to tooth decay and cavities'
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
      'Eggs and full-fat dairy'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Excess saturated and trans fats increase heart disease risk',
      'Can lead to weight gain and obesity',
      'May raise LDL (bad) cholesterol levels',
      'High intake increases risk of certain cancers'
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
      'Whole grains, rice, bread, pasta and oats',
      'Beans (kidney, black, pinto), chickpeas and lentils',
      'Berries (raspberries, blackberries, strawberries)',
      'Pears & apples (especially with skin)',
      'Sweet potatoes & potatoes (with skin)',
      'Vegetables (broccoli, carrots, Brussels sprouts)',
      'Leafy greens (spinach, kale, swiss chard)',
      'Nuts and seeds',
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can cause bloating, gas, and digestive discomfort',
      'May lead to constipation if fluid intake is inadequate',
      'Can interfere with absorption of certain minerals',
      'Too much too quickly can cause diarrhea'
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
      'Liver',
      'Fish (Salmon, herring, mackerel, tuna)',
      'Spinach and kale',
      'Eggs & Dairy products (Milk, cheese, yogurt)',
      'Orange fruits (Cantaloupe, apricots, papaya and mango)',
      'Orange/Yellow Veggies (peppers, carrots, squash)',
      'Red Veggies (tomatoes, red peppers)',

    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can cause liver damage and toxicity',
      'May lead to birth defects during pregnancy',
      'Can cause bone loss and osteoporosis',
      'May result in headaches, dizziness, and nausea'
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
      'Kiwis, cantaloupe, guava, papaya and pineapple',
      'Berries (strawberries, blueberries, raspberries)',
      'Tomatoes, Potatoes, & Bell peppers',
      'Broccoli, Brussels sprouts and Cauliflower',
      'Spinach, kale and other leafy greens'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can cause digestive upset, diarrhea, and nausea',
      'May increase risk of kidney stones',
      'Can interfere with certain medical tests',
      'Large doses may cause stomach cramps'
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
      'Beef liver',
      'Orange juice fortified with vitamin D',
      'Fortified milk and plant milks',
      'Egg yolks',
      'Fortified cereals',
      'Mushrooms exposed to UV light'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can cause dangerous buildup of calcium in blood',
      'May lead to kidney damage and kidney stones',
      'Can cause nausea, vomiting, and weakness',
      'May result in bone loss and heart problems'
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
      'Nuts & seeds (almonds, sunflower seeds, hazelnuts)',
      'Spinach, broccoli, beet & turnip greens',
      'Asparagus, butternut squash and red bell peppers',
      'Avocados, mangoes, kiwis and papaya',
      'Wheat germ oil',
      'Peanut butter',
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can increase risk of bleeding and hemorrhagic stroke',
      'May interfere with blood clotting',
      'Can interact with blood-thinning medications',
      'High doses may cause fatigue and weakness'
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
      'Kale, spinach, collard greens, and other leafy greens',
      'Broccoli & brussels sprouts',
      'Lettuce and cabbage',
      'Blueberries, kiwi, avocado, figs, grapes, pumpkin',
      'Meat, liver, eggs and dairy products (smaller amounts)',
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can interfere with blood-thinning medications like warfarin',
      'May reduce effectiveness of anticoagulant therapy',
      'Excessive intake can increase blood clotting',
      'Supplemental forms may cause allergic reactions'
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
      'Fortified cereals & grains (breads, pastas, rice)',
      'Pork, Liver, eggs and fish',
      'Legumes (beans, lentils), green peas',
      'Sunflower seeds & macadamia nuts',
      'Asparagus, cauliflower and potatoes',
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Rarely toxic as it is water-soluble',
      'Very high doses may cause allergic reactions',
      'May cause skin irritation in sensitive individuals',
      'Excessive supplementation can lead to imbalances'
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
      'Dairy products (milk, yogurt, cheese)',
      'Eggs & chicken breast',
      'Lean beef, pork and organ meats (liver)',
      'Salmon, tuna, clams and oysters',
      'Green vegetables ( asparagus, broccoli, leafy greens)',
      'Mushrooms',
      'Almonds & sunflower seeds',
      'Beans and lentils',
      'Quinoa and avocado',
      'Fortified cereals and grains (bread, pasta, oats)',
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Generally considered safe as excess is excreted',
      'May cause bright yellow urine (harmless)',
      'Very high doses may cause diarrhea',
      'Can increase sensitivity to sunlight in rare cases'
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
      'Red meat(beef, beef liver, pork)',
      'Poultry (chicken, turkey)',
      'Fish (tuna, salmon, anchovies)',
      'Nuts, seeds and legumes',
      'Fortified cereals and grains (bread, pasta, rice)',
      'Bananas',
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can cause severe flushing and skin redness',
      'May lead to liver damage at high doses',
      'Can cause nausea, vomiting, and itching',
      'May worsen gout or peptic ulcers'
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
      'Beef liver',
      'Poultry (chicken, turkey)',
      'Fish (salmon, tuna)',
      'Fortified cereals',
      'Chickpeas',
      'Dark leafy greens',
      'Bananas and Orange fruits(papaya, cantaloupe, oranges)'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can cause severe nerve damage and numbness',
      'May lead to loss of muscle control',
      'Can cause painful skin lesions',
      'High doses may result in sensitivity to sunlight'
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
      'Beans, peanuts and sunflower seeds',
      'Fresh fruits and juices',
      'Whole grains',
      'Liver and eggs',
      'Seafood',
      'Fortified cereals and breads'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can mask vitamin B12 deficiency symptoms',
      'May increase cancer risk in high doses',
      'Can interact with certain medications',
      'May cause digestive issues and sleep problems'
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
      'Shellfish (clams, oysters, crab)',
      'Organ meats (beef and turkey liver)',
      'Fish (salmon, trout, tuna)',
      'Meat (beef, turkey, chicken)',
      'Eggs and dairy products',
      'Fortified plant milks and cereals',
      'Nutritional yeast'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Generally safe as excess is excreted',
      'May cause acne or skin conditions in some people',
      'Can interact with certain medications',
      'Rarely may cause allergic reactions'
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
      'Fortified plant milks, tofu & cereals',
      'Leafy greens (spinach, kale, collards)',
      'Broccoli, bok choy & okra',
      'Sardines and canned salmon with bones',
      'Almonds, Sunflower seeds and tahini',
      'Dried figs',
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Can cause kidney stones',
      'May lead to constipation and bloating',
      'Can interfere with absorption of iron and zinc',
      'May increase risk of heart disease at very high doses'
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
      'Red meat (beef, lamb, pork, liver)',
      'Eggs & Poultry (chicken, turkey)',
      'Oysters, clams, mussels',
      'Tuna, salmon and sardines',
      'Legumes (lentils, chickpeas, beans, kidney beans, tofu)',
      'Leafy greens (spinach, kale, beet greens)',
      'Broccoli, peas and sweet potatoes',
      'Pumpkin seeds, sesame seeds, flaxseeds, hempseeds, almonds, cashews',
      'Dried fruits (dates, figs, apricots, raisins, prunes)',
      'Fortified cereals, whole grains and breads',
      'Quinoa and oats',
    ],
    absorptionTips: [
      'Consume with vitamin C-rich foods to enhance absorption',
      'Limit inhibitors like coffee, black/green tea, and calcium-rich foods during iron-rich meals'
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
      'Beef, Salmon, Chicken and Turkey',
      'Dark leafy greens (cooked spinach, Swiss chard)',
      'Nuts (almonds, peanuts, cashews)',
      'Seeds (pumpkin, chia)',
      'Whole grains, brown rice , oats, oatmeal',
      'Legumes (black beans, kidney beans)',
      'White potatoes with skin',
      'Milk, yogurt, dark chocolate',
      'Bananas and raisins'
    ],
    absorptionTips: [
      'Pair with Vitamin D and B6 as it can improve magnesium uptake and utilization',
      'Limit high doses of calcium or zinc supplements which may interfere with magnesium absorption',
      'Limit excess caffeine, sugar and alcohol which can deplete magnesium levels',
      'Take with food and stay hydrated to support mineral absorption and transport'

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
      'Eggs & Dairy (Milk, cheese, yogurt)',
      'Meat (chicken, turkey, beef, pork, liver, lamb)',
      'Fish (salmon, tuna, cod, sardines, scallops)',
      'Legumes (lentils, chickpeas, beans, peas)',
      'Nuts (almonds, cashews, peanut butter) and seeds (sunflower, pumpkin, sesame)',
      'Whole grains (brown rice, oats, quinoa, whole wheat bread, amaranth)',
      'Corn and avocados'
    ],
    absorptionTips: [
      'Combine protein sources with whole grains for a balanced intake',
      'Limit sugary drinks and highly processed items to avoid excessive, poorly absorbed phosphate additives'
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
      'Chicken and salmon',
      'Dried fruits (raisins, apricots)',
      'Beans and lentils',
      'Potatoes and winter squash (acorn, butternut)',
      'Spinach, beet greens and broccoli',
      'Avocados, orange, orange juice, cantaloupe and bananas',
      'Coconut water, plant milks and dairy (milk, yogurt)',
      'Tomatoes and tomato products',
      'Cashews and almonds'
    ],
    absorptionTips: [],
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
      'Meats (cold cuts, bacon, hot dogs, sausage)',
      'Poultry (rotisserie chicken, deli turkey)',
      'Seafood (especially canned or frozen)',
      'Dairy products (cheese, cottage cheese, buttermilk)',
      'Breads and grains (breads, rolls, tortillas)',
      'Salty snacks (chips, pretzels, popcorn, crackers)',
      'Condiments and sauces (gravies, ketchup, salad dressings)',
      'Canned vegetables and soups',
      'Added salt during cooking or seasoning'
    ],
    absorptionTips: [],
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
      'Oysters, mussels, crab and lobster',
      'Red meat (beef, lamb, pork)',
      'Chiken and turkey',
      'Sardines and salmon',
      'Eggs and dairy (milk, cheese, yogurt)',
      'Legumes (lentils, chickpeas, beans, peas)',
      'Nuts (pumpkin, hemp, sesame and chia)',
      'Nuts (cashews, almonds and peanuts)',
      'Fortified cereals & Whole grains (oats, quinoa, brown rice)',
      'Mushrooms, kale and asparagus'
    ],
    absorptionTips: [
      'Soaking or sprouting legumes and grains can reduce phytates that inhibit zinc absorption',
      'Avoid high doses of iron or calcium supplements at the same time as they can interfere with zinc absorption'
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
      'Brazil nuts (richest source, moderation advised), sunflower seeds',
      'Seafood (tuna, halibut, shrimp, cod and sardines)',
      'Meat (beef, chicken, turkey, pork, liver)',
      'Eggs & dairy (milk, cheese, cottage cheese, yogurt)',
      'Legumes (lentils, baked beans, chickpeas)',
      'Whole grains (oats, brown rice, whole wheat bread)',
      'Mushrooms and spinach'
    ],
    absorptionTips: [],
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
      'Squid and Shellfish (shrimp, crab, lobster and prawns)',
      'Organ meats (liver, kidney and heart)',
      'Cheese and butter',
      'Red meat'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Increases risk of heart disease and stroke',
      'Can lead to plaque buildup in arteries',
      'May raise LDL (bad) cholesterol levels',
      'Increases risk of atherosclerosis'
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
      'Red meat and sausage',
      'Cheese and cream',
      'Palm oil',
      'Processed baked goods'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Increases LDL (bad) cholesterol significantly',
      'Raises risk of heart disease and stroke',
      'May promote inflammation in the body',
      'Can contribute to insulin resistance'
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
      'Baked goods'
    ],
    absorptionTips: [],
    overdoseRisks: [
      'Increases risk of obesity and type 2 diabetes',
      'Can cause tooth decay and cavities',
      'May lead to fatty liver disease',
      'Increases inflammation and heart disease risk'
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
