/*
  Warnings:

  - Added the required column `access_duration` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "access_duration" INTEGER NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL;
