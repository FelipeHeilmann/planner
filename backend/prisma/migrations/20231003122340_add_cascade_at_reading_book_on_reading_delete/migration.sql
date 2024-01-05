-- DropForeignKey
ALTER TABLE "reading_book" DROP CONSTRAINT "reading_book_reading_id_fkey";

-- AddForeignKey
ALTER TABLE "reading_book" ADD CONSTRAINT "reading_book_reading_id_fkey" FOREIGN KEY ("reading_id") REFERENCES "readings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
