/*
  Warnings:

  - You are about to drop the `reading_plan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_completed_book` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reading_plan" DROP CONSTRAINT "reading_plan_testament_id_fkey";

-- DropForeignKey
ALTER TABLE "reading_plan" DROP CONSTRAINT "reading_plan_user_id_fkey";

-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_reading_plan_id_fkey";

-- AlterTable
CREATE SEQUENCE levels_id_seq;
ALTER TABLE "levels" ALTER COLUMN "id" SET DEFAULT nextval('levels_id_seq');
ALTER SEQUENCE levels_id_seq OWNED BY "levels"."id";

-- DropTable
DROP TABLE "reading_plan";

-- DropTable
DROP TABLE "user_completed_book";

-- CreateTable
CREATE TABLE "reading_plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan_of" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "book" TEXT,
    "status" TEXT NOT NULL,
    "testament_id" INTEGER,
    "reading_goal_plan_per_day" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "end_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reading_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_completed_books" (
    "id" TEXT NOT NULL,
    "book" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completed" INTEGER NOT NULL,

    CONSTRAINT "user_completed_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cupons" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "is_valid" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "due_at" TIMESTAMP(3),

    CONSTRAINT "cupons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_reading_plan_id_fkey" FOREIGN KEY ("reading_plan_id") REFERENCES "reading_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_plans" ADD CONSTRAINT "reading_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_plans" ADD CONSTRAINT "reading_plans_testament_id_fkey" FOREIGN KEY ("testament_id") REFERENCES "testament"("id") ON DELETE SET NULL ON UPDATE CASCADE;
