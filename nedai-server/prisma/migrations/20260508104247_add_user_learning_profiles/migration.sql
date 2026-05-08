-- CreateTable "user_learning_profiles"
CREATE TABLE "user_learning_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredTone" TEXT,
    "preferredDetail" TEXT,
    "weakSubjects" TEXT[],
    "strongSubjects" TEXT[],
    "studyPatterns" JSONB,
    "emotionalProfile" JSONB,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_learning_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_learning_profiles_userId_key" ON "user_learning_profiles"("userId");

-- CreateIndex
CREATE INDEX "user_learning_profiles_userId_idx" ON "user_learning_profiles"("userId");

-- AddForeignKey
ALTER TABLE "user_learning_profiles" ADD CONSTRAINT "user_learning_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
