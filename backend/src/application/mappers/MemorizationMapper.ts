import { Book as PrismaBook } from '@prisma/client'
import { Memorization } from '@/domain/entities/Memorization'
import { Book } from '@/domain/entities/Book'
import { StatusEnum } from '@/domain/enum/statusEnum'

export class MemorizationMapper {
    static map(input: memorizationDBOutput) {
        return new Memorization(
            input.id,
            new Book(
                input.book.id,
                input.book.name,
                input.book.chapter,
                input.book.verses,
                input.book.words,
                input.book.testamentId
            ),
            input.timesMemorizated,
            input.userId,
            input.status === 'Em andamento' ? StatusEnum.OnProgress : StatusEnum.Finished,
            input.verse,
            input.createdAt,
            input.updatedAt,
            input.isFinished,
            input.description
        )
    }
    static mapCollection(input: memorizationDBOutput[]) {
        const memorizations: Memorization[] = []

        input.map(item => memorizations.push(MemorizationMapper.map(item)))

        return memorizations
    }
}

type memorizationDBOutput = {
    id: string
    bookId: number
    timesMemorizated: Date[]
    userId: string
    status: string
    verse: number
    createdAt: Date
    updatedAt: Date
    isFinished: boolean
    description: string | null
    book: PrismaBook
}