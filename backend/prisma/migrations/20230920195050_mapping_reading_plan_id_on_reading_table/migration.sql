/*
  Warnings:

  - You are about to drop the column `readingPlanId` on the `readings` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "readings" DROP CONSTRAINT "readings_readingPlanId_fkey";

-- AlterTable
ALTER TABLE "readings" DROP COLUMN "readingPlanId",
ADD COLUMN     "reading_plan_id" TEXT;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_reading_plan_id_fkey" FOREIGN KEY ("reading_plan_id") REFERENCES "reading_plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
