-- AlterTable
ALTER TABLE "coupons" ADD COLUMN     "affiliate_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_affiliate" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "affiliate_payments" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "coupon_id" TEXT NOT NULL,

    CONSTRAINT "affiliate_payments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "coupons" ADD CONSTRAINT "coupons_affiliate_id_fkey" FOREIGN KEY ("affiliate_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
