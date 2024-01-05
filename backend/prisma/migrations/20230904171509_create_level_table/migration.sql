/*
  Warnings:

  - Added the required column `levelId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "levelId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Level" (
    "id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "min_points" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
