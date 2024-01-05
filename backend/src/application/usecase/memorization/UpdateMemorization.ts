import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'

export class UpdateMemorization {
    private readonly memorizationRepository: IMemorizationRepository
    private readonly bookRepository: IBookRepository
    constructor(memorizationRepository: IMemorizationRepository, bookRepository: IBookRepository) {
        this.memorizationRepository = memorizationRepository
        this.bookRepository = bookRepository
    }

    async execute(input: Input): Promise<void> {
        const memorization = await this.memorizationRepository.getById(input.id)

        const book = await this.bookRepository.getByNameAndChapter(input.bookName, Number(input.bookChapter))

        memorization.setBook(book)
        memorization.setVerse(input.verse)
        memorization.setUpdatedAt(new Date())
        memorization.setDescription(input.description)

        await this.memorizationRepository.update(memorization)

    }
}

type Input = {
    id: string
    bookName: string
    bookChapter: string
    verse: number
    description: string | null
}