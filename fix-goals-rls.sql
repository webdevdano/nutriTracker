-- Fix RLS policies for user_goals to allow INSERT and UPDATE
DROP POLICY IF EXISTS "Users can insert their own goals" ON user_goals;
DROP POLICY IF EXISTS "Users can update their own goals" ON user_goals;

CREATE POLICY "Users can insert their own goals"
ON user_goals FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goals"
ON user_goals FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
