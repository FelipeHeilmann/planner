import { LinkedList } from '@/application/datastructure/LinkedList'
import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'
import { IReadingRepository } from '@/application/repository/IReadingRepository'
import { books } from '@/application/utils/books'
import { Reading } from '@/domain/entities/Reading'
import { ReadingPlan } from '@/domain/entities/ReadingPlan'
import moment from 'moment'

export class GetReadingsPlanCount {
    private readonly readingRepository: IReadingRepository
    private readonly bookRepository: IBookRepository
    private readonly readingPlanRepository: IReadingPlanRepository

    constructor(
        readingRepository: IReadingRepository,
        bookRepository: IBookRepository,
        readingPlanRepository: IReadingPlanRepository
    ) {
        this.readingRepository = readingRepository
        this.bookRepository = bookRepository
        this.readingPlanRepository = readingPlanRepository
    }

    async execute(planId: string): Promise<Output> {
        const readings = await this.readingRepository.getByPlan(planId)
        const plan = await this.readingPlanRepository.getById(planId)
        const stringDate = plan.getCreatedAt().toISOString().substring(0, 10)
        const totalDays = moment().diff(moment(stringDate), 'days')

        const uniqueDays = this.getUniqueDays(readings, plan.getCreatedAt())
        const numberOfUniqueDays = uniqueDays.size

        let completedBooks = 0
        if (plan.getTestamentId() !== null) {
            completedBooks = await this.booksCompleted(plan.getPlanOf(), readings, plan.getTestamentId()!)
        } else {
            completedBooks = await this.booksCompleted(plan.getPlanOf(), readings)
        }

        const { totalBooks, totalChapters, totalVerses } = await this.getTotalStats(plan)

        const { chapters } = readings.reduce(
            (totals, reading) => {
                const books = reading.getBooks()
                totals.chapters += books.length
                return totals
            },
            { chapters: 0 }
        )

        return {
            totalBooks,
            chapters,
            totalChapters,
            totalVerses,
            totalDays,
            completedBooks,
            readingsDays: numberOfUniqueDays,
            readings: readings.length,
        }
    }

    private getUniqueDays(readings: Reading[], planCreatedAt: Date) {
        const uniqueDays = new Set()
        for (const reading of readings) {
            const userDate = reading.getUserDate()
            if (userDate >= planCreatedAt) {
                const formattedDay = userDate.toISOString().split('T')[0]
                uniqueDays.add(formattedDay)
            }
        }
        return uniqueDays
    }

    private async getTotalStats(plan: ReadingPlan) {
        let totalBooks = 0
        let totalChapters = 0
        let totalVerses = 0

        if (plan.getPlanOf() === 'book') {
            totalBooks = 1
            totalChapters = (await this.bookRepository.getByName(plan.getBook()!)).length
            totalVerses = (await this.bookRepository.getByName(plan.getBook()!)).reduce(
                (accumulator, current) => accumulator + current.verses,
                0
            )
        } else if (plan.getPlanOf() === 'bible') {
            totalBooks = 66
            totalChapters = 1189
            totalVerses = (await this.bookRepository.getAll()).reduce(
                (accumulator, current) => accumulator + current.verses,
                0
            )
        } else if (plan.getPlanOf() === 'testament') {
            const testamentId = plan.getTestamentId()!
            totalBooks = testamentId === 1 ? 39 : 27
            totalChapters = (await this.bookRepository.getByTestament(testamentId)).length
            totalVerses = (await this.bookRepository.getByTestament(testamentId)).reduce(
                (accumulator, current) => accumulator + current.verses,
                0
            )
        }

        return { totalBooks, totalChapters, totalVerses }
    }

    private async booksCompleted(planOf: string, readings: Reading[], testamentId?: number): Promise<number> {
        let completedBooks = 0

        let booksSliced = books
        if (planOf === 'testament' && testamentId) {
            booksSliced = testamentId === 1 ? books.slice(0, 39) : books.slice(39)
        }

        for (const book of booksSliced) {
            const books = await this.bookRepository.getByName(book)
            const booksId = books.map((item) => item.id)

            const allBooksLinkedLists: LinkedList<number>[] = []

            for (const bookId of booksId) {
                const linkedList = new LinkedList<number>()
                linkedList.setHead(bookId)
                allBooksLinkedLists.push(linkedList)
            }

            const readingsBooksId: number[] = []

            for (const reading of readings) {
                for (const book of reading.getBooks()) {
                    readingsBooksId.push(book.id)
                }
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

            if (lowest > 0) {
                completedBooks++
            }

        }

        return completedBooks
    }
}

type Output = {
    readings: number;
    chapters: number;
    totalBooks: number;
    totalVerses: number;
    totalDays: number;
    completedBooks: number;
    readingsDays: number;
    totalChapters: number;
}