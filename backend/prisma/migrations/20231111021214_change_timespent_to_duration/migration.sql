/*
  Warnings:

  - You are about to drop the column `time_spent` on the `readings` table. All the data in the column will be lost.
  - Added the required column `duration` to the `readings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "readings" DROP COLUMN "time_spent",
ADD COLUMN     "duration" INTEGER NOT NULL;
