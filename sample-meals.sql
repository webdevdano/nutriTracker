-- Sample Meal Suggestions
-- Run this in Supabase SQL Editor after running the schema

INSERT INTO meal_suggestions (name, description, calories, protein, carbs, fat, ingredients) VALUES
(
  'Grilled Chicken & Broccoli',
  'High-protein, low-carb meal perfect for muscle building and weight management.',
  380,
  45,
  12,
  15,
  ARRAY['6oz grilled chicken breast', '2 cups steamed broccoli', '1 tbsp olive oil', 'Lemon juice', 'Garlic', 'Salt & pepper']
),
(
  'Salmon & Sweet Potato',
  'Omega-3 rich salmon with complex carbs from sweet potato.',
  520,
  40,
  45,
  18,
  ARRAY['5oz baked salmon', '1 medium sweet potato', '1 cup green beans', '1 tsp butter', 'Herbs']
),
(
  'Greek Yogurt Parfait',
  'Protein-packed breakfast with probiotics and antioxidants.',
  320,
  25,
  38,
  8,
  ARRAY['1 cup Greek yogurt (plain)', '1/2 cup mixed berries', '1/4 cup granola', '1 tbsp honey', 'Chia seeds']
),
(
  'Turkey & Avocado Wrap',
  'Balanced lunch with lean protein and healthy fats.',
  425,
  32,
  35,
  18,
  ARRAY['Whole wheat tortilla', '4oz sliced turkey breast', '1/4 avocado', 'Lettuce', 'Tomato', 'Mustard']
),
(
  'Quinoa Power Bowl',
  'Plant-based complete protein with colorful vegetables.',
  410,
  15,
  58,
  14,
  ARRAY['1 cup cooked quinoa', '1/2 cup chickpeas', 'Mixed vegetables', '2 tbsp tahini dressing', 'Cucumber', 'Cherry tomatoes']
),
(
  'Egg White Omelet',
  'Low-calorie, high-protein breakfast to start your day.',
  220,
  28,
  8,
  6,
  ARRAY['4 egg whites + 1 whole egg', 'Spinach', 'Mushrooms', 'Bell peppers', 'Feta cheese', 'Herbs']
),
(
  'Tuna Salad Bowl',
  'Quick, protein-rich meal with omega-3s.',
  340,
  38,
  22,
  10,
  ARRAY['5oz canned tuna (in water)', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil & vinegar', 'Whole grain crackers']
),
(
  'Protein Smoothie',
  'Post-workout recovery drink with balanced macros.',
  285,
  30,
  32,
  5,
  ARRAY['1 scoop whey protein', '1 banana', '1 cup almond milk', '1 tbsp peanut butter', 'Ice', 'Cinnamon']
),
(
  'Beef Stir-Fry',
  'Iron-rich beef with fiber-packed vegetables.',
  445,
  38,
  28,
  20,
  ARRAY['5oz lean beef strips', '2 cups mixed stir-fry vegetables', '1/2 cup brown rice', 'Soy sauce', 'Ginger', 'Garlic']
),
(
  'Cottage Cheese & Fruit',
  'Simple high-protein snack with natural sweetness.',
  195,
  22,
  18,
  3,
  ARRAY['1 cup low-fat cottage cheese', '1/2 cup pineapple chunks', '1/4 cup blueberries', 'Cinnamon']
);
