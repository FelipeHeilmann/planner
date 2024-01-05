import { Devotional } from '@/domain/entities/Devotional'
import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IDevotionalRepository } from '@/application/repository/IDevotionalRepository'
import { UpdateUserPoints } from '../user/UpdateUserPoints'

export class CreateDevotional {
    private readonly devotionalRepository: IDevotionalRepository
    private readonly updatePoints: UpdateUserPoints
    private readonly bookRepository: IBookRepository
    constructor(devotionalRepository: IDevotionalRepository, updatePoints: UpdateUserPoints, bookRepository: IBookRepository) {
        this.devotionalRepository = devotionalRepository
        this.updatePoints = updatePoints
        this.bookRepository = bookRepository
    }

    async execute(input: Input): Promise<{ devotional: Devotional, message: string | undefined }> {
        const book = await this.bookRepository.getByNameAndChapter(input.bookName, Number(input.bookChapter))

        const devotional = Devotional.create(
            input.subject,
            input.learned,
            input.application,
            input.verses,
            input.userId,
            new Date(input.userDate),
            book
        )

        await this.devotionalRepository.save(devotional)

        const existMessage = await this.updatePoints.execute(devotional.getUserId(), 1)

        let message
        existMessage === true ? message = 'Parabéns! Você subiu de nível' : undefined

        return { devotional, message }
    }
}

type Input = {
    bookName: string
    bookChapter: string
    subject: string
    learned: string
    application: string
    verses: number[]
    userId: string
    userDate: string
}