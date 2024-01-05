import { Book } from '@/domain/entities/Book'
import { Devotional } from '@/domain/entities/Devotional'
import { Book as PrismBook } from '@prisma/client'

export class DevotionalMapper {
    static map(input: DevotionalDBOutput) {
        return new Devotional(
            input.id,
            new Book(
                input.book.id,
                input.book.name,
                input.book.chapter,
                input.book.verses,
                input.book.words,
                input.book.testamentId
            ),
            input.subject,
            input.learned,
            input.application,
            input.verses,
            input.userId,
            input.userDate,
            input.createdAt,
            input.updatedAt,
        )
    }
    static mapCollection(input: DevotionalDBOutput[]) {
        const devotionals: Devotional[] = []

        input.map(item => devotionals.push(DevotionalMapper.map(item)))

        return devotionals
    }
}

type DevotionalDBOutput = {
    id: string
    bookId: number
    subject: string
    learned: string
    application: string
    verses: number[]
    userId: string
    userDate: Date
    createdAt: Date
    updatedAt: Date
    book: PrismBook
}