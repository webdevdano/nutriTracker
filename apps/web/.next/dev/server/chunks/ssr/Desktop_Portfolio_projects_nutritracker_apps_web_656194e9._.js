module.exports = [
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/lib/nutrient-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Comprehensive nutrient database with educational information
 */ __turbopack_context__.s([
    "getAllNutrientsAlphabetically",
    ()=>getAllNutrientsAlphabetically,
    "getNutrientsByCategory",
    ()=>getNutrientsByCategory,
    "nutrientDatabase",
    ()=>nutrientDatabase
]);
const nutrientDatabase = {
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
            'Nuts and seeds'
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
            'Red Veggies (tomatoes, red peppers)'
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
            'Peanut butter'
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
            'Meat, liver, eggs and dairy products (smaller amounts)'
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
            'Asparagus, cauliflower and potatoes'
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
            'Fortified cereals and grains (bread, pasta, oats)'
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
            'Bananas'
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
            'Dried figs'
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
            'Quinoa and oats'
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
        overdoseRisks: [
            'Can cause dangerous irregular heartbeat',
            'May lead to muscle weakness and paralysis',
            'Can cause nausea and vomiting',
            'Life-threatening in people with kidney problems'
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
        overdoseRisks: [
            'Increases risk of high blood pressure',
            'Can lead to heart disease and stroke',
            'May cause water retention and bloating',
            'Increases risk of kidney disease and stomach cancer'
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
        overdoseRisks: [
            'Can cause copper deficiency',
            'May lead to nausea and vomiting',
            'Can impair immune function',
            'May reduce HDL (good) cholesterol levels'
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
        overdoseRisks: [
            'Can cause hair loss and brittle nails',
            'May lead to garlic breath and metallic taste',
            'Can cause digestive upset and fatigue',
            'May result in nerve damage at very high doses'
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
function getNutrientsByCategory() {
    const categories = {
        'Macronutrients': [],
        'Vitamins': [],
        'Minerals': []
    };
    Object.values(nutrientDatabase).forEach((nutrient)=>{
        categories[nutrient.category].push(nutrient);
    });
    // Sort each category alphabetically
    Object.keys(categories).forEach((category)=>{
        categories[category].sort((a, b)=>a.name.localeCompare(b.name));
    });
    return categories;
}
function getAllNutrientsAlphabetically() {
    return Object.values(nutrientDatabase).sort((a, b)=>a.name.localeCompare(b.name));
}
}),
"[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/next@16.1.2_@babel+core@7.29.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/node_modules/.pnpm/next@16.1.2_@babel+core@7.29.0_babel-plugin-react-compiler@1.0.0_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$nutrient$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/Portfolio_projects/nutritracker/apps/web/lib/nutrient-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function FoodModal({ food, onClose }) {
    const [quantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showAddSuccess, setShowAddSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleAddToGroceryList = async ()=>{
        try {
            const response = await fetch("/api/grocery", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    food_name: food.name,
                    quantity: quantity,
                    unit: food.serving || "1 serving"
                })
            });
            if (response.ok) {
                setShowAddSuccess(true);
                setTimeout(()=>setShowAddSuccess(false), 2000);
            } else {
                const error = await response.json();
                console.error("Error adding to grocery list:", error);
                alert("Failed to add to grocery list. Please try again.");
            }
        } catch (error) {
            console.error("Error adding to grocery list:", error);
            alert("Failed to add to grocery list. Please try again.");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-full max-w-md rounded-2xl border border-zinc-200 bg-linear-to-br from-yellow-50 via-white to-green-50 p-0 shadow-2xl dark:border-zinc-800 dark:from-yellow-950/30 dark:via-zinc-900 dark:to-green-950/30",
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "absolute right-4 top-4 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                    onClick: onClose,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-5 w-5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 55,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col items-center gap-2 rounded-t-2xl bg-linear-to-r from-yellow-100 via-green-50 to-blue-100 px-8 pb-4 pt-8 dark:from-yellow-950/40 dark:via-zinc-900 dark:to-green-950/40",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-4xl",
                            children: food.emoji
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-1 text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-white",
                            children: food.name
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 60,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mb-2 text-base text-zinc-600 dark:text-zinc-300 text-center",
                            children: food.description
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 61,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-8 pb-6 pt-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "mb-2 text-lg font-semibold",
                            children: "Key Nutrients"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 64,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2 mb-4",
                            children: food.nutrients.map((nutrient, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800 dark:bg-green-950 dark:text-green-200",
                                    children: nutrient
                                }, i, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 67,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-2 text-xs text-zinc-500 dark:text-zinc-400",
                            children: [
                                "Serving: ",
                                food.serving
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 70,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 text-xs text-green-700 dark:text-green-300",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: "Benefits:"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "mt-1 space-y-1",
                                    children: food.benefits?.map((benefit, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "h-4 w-4 text-green-500 inline",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 3,
                                                        d: "M5 13l4 4L19 7"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                        lineNumber: 77,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: benefit
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 79,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, i, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleAddToGroceryList,
                                        className: "flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-green-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-5 w-5",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 88,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                lineNumber: 87,
                                                columnNumber: 17
                                            }, this),
                                            "Add to Grocery List"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this),
                                showAddSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/30 dark:text-green-200",
                                    children: [
                                        "✓ ",
                                        food.name,
                                        " added to grocery list!"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
const SUPERFOODS = [
    {
        name: "Spinach",
        emoji: "🥬",
        description: "Nutrient-dense leafy green powerhouse",
        nutrients: [
            "Iron",
            "Calcium",
            "Vitamin A",
            "Vitamin K",
            "Vitamin C",
            "Folate",
            "Magnesium"
        ],
        benefits: [
            "Supports bone health",
            "Boosts immune system",
            "Improves eye health",
            "Rich in antioxidants"
        ],
        serving: "1 cup cooked (180g)"
    },
    {
        name: "Salmon",
        emoji: "🐟",
        description: "Omega-3 rich fatty fish",
        nutrients: [
            "Protein",
            "Omega-3s",
            "Vitamin D",
            "Vitamin B12",
            "Selenium",
            "Niacin"
        ],
        benefits: [
            "Heart health",
            "Brain function",
            "Reduces inflammation",
            "High-quality protein"
        ],
        serving: "3 oz (85g)"
    },
    {
        name: "Blueberries",
        emoji: "🫐",
        description: "Antioxidant-packed superfruit",
        nutrients: [
            "Vitamin C",
            "Vitamin K",
            "Fiber",
            "Manganese"
        ],
        benefits: [
            "Brain health",
            "Anti-aging",
            "Supports heart health",
            "May improve memory"
        ],
        serving: "1 cup (148g)"
    },
    {
        name: "Sweet Potato",
        emoji: "🍠",
        description: "Complex carb loaded with vitamins",
        nutrients: [
            "Vitamin A",
            "Vitamin C",
            "Fiber",
            "Potassium",
            "Manganese",
            "Vitamin B6"
        ],
        benefits: [
            "Eye health",
            "Immune support",
            "Digestive health",
            "Stable energy"
        ],
        serving: "1 medium (150g)"
    },
    {
        name: "Greek Yogurt",
        emoji: "🥛",
        description: "Protein-rich probiotic food",
        nutrients: [
            "Protein",
            "Calcium",
            "Vitamin B12",
            "Probiotics",
            "Phosphorus",
            "Selenium"
        ],
        benefits: [
            "Gut health",
            "Bone strength",
            "Muscle building",
            "Immune support"
        ],
        serving: "1 cup (245g)"
    },
    {
        name: "Quinoa",
        emoji: "🌾",
        description: "Complete protein grain alternative",
        nutrients: [
            "Protein",
            "Fiber",
            "Magnesium",
            "Iron",
            "Zinc",
            "Folate",
            "Manganese"
        ],
        benefits: [
            "Complete protein",
            "Gluten-free",
            "Rich in minerals",
            "Supports digestion"
        ],
        serving: "1 cup cooked (185g)"
    },
    {
        name: "Kale",
        emoji: "🥗",
        description: "Superfood leafy green champion",
        nutrients: [
            "Vitamin K",
            "Vitamin A",
            "Vitamin C",
            "Calcium",
            "Iron",
            "Folate"
        ],
        benefits: [
            "Bone health",
            "Anti-inflammatory",
            "Detoxification",
            "Cancer prevention"
        ],
        serving: "1 cup raw (67g)"
    },
    {
        name: "Eggs",
        emoji: "🥚",
        description: "Complete protein with essential nutrients",
        nutrients: [
            "Protein",
            "Vitamin B12",
            "Vitamin D",
            "Selenium",
            "Choline",
            "Riboflavin"
        ],
        benefits: [
            "Muscle building",
            "Brain health",
            "Eye health",
            "Nutrient-dense"
        ],
        serving: "1 large egg (50g)"
    },
    {
        name: "Avocado",
        emoji: "🥑",
        description: "Healthy fat powerhouse",
        nutrients: [
            "Healthy Fats",
            "Fiber",
            "Potassium",
            "Vitamin E",
            "Vitamin K",
            "Folate"
        ],
        benefits: [
            "Heart health",
            "Nutrient absorption",
            "Satiety",
            "Skin health"
        ],
        serving: "1/2 avocado (100g)"
    },
    {
        name: "Broccoli",
        emoji: "🥦",
        description: "Cruciferous vegetable with cancer-fighting compounds",
        nutrients: [
            "Vitamin C",
            "Vitamin K",
            "Folate",
            "Fiber",
            "Potassium",
            "Iron"
        ],
        benefits: [
            "Cancer prevention",
            "Bone health",
            "Digestive health",
            "Immune support"
        ],
        serving: "1 cup chopped (91g)"
    },
    {
        name: "Chia Seeds",
        emoji: "🌱",
        description: "Tiny seeds packed with omega-3s",
        nutrients: [
            "Omega-3 Fatty Acids",
            "Fiber",
            "Protein",
            "Calcium",
            "Magnesium",
            "Phosphorus"
        ],
        benefits: [
            "Heart health",
            "Digestive health",
            "Bone strength",
            "Blood sugar control"
        ],
        serving: "2 tbsp (28g)"
    }
];
const allNutrients = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$nutrient$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllNutrientsAlphabetically"])();
const CARBS_FOODS = [
    {
        name: "Oats",
        emoji: "🌾",
        description: "Whole grain high in fiber and complex carbs",
        nutrients: [
            "Carbohydrates",
            "Fiber",
            "Protein",
            "Magnesium",
            "Iron",
            "Zinc"
        ],
        benefits: [
            "Sustained energy",
            "Digestive health",
            "Heart health",
            "Blood sugar control"
        ],
        serving: "1 cup cooked (156g)"
    },
    {
        name: "Sweet Potato",
        emoji: "🍠",
        description: "Complex carb loaded with vitamins",
        nutrients: [
            "Carbohydrates",
            "Vitamin A",
            "Vitamin C",
            "Fiber",
            "Potassium",
            "Manganese"
        ],
        benefits: [
            "Eye health",
            "Immune support",
            "Digestive health",
            "Stable energy"
        ],
        serving: "1 medium (150g)"
    },
    {
        name: "Brown Rice",
        emoji: "🍚",
        description: "Whole grain source of complex carbs",
        nutrients: [
            "Carbohydrates",
            "Fiber",
            "Magnesium",
            "Phosphorus",
            "Selenium"
        ],
        benefits: [
            "Long-lasting energy",
            "Digestive health",
            "Supports metabolism"
        ],
        serving: "1 cup cooked (195g)"
    },
    {
        name: "Banana",
        emoji: "🍌",
        description: "Natural sugars and potassium",
        nutrients: [
            "Carbohydrates",
            "Potassium",
            "Vitamin B6",
            "Vitamin C",
            "Fiber"
        ],
        benefits: [
            "Quick energy",
            "Muscle function",
            "Digestive health"
        ],
        serving: "1 medium (118g)"
    },
    {
        name: "Quinoa",
        emoji: "🌱",
        description: "Gluten-free whole grain alternative",
        nutrients: [
            "Carbohydrates",
            "Protein",
            "Fiber",
            "Magnesium",
            "Iron",
            "Zinc"
        ],
        benefits: [
            "Complete protein",
            "Sustained energy",
            "Rich in minerals"
        ],
        serving: "1 cup cooked (185g)"
    },
    {
        name: "Black Beans",
        emoji: "🫘",
        description: "Legume high in fiber and complex carbs",
        nutrients: [
            "Carbohydrates",
            "Protein",
            "Fiber",
            "Folate",
            "Magnesium",
            "Iron"
        ],
        benefits: [
            "Digestive health",
            "Blood sugar control",
            "Heart health"
        ],
        serving: "1 cup cooked (172g)"
    }
];
const PROTEINS_FOODS = [
    {
        name: "Chicken Breast",
        emoji: "🍗",
        description: "Lean animal protein",
        nutrients: [
            "Protein",
            "Niacin",
            "Vitamin B6",
            "Phosphorus",
            "Selenium",
            "Low Fat"
        ],
        benefits: [
            "Muscle building",
            "Weight management",
            "Supports metabolism",
            "Low in fat"
        ],
        serving: "3 oz (85g)"
    },
    {
        name: "Lentils",
        emoji: "🥣",
        description: "Plant-based protein and fiber",
        nutrients: [
            "Protein",
            "Fiber",
            "Iron",
            "Folate",
            "Manganese",
            "Low Fat"
        ],
        benefits: [
            "Heart health",
            "Digestive health",
            "Blood sugar control",
            "Rich in iron"
        ],
        serving: "1 cup cooked (198g)"
    },
    {
        name: "Greek Yogurt",
        emoji: "🥛",
        description: "High-protein dairy",
        nutrients: [
            "Protein",
            "Calcium",
            "Vitamin B12",
            "Probiotics",
            "Phosphorus",
            "Selenium"
        ],
        benefits: [
            "Gut health",
            "Bone strength",
            "Muscle building",
            "Immune support"
        ],
        serving: "1 cup (245g)"
    },
    {
        name: "Tofu",
        emoji: "🍥",
        description: "Soy-based complete protein",
        nutrients: [
            "Protein",
            "Calcium",
            "Iron",
            "Magnesium",
            "Low Fat",
            "Isoflavones"
        ],
        benefits: [
            "Heart health",
            "Bone health",
            "Plant-based protein",
            "Low in fat"
        ],
        serving: "3 oz (85g)"
    }
];
const VITAMINS_FOODS = [
    {
        name: "Spinach",
        emoji: "🥬",
        description: "Rich in vitamin K, A, C",
        nutrients: [
            "Vitamin K",
            "Vitamin A",
            "Vitamin C",
            "Folate",
            "Iron",
            "Calcium"
        ],
        benefits: [
            "Supports bone health",
            "Boosts immune system",
            "Improves eye health",
            "Rich in antioxidants"
        ],
        serving: "1 cup cooked (180g)"
    },
    {
        name: "Citrus Fruits",
        emoji: "🍋",
        description: "High in vitamin C",
        nutrients: [
            "Vitamin C",
            "Folate",
            "Potassium",
            "Fiber",
            "Antioxidants"
        ],
        benefits: [
            "Boosts immune system",
            "Improves skin health",
            "Aids iron absorption",
            "Antioxidant-rich"
        ],
        serving: "1 medium orange (130g)"
    },
    {
        name: "Carrots",
        emoji: "🥕",
        description: "Excellent source of vitamin A",
        nutrients: [
            "Vitamin A",
            "Vitamin K",
            "Fiber",
            "Potassium",
            "Vitamin C"
        ],
        benefits: [
            "Eye health",
            "Immune support",
            "Digestive health",
            "Antioxidant-rich"
        ],
        serving: "1 medium (61g)"
    },
    {
        name: "Red Peppers",
        emoji: "🫑",
        description: "Vitamin C and antioxidants",
        nutrients: [
            "Vitamin C",
            "Vitamin A",
            "Vitamin B6",
            "Folate",
            "Antioxidants"
        ],
        benefits: [
            "Boosts immune system",
            "Supports eye health",
            "Rich in antioxidants",
            "Aids iron absorption"
        ],
        serving: "1 medium (119g)"
    }
];
const MINERALS_FOODS = [
    {
        name: "Almonds",
        emoji: "🥜",
        description: "Magnesium, calcium, iron",
        nutrients: [
            "Magnesium",
            "Calcium",
            "Iron",
            "Fiber",
            "Vitamin E",
            "Protein"
        ],
        benefits: [
            "Supports heart health",
            "Bone strength",
            "Rich in antioxidants",
            "Helps control blood sugar"
        ],
        serving: "1 oz (28g)"
    },
    {
        name: "Pumpkin Seeds",
        emoji: "🎃",
        description: "Zinc, magnesium, iron",
        nutrients: [
            "Zinc",
            "Magnesium",
            "Iron",
            "Copper",
            "Manganese",
            "Healthy Fats"
        ],
        benefits: [
            "Improves sleep",
            "Boosts immune system",
            "Supports prostate health",
            "Rich in antioxidants"
        ],
        serving: "1 oz (28g)"
    },
    {
        name: "Salmon",
        emoji: "🐟",
        description: "Rich in selenium and iodine",
        nutrients: [
            "Selenium",
            "Iodine",
            "Phosphorus",
            "Potassium",
            "Magnesium",
            "Vitamin D"
        ],
        benefits: [
            "Heart health",
            "Brain function",
            "Reduces inflammation",
            "High-quality protein"
        ],
        serving: "3 oz (85g)"
    },
    {
        name: "Broccoli",
        emoji: "🥦",
        description: "Calcium, potassium, iron",
        nutrients: [
            "Calcium",
            "Potassium",
            "Iron",
            "Vitamin C",
            "Folate",
            "Fiber"
        ],
        benefits: [
            "Cancer prevention",
            "Bone health",
            "Digestive health",
            "Immune support"
        ],
        serving: "1 cup chopped (91g)"
    }
];
function LearnPage() {
    // Filter nutrients based on search
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('category');
    const nutrientsByCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$nutrient$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getNutrientsByCategory"])();
    const [selectedNutrientIndex, setSelectedNutrientIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedNutrient = selectedNutrientIndex !== null ? allNutrients[selectedNutrientIndex] : null;
    const [selectedFoodList, setSelectedFoodList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedFoodIndex, setSelectedFoodIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    function openFood(list, idx) {
        setSelectedFoodList(list);
        setSelectedFoodIndex(idx);
    }
    function closeFood() {
        setSelectedFoodList(null);
        setSelectedFoodIndex(null);
    }
    // (filteredNutrients removed, not used)
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mx-auto max-w-6xl px-6 py-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold tracking-tight",
                        children: "Learn About Nutrients"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-zinc-600 dark:text-zinc-400",
                        children: "Comprehensive guide to macronutrients, vitamins, and minerals"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "text",
                    placeholder: "Search nutrients...",
                    value: searchQuery,
                    onChange: (e)=>setSearchQuery(e.target.value),
                    className: "w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-zinc-400 dark:focus:ring-zinc-400"
                }, void 0, false, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 271,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this),
            !searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-6 flex gap-2 overflow-x-auto scrollbar-hide -mx-2 px-2",
                style: {
                    WebkitOverflowScrolling: 'touch'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-2 min-w-max",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setView('alphabetical'),
                            className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'alphabetical' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`,
                            children: "A-Z Directory"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 284,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setView('category'),
                            className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'category' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`,
                            children: "By Category"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 285,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setView('carbohydrates'),
                            className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'carbohydrates' ? 'bg-blue-900 text-white dark:bg-blue-100 dark:text-blue-900' : 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-300 dark:hover:bg-blue-700'}`,
                            children: "Carbohydrates"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 286,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setView('proteins'),
                            className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'proteins' ? 'bg-orange-900 text-white dark:bg-orange-100 dark:text-orange-900' : 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-800 dark:text-orange-300 dark:hover:bg-orange-700'}`,
                            children: "Proteins"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 287,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setView('vitamins'),
                            className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'vitamins' ? 'bg-green-900 text-white dark:bg-green-100 dark:text-green-900' : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-800 dark:text-green-300 dark:hover:bg-green-700'}`,
                            children: "Vitamins"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 288,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setView('minerals'),
                            className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'minerals' ? 'bg-yellow-900 text-white dark:bg-yellow-100 dark:text-yellow-900' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-800 dark:text-yellow-300 dark:hover:bg-yellow-700'}`,
                            children: "Minerals"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 289,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setView('superfoods'),
                            className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${view === 'superfoods' ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900' : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'}`,
                            children: "🌟 Superfoods"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 290,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 283,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 282,
                columnNumber: 9
            }, this),
            view === 'alphabetical' && !searchQuery ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$nutrient$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllNutrientsAlphabetically"])().map((nutrient, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientCard, {
                        nutrient: nutrient,
                        onClick: ()=>setSelectedNutrientIndex(idx)
                    }, nutrient.name, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 300,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 298,
                columnNumber: 9
            }, this) : searchQuery ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-4",
                    children: [
                        view === 'alphabetical' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$nutrient$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllNutrientsAlphabetically"])().filter((nutrient)=>nutrient.name.toLowerCase().includes(searchQuery.toLowerCase()) || nutrient.description.toLowerCase().includes(searchQuery.toLowerCase())).map((nutrient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientCard, {
                                    nutrient: nutrient,
                                    onClick: ()=>setSelectedNutrientIndex(allNutrients.findIndex((n)=>n.name === nutrient.name))
                                }, nutrient.name, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 320,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 313,
                            columnNumber: 15
                        }, this),
                        view === 'category' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$apps$2f$web$2f$lib$2f$nutrient$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAllNutrientsAlphabetically"])().filter((nutrient)=>nutrient.name.toLowerCase().includes(searchQuery.toLowerCase()) || nutrient.description.toLowerCase().includes(searchQuery.toLowerCase())).map((nutrient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientCard, {
                                    nutrient: nutrient,
                                    onClick: ()=>setSelectedNutrientIndex(allNutrients.findIndex((n)=>n.name === nutrient.name))
                                }, nutrient.name, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 337,
                                    columnNumber: 21
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 330,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 310,
                    columnNumber: 11
                }, this)
            }, void 0, false) : view === 'carbohydrates' ? // Carbohydrates View: show food card UI like proteins, vitamins, minerals, superfoods
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-xl bg-blue-50 p-6 dark:bg-blue-950/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-2 text-2xl font-bold",
                                children: "🍞 Carbohydrates"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 351,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-zinc-700 dark:text-zinc-300",
                                children: "Foods rich in carbohydrates"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 352,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 350,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                        children: CARBS_FOODS.map((carb, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuperfoodCard, {
                                superfood: carb,
                                onClick: ()=>openFood(CARBS_FOODS, idx)
                            }, carb.name, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 356,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 354,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 349,
                columnNumber: 9
            }, this) : view === 'proteins' ? // Proteins Food Sources View
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-xl bg-orange-50 p-6 dark:bg-orange-950/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-2 text-2xl font-bold",
                                children: "🍗 Proteins"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 368,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-zinc-700 dark:text-zinc-300",
                                children: "Foods rich in protein"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 369,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 367,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                        children: PROTEINS_FOODS.map((protein, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuperfoodCard, {
                                superfood: protein,
                                onClick: ()=>openFood(PROTEINS_FOODS, idx)
                            }, protein.name, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 373,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 371,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 366,
                columnNumber: 9
            }, this) : view === 'vitamins' ? // Vitamins Food Sources View 
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-xl bg-green-50 p-6 dark:bg-green-950/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-2 text-2xl font-bold",
                                children: "🍃 Vitamins"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 385,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-zinc-700 dark:text-zinc-300",
                                children: "Foods rich in vitamins"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 386,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 384,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                        children: VITAMINS_FOODS.map((vitamin, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuperfoodCard, {
                                superfood: vitamin,
                                onClick: ()=>openFood(VITAMINS_FOODS, idx)
                            }, vitamin.name, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 390,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 388,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 383,
                columnNumber: 11
            }, this) : view === 'minerals' ? // Minerals Food Sources View 
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-xl bg-yellow-50 p-6 dark:bg-yellow-950/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-2 text-2xl font-bold",
                                children: "🧂 Minerals"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 402,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-zinc-700 dark:text-zinc-300",
                                children: "Foods rich in minerals"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 403,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 401,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                        children: MINERALS_FOODS.map((mineral, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuperfoodCard, {
                                superfood: mineral,
                                onClick: ()=>openFood(MINERALS_FOODS, idx)
                            }, mineral.name, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 407,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 405,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 400,
                columnNumber: 11
            }, this) : view === 'superfoods' ? // Superfoods View
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-6 rounded-xl bg-linear-to-r from-green-50 to-blue-50 p-6 dark:from-green-950/30 dark:to-blue-950/30",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-2 text-2xl font-bold",
                                children: "🌟 Superfoods"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 419,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-zinc-700 dark:text-zinc-300",
                                children: "Foods packed with multiple essential nutrients to supercharge your health"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 420,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 418,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                        children: SUPERFOODS.map((superfood, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuperfoodCard, {
                                superfood: superfood,
                                onClick: ()=>openFood(SUPERFOODS, index)
                            }, superfood.name, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 426,
                                columnNumber: 17
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 424,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 417,
                columnNumber: 11
            }, this) : // By Category: grouped view with headings
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-14",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mb-6 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50",
                                children: "Macronutrients"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 439,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100",
                                children: "Main Macronutrients"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 441,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8",
                                children: [
                                    'Carbohydrates',
                                    'Protein',
                                    'Dietary Fiber',
                                    'Total Fat'
                                ].map((macroName)=>{
                                    const nutrient = Object.values(nutrientsByCategory['Macronutrients']).find((n)=>n.name === macroName);
                                    return nutrient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientCard, {
                                        nutrient: nutrient,
                                        onClick: ()=>setSelectedNutrientIndex(allNutrients.findIndex((n)=>n.name === nutrient.name))
                                    }, nutrient.name, false, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 446,
                                        columnNumber: 21
                                    }, this) : null;
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 442,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100",
                                children: "Other Macronutrients"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 455,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                children: [
                                    'Total Sugars',
                                    'Cholesterol',
                                    'Saturated Fat'
                                ].map((macroName)=>{
                                    const nutrient = Object.values(nutrientsByCategory['Macronutrients']).find((n)=>n.name === macroName);
                                    return nutrient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientCard, {
                                        nutrient: nutrient,
                                        onClick: ()=>setSelectedNutrientIndex(allNutrients.findIndex((n)=>n.name === nutrient.name))
                                    }, nutrient.name, false, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 21
                                    }, this) : null;
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 456,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 438,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "mb-6 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50",
                                children: "Micronutrients"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 471,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100",
                                children: "Vitamins"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 473,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8",
                                children: nutrientsByCategory['Vitamins'].map((nutrient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientCard, {
                                        nutrient: nutrient,
                                        onClick: ()=>setSelectedNutrientIndex(allNutrients.findIndex((n)=>n.name === nutrient.name))
                                    }, nutrient.name, false, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 476,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 474,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-3 text-xl font-bold text-zinc-800 dark:text-zinc-100",
                                children: "Minerals"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 484,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
                                children: nutrientsByCategory['Minerals'].map((nutrient)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientCard, {
                                        nutrient: nutrient,
                                        onClick: ()=>setSelectedNutrientIndex(allNutrients.findIndex((n)=>n.name === nutrient.name))
                                    }, nutrient.name, false, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 487,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 485,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 470,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 436,
                columnNumber: 11
            }, this),
            selectedNutrientIndex !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NutrientModal, {
                nutrients: allNutrients,
                initialIndex: selectedNutrientIndex,
                onClose: ()=>setSelectedNutrientIndex(null)
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 500,
                columnNumber: 9
            }, this),
            selectedFoodList && selectedFoodIndex !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SuperfoodModal, {
                superfoods: selectedFoodList,
                initialIndex: selectedFoodIndex,
                onClose: closeFood
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 508,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
function SuperfoodCard({ superfood, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "flex flex-col items-start rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900",
        onClick: onClick,
        type: "button",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-2 text-3xl",
                children: superfood.emoji
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 525,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-1 text-lg font-bold",
                children: superfood.name
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 526,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "mb-2 text-sm text-zinc-600 dark:text-zinc-300",
                children: superfood.description
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 527,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex flex-wrap gap-2",
                children: [
                    superfood.nutrients.slice(0, 3).map((nutrient, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
                            children: nutrient
                        }, i, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 530,
                            columnNumber: 11
                        }, this)),
                    superfood.nutrients.length > 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
                        children: [
                            "+",
                            superfood.nutrients.length - 3,
                            " more"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 538,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 528,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 text-xs text-zinc-500 dark:text-zinc-400",
                children: [
                    "Serving: ",
                    superfood.serving
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 543,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 text-xs text-green-700 dark:text-green-300",
                children: [
                    "Benefits: ",
                    superfood.benefits.join(", ")
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 544,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
        lineNumber: 520,
        columnNumber: 5
    }, this);
}
function SuperfoodModal({ superfoods, initialIndex, onClose }) {
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialIndex);
    const [quantity, setQuantity] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [showAddSuccess, setShowAddSuccess] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const superfood = superfoods[currentIndex];
    const handlePrevious = ()=>{
        setCurrentIndex((prev)=>prev === 0 ? superfoods.length - 1 : prev - 1);
        setQuantity(1);
    };
    const handleNext = ()=>{
        setCurrentIndex((prev)=>prev === superfoods.length - 1 ? 0 : prev + 1);
        setQuantity(1);
    };
    const handleAddToGroceryList = async ()=>{
        try {
            const response = await fetch('/api/grocery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    food_name: superfood.name,
                    quantity: quantity,
                    unit: superfood.serving
                })
            });
            if (response.ok) {
                setShowAddSuccess(true);
                setTimeout(()=>setShowAddSuccess(false), 2000);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex w-full max-w-6xl items-center justify-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        handlePrevious();
                    },
                    className: "rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700",
                    "aria-label": "Previous superfood",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-6 w-6",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M15 19l-7-7 7-7"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 607,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 606,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 598,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-6xl",
                                            children: superfood.emoji
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 618,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    className: "text-3xl font-bold",
                                                    children: superfood.name
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 620,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-sm text-zinc-600 dark:text-zinc-400",
                                                    children: superfood.description
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1 text-xs text-zinc-500 dark:text-zinc-500",
                                                    children: [
                                                        currentIndex + 1,
                                                        " of ",
                                                        superfoods.length
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 624,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 619,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 617,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onClose,
                                    className: "rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "h-5 w-5",
                                        fill: "none",
                                        viewBox: "0 0 24 24",
                                        stroke: "currentColor",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: 2,
                                            d: "M6 18L18 6M6 6l12 12"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 634,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 633,
                                        columnNumber: 13
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 629,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 616,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6 rounded-lg bg-blue-50 p-3 dark:bg-blue-950/30",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold text-blue-900 dark:text-blue-300",
                                        children: "Serving Size:"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 642,
                                        columnNumber: 13
                                    }, this),
                                    ' ',
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-blue-800 dark:text-blue-200",
                                        children: superfood.serving
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 643,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 641,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 640,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-3 text-lg font-semibold",
                                            children: "Key Nutrients"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 650,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2",
                                            children: superfood.nutrients.map((nutrient, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-full bg-green-100 px-3 py-1.5 text-sm font-medium text-green-800 dark:bg-green-950 dark:text-green-200",
                                                    children: nutrient
                                                }, index, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 653,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 651,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 649,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "mb-3 text-lg font-semibold",
                                            children: "Health Benefits"
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 665,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2",
                                            children: superfood.benefits.map((benefit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                            className: "mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500",
                                                            fill: "none",
                                                            viewBox: "0 0 24 24",
                                                            stroke: "currentColor",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                strokeLinecap: "round",
                                                                strokeLinejoin: "round",
                                                                strokeWidth: 2,
                                                                d: "M5 13l4 4L19 7"
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                                lineNumber: 670,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                            lineNumber: 669,
                                                            columnNumber: 19
                                                        }, this),
                                                        benefit
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 668,
                                                    columnNumber: 17
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 666,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 664,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 647,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    htmlFor: "quantity",
                                                    className: "text-sm font-medium",
                                                    children: "Quantity:"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 683,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setQuantity(Math.max(1, quantity - 1)),
                                                            className: "rounded-lg bg-zinc-100 px-3 py-1.5 text-lg font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
                                                            children: "−"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                            lineNumber: 687,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            id: "quantity",
                                                            type: "number",
                                                            min: "1",
                                                            value: quantity,
                                                            onChange: (e)=>setQuantity(Math.max(1, parseInt(e.target.value) || 1)),
                                                            className: "w-16 rounded-lg border border-zinc-300 px-3 py-1.5 text-center dark:border-zinc-700 dark:bg-zinc-800"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                            lineNumber: 693,
                                                            columnNumber: 17
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setQuantity(quantity + 1),
                                                            className: "rounded-lg bg-zinc-100 px-3 py-1.5 text-lg font-semibold hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700",
                                                            children: "+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                            lineNumber: 701,
                                                            columnNumber: 17
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 686,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 682,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleAddToGroceryList,
                                            className: "flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-green-700",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    className: "h-5 w-5",
                                                    fill: "none",
                                                    viewBox: "0 0 24 24",
                                                    stroke: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        strokeLinecap: "round",
                                                        strokeLinejoin: "round",
                                                        strokeWidth: 2,
                                                        d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                        lineNumber: 715,
                                                        columnNumber: 17
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 714,
                                                    columnNumber: 15
                                                }, this),
                                                "Add to Grocery List"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 710,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 681,
                                    columnNumber: 11
                                }, this),
                                showAddSuccess && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-800 dark:bg-green-950/30 dark:text-green-200",
                                    children: [
                                        "✓ ",
                                        superfood.name,
                                        " added to grocery list!"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 722,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 680,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 611,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        handleNext();
                    },
                    className: "rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-zinc-50 dark:bg-zinc-800 dark:hover:bg-zinc-700",
                    "aria-label": "Next superfood",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-6 w-6",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M9 5l7 7-7 7"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 738,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 737,
                        columnNumber: 9
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 729,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
            lineNumber: 596,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
        lineNumber: 592,
        columnNumber: 5
    }, this);
}
function NutrientCard({ nutrient, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        className: "group w-full rounded-xl border border-zinc-200 p-4 text-left transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:hover:border-zinc-700",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 flex items-start justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "font-semibold group-hover:text-zinc-900 dark:group-hover:text-zinc-50",
                        children: nutrient.name
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 754,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
                        children: nutrient.category === 'Macronutrients' ? 'Macro' : nutrient.category === 'Vitamins' ? 'Vitamin' : 'Mineral'
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 757,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 753,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400",
                children: nutrient.description
            }, void 0, false, {
                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                lineNumber: 761,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
        lineNumber: 749,
        columnNumber: 5
    }, this);
}
function NutrientModal({ nutrients, initialIndex, onClose }) {
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialIndex);
    const nutrient = nutrients[currentIndex];
    const handlePrev = ()=>setCurrentIndex((i)=>i === 0 ? nutrients.length - 1 : i - 1);
    const handleNext = ()=>setCurrentIndex((i)=>i === nutrients.length - 1 ? 0 : i + 1);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4",
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex w-full max-w-5xl items-center justify-center gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        handlePrev();
                    },
                    className: "hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 transition",
                    "aria-label": "Previous",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-5 w-5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M15 19l-7-7 7-7"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 787,
                            columnNumber: 90
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 787,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 782,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900",
                    onClick: (e)=>e.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 flex items-start justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-2xl font-bold",
                                            children: nutrient.name
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 797,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-sm text-zinc-600 dark:text-zinc-400",
                                            children: [
                                                nutrient.category,
                                                nutrient.dailyValue && ` • Daily Value: ${nutrient.dailyValue}`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 798,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-zinc-400 dark:text-zinc-500",
                                            children: [
                                                currentIndex + 1,
                                                " / ",
                                                nutrients.length
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 802,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 796,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handlePrev,
                                            className: "sm:hidden rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                            "aria-label": "Previous",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-5 w-5",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M15 19l-7-7 7-7"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 94
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                lineNumber: 807,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 806,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleNext,
                                            className: "sm:hidden rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                            "aria-label": "Next",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-5 w-5",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 5l7 7-7 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 810,
                                                    columnNumber: 94
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                lineNumber: 810,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 809,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: onClose,
                                            className: "rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                className: "h-5 w-5",
                                                fill: "none",
                                                viewBox: "0 0 24 24",
                                                stroke: "currentColor",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M6 18L18 6M6 6l12 12"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 817,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                lineNumber: 816,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 812,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 804,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 795,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-zinc-700 dark:text-zinc-300",
                                children: nutrient.description
                            }, void 0, false, {
                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                lineNumber: 825,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 824,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-6 lg:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mb-3 text-lg font-semibold",
                                                    children: "Health Benefits"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 834,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2",
                                                    children: nutrient.benefits.map((benefit, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-500",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M5 13l4 4L19 7"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                                        lineNumber: 839,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                                    lineNumber: 838,
                                                                    columnNumber: 21
                                                                }, this),
                                                                benefit
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                            lineNumber: 837,
                                                            columnNumber: 19
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 835,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 833,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mb-3 text-lg font-semibold",
                                                    children: "Food Sources"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 849,
                                                    columnNumber: 15
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-wrap gap-2",
                                                    children: nutrient.sources.map((source, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
                                                            children: source
                                                        }, index, false, {
                                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                            lineNumber: 852,
                                                            columnNumber: 19
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 15
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 848,
                                            columnNumber: 13
                                        }, this),
                                        nutrient.absorptionTips && nutrient.absorptionTips.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "mb-3 text-lg font-semibold",
                                                    children: "Absorption Tips"
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 865,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-2",
                                                    children: nutrient.absorptionTips.map((tip, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                    className: "mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-500",
                                                                    fill: "none",
                                                                    viewBox: "0 0 24 24",
                                                                    stroke: "currentColor",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                        strokeLinecap: "round",
                                                                        strokeLinejoin: "round",
                                                                        strokeWidth: 2,
                                                                        d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                                        lineNumber: 870,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                                    lineNumber: 869,
                                                                    columnNumber: 23
                                                                }, this),
                                                                tip
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                            lineNumber: 868,
                                                            columnNumber: 21
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                    lineNumber: 866,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                            lineNumber: 864,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 831,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: nutrient.overdoseRisks && nutrient.overdoseRisks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg border-2 border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mb-3 text-lg font-semibold text-red-900 dark:text-red-400",
                                                children: "⚠️ Risks of Taking Too Much"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                lineNumber: 885,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "space-y-2",
                                                children: nutrient.overdoseRisks.map((risk, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        className: "flex items-start gap-2 text-sm text-red-800 dark:text-red-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                                className: "mt-0.5 h-5 w-5 shrink-0",
                                                                fill: "none",
                                                                viewBox: "0 0 24 24",
                                                                stroke: "currentColor",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                                    strokeLinecap: "round",
                                                                    strokeLinejoin: "round",
                                                                    strokeWidth: 2,
                                                                    d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                                    lineNumber: 892,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                                lineNumber: 891,
                                                                columnNumber: 23
                                                            }, this),
                                                            risk
                                                        ]
                                                    }, index, true, {
                                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                        lineNumber: 890,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                                lineNumber: 888,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                        lineNumber: 884,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                                    lineNumber: 881,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 829,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 790,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: (e)=>{
                        e.stopPropagation();
                        handleNext();
                    },
                    className: "hidden sm:flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/90 shadow-lg border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700 transition",
                    "aria-label": "Next",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        className: "h-5 w-5",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$Portfolio_projects$2f$nutritracker$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$2_$40$babel$2b$core$40$7$2e$29$2e$0_babel$2d$plugin$2d$react$2d$compiler$40$1$2e$0$2e$0_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M9 5l7 7-7 7"
                        }, void 0, false, {
                            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                            lineNumber: 909,
                            columnNumber: 90
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                        lineNumber: 909,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
                    lineNumber: 904,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
            lineNumber: 780,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Desktop/Portfolio_projects/nutritracker/apps/web/app/app/learn/page.tsx",
        lineNumber: 776,
        columnNumber: 5
    }, this);
}
const __TURBOPACK__default__export__ = LearnPage;
}),
];

//# sourceMappingURL=Desktop_Portfolio_projects_nutritracker_apps_web_656194e9._.js.map