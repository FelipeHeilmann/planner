/*
  Warnings:

  - You are about to drop the column `testamentId` on the `books` table. All the data in the column will be lost.
  - Added the required column `testament_id` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_testamentId_fkey";

-- AlterTable
ALTER TABLE "books" DROP COLUMN "testamentId",
ADD COLUMN     "testament_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_testament_id_fkey" FOREIGN KEY ("testament_id") REFERENCES "testament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
