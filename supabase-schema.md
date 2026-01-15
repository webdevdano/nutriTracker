# Supabase Database Schema

Run these SQL commands in your Supabase SQL Editor to set up the database.

## 1. Enable Row Level Security (RLS)

```sql
-- Users table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

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

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## 2. User Goals

```sql
CREATE TABLE user_goals (
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

CREATE POLICY "Users can view own goals" ON user_goals
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own goals" ON user_goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own goals" ON user_goals
  FOR UPDATE USING (auth.uid() = user_id);
```

## 3. Food Logs

```sql
CREATE TABLE food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIMESTAMPTZ DEFAULT NOW(),
  
  -- Food details (snapshot from USDA API)
  fdc_id INT NOT NULL,
  food_name TEXT NOT NULL,
  serving_size DECIMAL,
  serving_unit TEXT,
  
  -- Nutrition per serving (stored snapshot)
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

ALTER TABLE food_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own logs" ON food_logs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own logs" ON food_logs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own logs" ON food_logs
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_food_logs_user_date ON food_logs(user_id, date DESC);
```

## 4. Meal Suggestions (Preloaded)

```sql
CREATE TABLE meal_suggestions (
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

-- Public read access
ALTER TABLE meal_suggestions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view meal suggestions" ON meal_suggestions
  FOR SELECT USING (true);
```
