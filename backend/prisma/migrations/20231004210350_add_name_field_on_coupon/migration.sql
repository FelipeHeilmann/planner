/*
  Warnings:

  - Added the required column `name` to the `coupons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "name" TEXT NOT NULL;
