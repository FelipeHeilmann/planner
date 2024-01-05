/*
  Warnings:

  - Made the column `user_id` on table `users_coupons` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "users_coupons" DROP CONSTRAINT "users_coupons_user_id_fkey";

-- AlterTable
ALTER TABLE "users_coupons" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
