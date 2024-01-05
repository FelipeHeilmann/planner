/*
  Warnings:

  - Added the required column `book` to the `reading_plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "reading_plan" ADD COLUMN     "book" TEXT NOT NULL;
