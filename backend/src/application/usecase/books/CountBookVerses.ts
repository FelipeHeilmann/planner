import { IBookRepository } from '@/application/repository/IBooksRepository'

export class CountBookVerses {
    private readonly bookRepository: IBookRepository
    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(bookName: string, chapter: string): Promise<number> {
        const book = await this.bookRepository.getByNameAndChapter(bookName, Number(chapter))

        return book.verses

    }
}