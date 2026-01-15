-- Add health metrics to profiles table
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
