/*
  Warnings:

  - Added the required column `testamentId` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `levels` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "testamentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "levels" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Testament" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Testament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_testamentId_fkey" FOREIGN KEY ("testamentId") REFERENCES "Testament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
