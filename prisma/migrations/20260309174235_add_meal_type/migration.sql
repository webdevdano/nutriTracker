-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'DINNER', 'SNACK');

-- AlterTable
ALTER TABLE "FoodLog" ADD COLUMN     "mealType" "MealType" NOT NULL DEFAULT 'SNACK';
