-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT,
    "fullName" TEXT,
    "age" INTEGER,
    "sex" TEXT,
    "heightFeet" INTEGER,
    "heightInches" INTEGER,
    "weightLbs" INTEGER,
    "activityLevel" TEXT,
    "bmi" DECIMAL(65,30),
    "recommendedCalories" INTEGER,
    "recommendedProtein" INTEGER,
    "recommendedCarbs" INTEGER,
    "recommendedFat" INTEGER,
    "fitnessGoal" TEXT DEFAULT 'maintain',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserGoals" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "caloriesGoal" INTEGER,
    "proteinGoal" INTEGER,
    "carbsGoal" INTEGER,
    "fatGoal" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fdcId" INTEGER NOT NULL,
    "foodName" TEXT NOT NULL,
    "servingSize" DECIMAL(65,30),
    "servingUnit" TEXT,
    "calories" DECIMAL(65,30),
    "protein" DECIMAL(65,30),
    "carbs" DECIMAL(65,30),
    "fat" DECIMAL(65,30),
    "fiber" DECIMAL(65,30),
    "sodium" DECIMAL(65,30),
    "quantity" DECIMAL(65,30) DEFAULT 1,
    "saturatedFat" DECIMAL(65,30),
    "transFat" DECIMAL(65,30),
    "polyunsaturatedFat" DECIMAL(65,30),
    "monounsaturatedFat" DECIMAL(65,30),
    "cholesterol" DECIMAL(65,30),
    "sugars" DECIMAL(65,30),
    "addedSugars" DECIMAL(65,30),
    "vitaminA" DECIMAL(65,30),
    "vitaminC" DECIMAL(65,30),
    "vitaminD" DECIMAL(65,30),
    "vitaminE" DECIMAL(65,30),
    "vitaminK" DECIMAL(65,30),
    "thiamin" DECIMAL(65,30),
    "riboflavin" DECIMAL(65,30),
    "niacin" DECIMAL(65,30),
    "vitaminB6" DECIMAL(65,30),
    "folate" DECIMAL(65,30),
    "vitaminB12" DECIMAL(65,30),
    "calcium" DECIMAL(65,30),
    "iron" DECIMAL(65,30),
    "magnesium" DECIMAL(65,30),
    "phosphorus" DECIMAL(65,30),
    "potassium" DECIMAL(65,30),
    "zinc" DECIMAL(65,30),
    "selenium" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealSuggestion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "ingredients" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "calories" INTEGER,
    "protein" INTEGER,
    "carbs" INTEGER,
    "fat" INTEGER,
    "fiber" INTEGER,
    "sodium" INTEGER,
    "saturatedFat" INTEGER,
    "transFat" INTEGER,
    "polyunsaturatedFat" INTEGER,
    "monounsaturatedFat" INTEGER,
    "cholesterol" INTEGER,
    "sugars" INTEGER,
    "addedSugars" INTEGER,
    "vitaminA" INTEGER,
    "vitaminC" INTEGER,
    "vitaminD" INTEGER,
    "vitaminE" INTEGER,
    "vitaminK" INTEGER,
    "thiamin" INTEGER,
    "riboflavin" INTEGER,
    "niacin" INTEGER,
    "vitaminB6" INTEGER,
    "folate" INTEGER,
    "vitaminB12" INTEGER,
    "calcium" INTEGER,
    "iron" INTEGER,
    "magnesium" INTEGER,
    "phosphorus" INTEGER,
    "potassium" INTEGER,
    "zinc" INTEGER,
    "selenium" INTEGER,

    CONSTRAINT "MealSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroceryList" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foodName" TEXT NOT NULL,
    "quantity" DECIMAL(65,30) DEFAULT 1,
    "unit" TEXT DEFAULT 'serving',
    "purchased" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroceryList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedFavorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fdcId" INTEGER NOT NULL,
    "foodName" TEXT NOT NULL,
    "calories" DECIMAL(65,30),
    "protein" DECIMAL(65,30),
    "carbs" DECIMAL(65,30),
    "fat" DECIMAL(65,30),
    "servingSize" DECIMAL(65,30) DEFAULT 100,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedFavorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserGoals_userId_key" ON "UserGoals"("userId");

-- CreateIndex
CREATE INDEX "FoodLog_userId_date_idx" ON "FoodLog"("userId", "date" DESC);

-- CreateIndex
CREATE INDEX "GroceryList_userId_idx" ON "GroceryList"("userId");

-- CreateIndex
CREATE INDEX "GroceryList_userId_purchased_idx" ON "GroceryList"("userId", "purchased");

-- CreateIndex
CREATE INDEX "SavedFavorite_userId_idx" ON "SavedFavorite"("userId");

-- CreateIndex
CREATE INDEX "SavedFavorite_userId_fdcId_idx" ON "SavedFavorite"("userId", "fdcId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGoals" ADD CONSTRAINT "UserGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoodLog" ADD CONSTRAINT "FoodLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryList" ADD CONSTRAINT "GroceryList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedFavorite" ADD CONSTRAINT "SavedFavorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
