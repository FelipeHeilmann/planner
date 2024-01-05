import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IDevotionalRepository } from '@/application/repository/IDevotionalRepository'

export class UpdateDevotional {
    private readonly devotionalRepository: IDevotionalRepository
    private readonly bookRepository: IBookRepository
    constructor(devotionalRepository: IDevotionalRepository, bookRepository: IBookRepository) {
        this.devotionalRepository = devotionalRepository
        this.bookRepository = bookRepository
    }

    async execute(input: Input): Promise<void> {
        const devotional = await this.devotionalRepository.getById(input.id)
        const book = await this.bookRepository.getByNameAndChapter(input.bookName, Number(input.bookChapter))

        devotional.setBook(book)
        devotional.setSubject(input.subject)
        devotional.setLearned(input.learned)
        devotional.setApplication(input.application)
        devotional.setVerses(input.verses)
        devotional.setUserDate(new Date(input.userDate))
        devotional.setUpdatedAt(new Date())

        await this.devotionalRepository.update(devotional)
    }
}

type Input = {
    id: string
    bookName: string
    bookChapter: string
    subject: string
    learned: string
    application: string
    verses: number[]
    userDate: string
}