-- Migration to add micronutrients to food_logs and meal_suggestions tables
-- Run this in Supabase SQL Editor if you already have existing tables

-- ====================
-- UPDATE food_logs TABLE
-- ====================

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


-- ====================
-- UPDATE meal_suggestions TABLE
-- ====================

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
