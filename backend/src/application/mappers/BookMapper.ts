import { Book } from '@/domain/entities/Book'

export class BookMapper {
    static map(input: bookDBOutput) {
        return new Book(
            input.id,
            input.name,
            input.chapter,
            input.verses,
            input.words,
            input.testamentId
        )
    }

    static mapCollection(input: bookDBOutput[]) {
        const books: Book[] = []

        input.map(item => books.push(BookMapper.map(item)))

        return books
    }
}

type bookDBOutput = {
    id: number
    name: string
    chapter: number
    verses: number
    words: number
    testamentId: number
}