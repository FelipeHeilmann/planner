/*
  Warnings:

  - You are about to drop the column `levelId` on the `users` table. All the data in the column will be lost.
  - Added the required column `level_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_levelId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "levelId",
ADD COLUMN     "level_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "readings" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "time_spent" INTEGER NOT NULL,
    "user_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devotionals" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "learned" TEXT NOT NULL,
    "application" TEXT NOT NULL,
    "verse" INTEGER NOT NULL,
    "user_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devotionals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memorizations" (
    "id" TEXT NOT NULL,
    "bookId" INTEGER NOT NULL,
    "verse" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "times_memorizated" TIMESTAMP(3)[],
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "memorizations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "words" INTEGER NOT NULL,
    "verses" INTEGER NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devotionals" ADD CONSTRAINT "devotionals_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devotionals" ADD CONSTRAINT "devotionals_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
