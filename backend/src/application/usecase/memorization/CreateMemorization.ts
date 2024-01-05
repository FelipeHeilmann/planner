import { Memorization } from '@/domain/entities/Memorization'
import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'
import { UpdateUserPoints } from '../user/UpdateUserPoints'
import { StatusEnum } from '@/domain/enum/statusEnum'

export class CreateMemorization {
    private readonly memorizationRepository: IMemorizationRepository
    private readonly updatePoints: UpdateUserPoints
    private readonly bookRepository: IBookRepository
    constructor(memorizationRepository: IMemorizationRepository, updatePoints: UpdateUserPoints, bookRepository: IBookRepository) {
        this.memorizationRepository = memorizationRepository
        this.updatePoints = updatePoints
        this.bookRepository = bookRepository
    }

    async execute(input: Input): Promise<Memorization> {
        const book = await this.bookRepository.getByNameAndChapter(input.bookName, Number(input.bookChapter))

        const memorization = Memorization.create(
            book,
            [],
            input.userId,
            StatusEnum.OnProgress,
            input.verse,
            input.description
        )

        await this.memorizationRepository.save(memorization)

        return memorization
    }
}

type Input = {
    userId: string
    bookName: string
    bookChapter: string
    verse: number
    description: string | null
}