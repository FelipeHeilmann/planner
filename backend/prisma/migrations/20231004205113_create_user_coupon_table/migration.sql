/*
  Warnings:

  - You are about to drop the `cupons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading_book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reading_plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "reading_book" DROP CONSTRAINT "reading_book_book_id_fkey";

-- DropForeignKey
ALTER TABLE "reading_book" DROP CONSTRAINT "reading_book_reading_id_fkey";

-- DropForeignKey
ALTER TABLE "reading_plans" DROP CONSTRAINT "reading_plans_testament_id_fkey";

-- DropForeignKey
ALTER TABLE "reading_plans" DROP CONSTRAINT "reading_plans_user_id_fkey";

-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_reading_plan_id_fkey";

-- DropTable
DROP TABLE "cupons";

-- DropTable
DROP TABLE "reading_book";

-- DropTable
DROP TABLE "reading_plans";

-- CreateTable
CREATE TABLE "reading_books" (
    "id" TEXT NOT NULL,
    "reading_id" TEXT NOT NULL,
    "book_id" INTEGER NOT NULL,

    CONSTRAINT "reading_books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "readings_plans" (
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

    CONSTRAINT "readings_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coupons" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "use" INTEGER NOT NULL,
    "is_valid" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "due_at" TIMESTAMP(3),

    CONSTRAINT "coupons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCoupon" (
    "id" TEXT NOT NULL,
    "coupon_id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "UserCoupon_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_reading_plan_id_fkey" FOREIGN KEY ("reading_plan_id") REFERENCES "readings_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_books" ADD CONSTRAINT "reading_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reading_books" ADD CONSTRAINT "reading_books_reading_id_fkey" FOREIGN KEY ("reading_id") REFERENCES "readings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings_plans" ADD CONSTRAINT "readings_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "readings_plans" ADD CONSTRAINT "readings_plans_testament_id_fkey" FOREIGN KEY ("testament_id") REFERENCES "testament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCoupon" ADD CONSTRAINT "UserCoupon_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCoupon" ADD CONSTRAINT "UserCoupon_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
