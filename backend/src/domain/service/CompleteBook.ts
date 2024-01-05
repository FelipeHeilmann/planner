import { LinkedList } from '@/application/datastructure/LinkedList'
import { Book } from '../entities/Book'
import { Reading } from '../entities/Reading'
import { User } from '../entities/User'

export class CompleteBook {
    check(createdReading: Reading, readings: Reading[], books: Book[], user: User) {
        const bookName = books[0].name

        const booksId = books.map(item => item.id)

        const allBookLinkedLists: LinkedList<number>[] = []

        for (const bookId of booksId) {
            const linkedList = new LinkedList<number>()
            linkedList.setHead(bookId)
            allBookLinkedLists.push(linkedList)
        }

        const readingsBooksId: number[] = []

        for (const reading of readings) {
            for (const book of reading.getBooks()) {
                readingsBooksId.push(book.id)
            }
        }

        for (const readingBookId of readingsBooksId) {
            for (const bookLinkedList of allBookLinkedLists) {
                if (readingBookId === bookLinkedList.getHead().element) {
                    bookLinkedList.push(1)
                }
            }
        }

        let lowest = Infinity
        for (const bookLinkedList of allBookLinkedLists) {
            if (bookLinkedList.size() < lowest) {
                lowest = bookLinkedList.size()
            }
        }
        let completed

        const existCompletedReading = user.getCompletedBook().findIndex(item => item.getBook() === bookName)

        if (existCompletedReading === -1) {
            const finishedAt: Date[] = []
            const startedAt: Date[] = [createdReading.getUserDate()]

            lowest !== 0 && finishedAt.push(new Date())
            user.completeBook(bookName, lowest, finishedAt, startedAt)
            if (lowest === 0) {
                completed = false
            } else {
                completed = true
            }
        }
        else {
            const completedBooks = user.getCompletedBook()
            if (existCompletedReading !== -1 && lowest > completedBooks[(existCompletedReading)].getCompleted()) {
                const finishedAt = completedBooks[(existCompletedReading)].getFinishedAt()
                const startedAt = completedBooks[(existCompletedReading)].getStartedAt()
                finishedAt.push(new Date())
                user.completeBook(bookName, completedBooks[(existCompletedReading)].getCompleted() + 1, finishedAt, startedAt)

                completed = true
            }
            else {
                const finishedAt = completedBooks[(existCompletedReading)].getFinishedAt()
                const startedAt = completedBooks[(existCompletedReading)].getStartedAt()
                startedAt.push(new Date())
                completed = false

                user.updateCompletedBook(bookName, completedBooks[(existCompletedReading)].getCompleted(), finishedAt, startedAt)
            }
        }

        return {
            user,
            completed,
            readingsBooksId,
            booksId
        }

    }
}