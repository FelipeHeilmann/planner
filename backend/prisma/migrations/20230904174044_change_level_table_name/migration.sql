/*
  Warnings:

  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_levelId_fkey";

-- DropTable
DROP TABLE "Level";

-- CreateTable
CREATE TABLE "levels" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "min_points" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
