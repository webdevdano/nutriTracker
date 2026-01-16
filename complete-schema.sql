-- =====================================================
-- COMPLETE NUTRITRACKER DATABASE SCHEMA
-- =====================================================
-- This file combines all migrations into one
-- Run this entire file in Supabase SQL Editor
-- Uses IF NOT EXISTS so it's safe to run multiple times
-- =====================================================

-- 1. PROFILES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add health metrics columns to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS age INT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS sex TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS height_feet INT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS height_inches INT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS weight_lbs INT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS activity_level TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bmi DECIMAL;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS recommended_calories INT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS recommended_protein INT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS recommended_carbs INT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS recommended_fat INT;

-- Add fitness goal column
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS fitness_goal TEXT DEFAULT 'maintain';

-- Add constraint for fitness goal
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fitness_goal_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT fitness_goal_check 
      CHECK (fitness_goal IN ('shred', 'bulk', 'maintain'));
  END IF;
END $$;

-- Update any existing NULL values to 'maintain'
UPDATE profiles SET fitness_goal = 'maintain' WHERE fitness_goal IS NULL;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- 2. USER GOALS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  calories_goal INT,
  protein_goal INT,
  carbs_goal INT,
  fat_goal INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;

-- Drop and recreate RLS policies with proper permissions
DROP POLICY IF EXISTS "Users can view own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can insert own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can update own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can insert their own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can update their own goals" ON user_goals;

CREATE POLICY "Users can view own goals" ON user_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own goals" ON user_goals
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals" ON user_goals
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);


-- 3. FOOD LOGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIMESTAMPTZ DEFAULT NOW(),
  
  -- Food details (snapshot from USDA API)
  fdc_id INT NOT NULL,
  food_name TEXT NOT NULL,
  serving_size DECIMAL,
  serving_unit TEXT,
  
  -- Basic nutrition per serving
  calories DECIMAL,
  protein DECIMAL,
  carbs DECIMAL,
  fat DECIMAL,
  fiber DECIMAL,
  sodium DECIMAL,
  
  -- Quantity logged
  quantity DECIMAL DEFAULT 1,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add micronutrient columns to food_logs
-- Additional macronutrients
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS saturated_fat DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS trans_fat DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS polyunsaturated_fat DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS monounsaturated_fat DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS cholesterol DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS sugars DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS added_sugars DECIMAL;

-- Vitamins
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS vitamin_a DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS vitamin_c DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS vitamin_d DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS vitamin_e DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS vitamin_k DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS thiamin DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS riboflavin DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS niacin DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS vitamin_b6 DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS folate DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS vitamin_b12 DECIMAL;

-- Minerals
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS calcium DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS iron DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS magnesium DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS phosphorus DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS potassium DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS zinc DECIMAL;
ALTER TABLE food_logs ADD COLUMN IF NOT EXISTS selenium DECIMAL;

ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own logs" ON food_logs;
DROP POLICY IF EXISTS "Users can insert own logs" ON food_logs;
DROP POLICY IF EXISTS "Users can delete own logs" ON food_logs;

CREATE POLICY "Users can view own logs" ON food_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON food_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs" ON food_logs
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_food_logs_user_date ON food_logs(user_id, date DESC);


-- 4. MEAL SUGGESTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS meal_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  calories INT,
  protein INT,
  carbs INT,
  fat INT,
  ingredients TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add micronutrient columns to meal_suggestions
-- Additional macronutrients
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS saturated_fat INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS trans_fat INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS polyunsaturated_fat INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS monounsaturated_fat INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS cholesterol INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS sugars INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS added_sugars INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS fiber INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS sodium INT;

-- Vitamins
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS vitamin_a INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS vitamin_c INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS vitamin_d INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS vitamin_e INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS vitamin_k INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS thiamin INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS riboflavin INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS niacin INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS vitamin_b6 INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS folate INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS vitamin_b12 INT;

-- Minerals
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS calcium INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS iron INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS magnesium INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS phosphorus INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS potassium INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS zinc INT;
ALTER TABLE meal_suggestions ADD COLUMN IF NOT EXISTS selenium INT;

ALTER TABLE meal_suggestions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view meal suggestions" ON meal_suggestions;
CREATE POLICY "Anyone can view meal suggestions" ON meal_suggestions
  FOR SELECT USING (true);


-- 5. GROCERY LIST TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS grocery_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  food_name TEXT NOT NULL,
  quantity NUMERIC DEFAULT 1,
  unit TEXT DEFAULT 'serving',
  purchased BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE grocery_list ENABLE ROW LEVEL SECURITY;

-- Drop and recreate RLS policies
DROP POLICY IF EXISTS "Users can view own grocery list" ON grocery_list;
DROP POLICY IF EXISTS "Users can insert own grocery list items" ON grocery_list;
DROP POLICY IF EXISTS "Users can update own grocery list items" ON grocery_list;
DROP POLICY IF EXISTS "Users can delete own grocery list items" ON grocery_list;

CREATE POLICY "Users can view own grocery list" ON grocery_list
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own grocery list items" ON grocery_list
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own grocery list items" ON grocery_list
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own grocery list items" ON grocery_list
  FOR DELETE USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_grocery_list_user_id ON grocery_list(user_id);
CREATE INDEX IF NOT EXISTS idx_grocery_list_purchased ON grocery_list(user_id, purchased);


-- =====================================================
-- SCHEMA SETUP COMPLETE
-- =====================================================
-- All tables, columns, policies, and indexes are now created
-- Safe to run multiple times thanks to IF NOT EXISTS checks
-- =====================================================
