-- AlterTable
ALTER TABLE "users" ADD COLUMN     "disable_at" TIMESTAMP(3),
ADD COLUMN     "last_login_at" TIMESTAMP(3);
