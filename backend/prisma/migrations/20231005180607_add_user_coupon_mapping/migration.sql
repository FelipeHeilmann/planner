/*
  Warnings:

  - You are about to drop the `UserCoupon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserCoupon" DROP CONSTRAINT "UserCoupon_coupon_id_fkey";

-- DropForeignKey
ALTER TABLE "UserCoupon" DROP CONSTRAINT "UserCoupon_user_id_fkey";

-- DropTable
DROP TABLE "UserCoupon";

-- CreateTable
CREATE TABLE "users_coupons" (
    "id" TEXT NOT NULL,
    "coupon_id" TEXT NOT NULL,
    "user_id" TEXT,

    CONSTRAINT "users_coupons_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_coupons" ADD CONSTRAINT "users_coupons_coupon_id_fkey" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
