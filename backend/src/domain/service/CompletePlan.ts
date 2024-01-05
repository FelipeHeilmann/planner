import { Book } from '../entities/Book'
import { Reading } from '../entities/Reading'
import { ReadingPlan } from '../entities/ReadingPlan'

export class CompletePlan {
    check(readings: Reading[], books: Book[], readingPlan: ReadingPlan) {
        const booksId = books.map(book => book.id)

        const readingsBooksId: number[] = []
        for (const reading of readings) {
            for (const book of reading.getBooks()) {
                readingsBooksId.push(book.id)
            }
        }

        if (booksId.every((booksIds) => readingsBooksId.includes(booksIds))) {
            readingPlan.finished()
        }

        return readingPlan
    }
}