import { LinkedList } from '@/application/datastructure/LinkedList'
import { Book } from '../entities/Book'
import { Reading } from '../entities/Reading'
import { User } from '../entities/User'

export class CompleteBible {
    check(readings: Reading[], books: Book[], user: User) {
        const booksId = books.map(item => item.id)

        const readingsBooksId: number[] = []

        for (const reading of readings) {
            for (const book of reading.getBooks()) {
                readingsBooksId.push(book.id)
            }
        }

        const allBooksLinkedLists: LinkedList<number>[] = []

        for (const bookId of booksId) {
            const linkedList = new LinkedList<number>()
            linkedList.setHead(bookId)
            allBooksLinkedLists.push(linkedList)
        }

        for (const readingBookId of readingsBooksId) {
            for (const bookLinkedList of allBooksLinkedLists) {
                if (readingBookId === bookLinkedList.getHead().element) {
                    bookLinkedList.push(1)
                }
            }
        }

        let lowest = Infinity
        for (const bookLinkedList of allBooksLinkedLists) {
            if (bookLinkedList.size() < lowest) {
                lowest = bookLinkedList.size()
            }
        }

        if (user.getCompletedBible() < lowest) {
            user.completeBible()
        }

        return {
            user
        }

    }
}