/*
  Warnings:

  - You are about to drop the column `book_id` on the `readings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_book_id_fkey";

-- AlterTable
ALTER TABLE "readings" DROP COLUMN "book_id",
ADD COLUMN     "bookId" INTEGER;
