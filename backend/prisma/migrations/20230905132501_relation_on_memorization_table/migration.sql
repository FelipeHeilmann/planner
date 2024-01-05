/*
  Warnings:

  - Added the required column `userId` to the `memorizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "memorizations" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "memorizations" ADD CONSTRAINT "memorizations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memorizations" ADD CONSTRAINT "memorizations_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
