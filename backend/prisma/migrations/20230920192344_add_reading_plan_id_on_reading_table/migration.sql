-- AlterTable
ALTER TABLE "readings" ADD COLUMN     "readingPlanId" TEXT;

-- AddForeignKey
ALTER TABLE "readings" ADD CONSTRAINT "readings_readingPlanId_fkey" FOREIGN KEY ("readingPlanId") REFERENCES "reading_plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
