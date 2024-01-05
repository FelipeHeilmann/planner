/*
  Warnings:

  - You are about to drop the `ReadingBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ReadingBook" DROP CONSTRAINT "ReadingBook_bookId_fkey";

-- DropForeignKey
ALTER TABLE "ReadingBook" DROP CONSTRAINT "ReadingBook_readingId_fkey";

-- DropTable
DROP TABLE "ReadingBook";

-- CreateTable
CREATE TABLE "reading_book" (
    "id" TEXT NOT NULL,
    "reading_id" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "reading_book_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reading_book" ADD CONSTRAINT "reading_book_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_book" ADD CONSTRAINT "reading_book_reading_id_fkey" FOREIGN KEY ("reading_id") REFERENCES "readings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
