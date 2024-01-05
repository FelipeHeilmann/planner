import { BookViewModel } from '@/api/view-model/BookViewModel'
import { IBookRepository } from '@/application/repository/IBooksRepository'

export class GetBookByName {
    private readonly bookRepository: IBookRepository
    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(name: string): Promise<BookViewModel[]> {
        const books = await this.bookRepository.getByName(name)

        return BookViewModel.mapCollection(books)
    }
}