/*
  Warnings:

  - You are about to drop the `UserCompletedBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UserCompletedBook";

-- CreateTable
CREATE TABLE "user_completed_book" (
    "id" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completed" INTEGER NOT NULL,

    CONSTRAINT "user_completed_book_pkey" PRIMARY KEY ("id")
);
