/*
  Warnings:

  - You are about to drop the column `userId` on the `user_completed_books` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `user_completed_books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_completed_books" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "imageUrl",
ADD COLUMN     "image_url" TEXT;
