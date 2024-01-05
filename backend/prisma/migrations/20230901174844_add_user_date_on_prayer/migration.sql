/*
  Warnings:

  - Added the required column `user_date` to the `prayers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prayers" ADD COLUMN     "user_date" TIMESTAMP(3) NOT NULL;
