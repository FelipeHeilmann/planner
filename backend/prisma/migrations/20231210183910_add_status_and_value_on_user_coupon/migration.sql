/*
  Warnings:

  - Added the required column `status` to the `users_coupons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `users_coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users_coupons" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;
