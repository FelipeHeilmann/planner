-- AlterTable
ALTER TABLE "memorizations" ADD COLUMN     "is_finished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "prayers" ADD COLUMN     "is_finished" BOOLEAN NOT NULL DEFAULT false;
