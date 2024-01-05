import { NotFoundError } from '@/api/helpers/api-error'
import { IReadingRepository } from '@/application/repository/IReadingRepository'

export class DeleteReading {
    private readonly readingRepository: IReadingRepository
    constructor(readingRepository: IReadingRepository) {
        this.readingRepository = readingRepository
    }

    async execute(id: string): Promise<void> {
        const reading = await this.readingRepository.getById(id)

        if (reading === null) {
            throw new NotFoundError('Leitura não encontrada')
        }

        const bookName = reading.getBooks()[0].name

        const allReadings = await this.readingRepository.getAll(reading.getUserId())

        const readingsByBookName = allReadings.filter(reading => {
            const books = reading.getBooks()
            return books.some(book => book.name === bookName)
        })

        if (readingsByBookName.length === 1) await this.readingRepository.delete(id, bookName, reading.getUserId())
        else await this.readingRepository.delete(id)
    }
}