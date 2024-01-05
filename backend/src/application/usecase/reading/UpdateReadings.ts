import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IReadingRepository } from '@/application/repository/IReadingRepository'

export class UpdateReading {
    private readonly readingRepository: IReadingRepository
    private readonly bookRepository: IBookRepository
    constructor(readingRepository: IReadingRepository, bookRepository: IBookRepository) {
        this.readingRepository = readingRepository
        this.bookRepository = bookRepository
    }

    async execute(input: Input): Promise<void> {
        const reading = await this.readingRepository.getById(input.id)

        const books = []

        for (const chapter of input.bookChapters) {
            const book = await this.bookRepository.getByNameAndChapter(input.bookName, chapter)

            books.push(book)
        }


        reading.setUserDate(new Date(input.userDate))
        reading.setUpdatedAt(new Date())
        reading.setDuration(input.duration)

        reading.updateBooks(books)


        await this.readingRepository.update(reading)
    }
}

type Input = {
    id: string
    bookChapters: number[]
    bookName: string
    duration: number
    userDate: string
}