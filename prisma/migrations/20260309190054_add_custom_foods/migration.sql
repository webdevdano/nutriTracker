-- CreateTable
CREATE TABLE "CustomFood" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "servingSize" DECIMAL(65,30) NOT NULL DEFAULT 100,
    "servingUnit" TEXT NOT NULL DEFAULT 'g',
    "category" TEXT,
    "barcode" TEXT,
    "calories" DECIMAL(65,30),
    "protein" DECIMAL(65,30),
    "carbs" DECIMAL(65,30),
    "fat" DECIMAL(65,30),
    "fiber" DECIMAL(65,30),
    "sodium" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomFood_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CustomFood_userId_idx" ON "CustomFood"("userId");

-- CreateIndex
CREATE INDEX "CustomFood_userId_name_idx" ON "CustomFood"("userId", "name");

-- AddForeignKey
ALTER TABLE "CustomFood" ADD CONSTRAINT "CustomFood_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
