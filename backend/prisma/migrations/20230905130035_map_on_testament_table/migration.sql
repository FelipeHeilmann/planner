/*
  Warnings:

  - You are about to drop the `Testament` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "books" DROP CONSTRAINT "books_testamentId_fkey";

-- DropTable
DROP TABLE "Testament";

-- CreateTable
CREATE TABLE "testament" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "testament_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_testamentId_fkey" FOREIGN KEY ("testamentId") REFERENCES "testament"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
