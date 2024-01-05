/*
  Warnings:

  - You are about to drop the column `verse` on the `devotionals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "devotionals" DROP COLUMN "verse",
ADD COLUMN     "verses" INTEGER[];
