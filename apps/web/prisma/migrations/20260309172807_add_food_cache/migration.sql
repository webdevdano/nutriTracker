-- CreateTable
CREATE TABLE "FoodCache" (
    "id" TEXT NOT NULL,
    "cacheKey" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodCache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FoodCache_cacheKey_key" ON "FoodCache"("cacheKey");

-- CreateIndex
CREATE INDEX "FoodCache_cacheKey_idx" ON "FoodCache"("cacheKey");

-- CreateIndex
CREATE INDEX "FoodCache_expiresAt_idx" ON "FoodCache"("expiresAt");
