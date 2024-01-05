import { LinkedList } from '@/application/datastructure/LinkedList'
import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IReadingRepository } from '@/application/repository/IReadingRepository'
import { IUserRepository } from '@/application/repository/IUserRepository'
// import { CompletedBook } from '@/domain/entities/CompletedBook'
import { Reading } from '@/domain/entities/Reading'

export class GetAllCompletedBooks {
    private readonly userRepository: IUserRepository
    private readonly readingsRepository: IReadingRepository
    private readonly bookRepository: IBookRepository

    constructor(userRepository: IUserRepository, readingsRepository: IReadingRepository, bookRepository: IBookRepository) {
        this.userRepository = userRepository
        this.readingsRepository = readingsRepository
        this.bookRepository = bookRepository
    }

    async execute(userId: string) {
        const output = []
        const user = await this.userRepository.getById(userId)

        const completedBooks = user.getCompletedBook()

        const readings = await this.readingsRepository.getAll(userId)

        for (const completedBook of completedBooks) {

            const matchingReading = readings.filter(reading =>
                reading.getBooks()[0].name === completedBook.getBook()
            )

            if (matchingReading) {
                const completedBookPercentage = await this.bookCompletedPercentage(matchingReading)
                const result = {
                    ...completedBook,
                    completedPercentage: completedBookPercentage,
                }

                output.push(result)
            }
        }

        return output

    }

    private async bookCompletedPercentage(readings: Reading[]) {
        const books = await this.bookRepository.getByName(readings[0].getBooks()[0].name)

        const bookIds = books.map(item => item.id)

        const bookLinkedLists: LinkedList<number>[] = []


        for (const bookId of bookIds) {
            const linkedList = new LinkedList<number>()
            linkedList.setHead(bookId)
            bookLinkedLists.push(linkedList)
        }

        const readingsBookId: number[] = []

        for (const reading of readings) {
            for (const book of reading.getBooks()) {
                readingsBookId.push(book.id)
            }
        }

        for (const readingBookId of readingsBookId) {
            for (const bookLinkedList of bookLinkedLists) {
                if (readingBookId === bookLinkedList.getHead().element) {
                    bookLinkedList.push(1)
                }
            }
        }

        const totalReadings = []
        for (const bookLinkedList of bookLinkedLists) {
            if (bookLinkedList.size() >= 1)
                totalReadings.push(1)
        }

        return (((totalReadings.length) / bookIds.length) * 100).toFixed(2)


    }
}