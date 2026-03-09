-- CreateTable
CREATE TABLE "UserRecipe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "ingredients" TEXT[],
    "instructions" TEXT,
    "servings" INTEGER NOT NULL DEFAULT 1,
    "prepTime" INTEGER,
    "cookTime" INTEGER,
    "imageUrl" TEXT,
    "calories" DECIMAL(65,30),
    "protein" DECIMAL(65,30),
    "carbs" DECIMAL(65,30),
    "fat" DECIMAL(65,30),
    "fiber" DECIMAL(65,30),
    "sodium" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedRecipe" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "spoonacularId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "servings" INTEGER,
    "readyInMinutes" INTEGER,
    "calories" DECIMAL(65,30),
    "protein" DECIMAL(65,30),
    "carbs" DECIMAL(65,30),
    "fat" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedRecipe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserRecipe_userId_idx" ON "UserRecipe"("userId");

-- CreateIndex
CREATE INDEX "SavedRecipe_userId_idx" ON "SavedRecipe"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedRecipe_userId_spoonacularId_key" ON "SavedRecipe"("userId", "spoonacularId");

-- AddForeignKey
ALTER TABLE "UserRecipe" ADD CONSTRAINT "UserRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRecipe" ADD CONSTRAINT "SavedRecipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
