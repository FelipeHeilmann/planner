/*
  Warnings:

  - You are about to drop the column `verses` on the `readings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "readings" DROP COLUMN "verses";

-- CreateTable
CREATE TABLE "ReadingBook" (
    "id" TEXT NOT NULL,
    "readingId" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "ReadingBook_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ReadingBook" ADD CONSTRAINT "ReadingBook_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReadingBook" ADD CONSTRAINT "ReadingBook_readingId_fkey" FOREIGN KEY ("readingId") REFERENCES "readings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
