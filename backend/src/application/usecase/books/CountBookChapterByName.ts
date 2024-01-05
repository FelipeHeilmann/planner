import { IBookRepository } from '@/application/repository/IBooksRepository'

export class CountBookChapterByName {
    private readonly bookRepository: IBookRepository
    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(name: string): Promise<number> {
        const count = await this.bookRepository.countChapter(name)

        return count
    }
}