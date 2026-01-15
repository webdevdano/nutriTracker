-- Create grocery_list table
CREATE TABLE IF NOT EXISTS grocery_list (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  food_name TEXT NOT NULL,
  quantity NUMERIC DEFAULT 1,
  unit TEXT DEFAULT 'serving',
  purchased BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE grocery_list ENABLE ROW LEVEL SECURITY;

-- Users can view their own grocery list items
CREATE POLICY "Users can view own grocery list"
  ON grocery_list
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own grocery list items
CREATE POLICY "Users can insert own grocery list items"
  ON grocery_list
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own grocery list items
CREATE POLICY "Users can update own grocery list items"
  ON grocery_list
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own grocery list items
CREATE POLICY "Users can delete own grocery list items"
  ON grocery_list
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_grocery_list_user_id ON grocery_list(user_id);
CREATE INDEX IF NOT EXISTS idx_grocery_list_purchased ON grocery_list(user_id, purchased);
