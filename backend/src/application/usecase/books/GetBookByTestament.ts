import { BookViewModel } from '@/api/view-model/BookViewModel'
import { IBookRepository } from '@/application/repository/IBooksRepository'

export class GetBookByTestament {
    private readonly bookRepository: IBookRepository
    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(testamentId: number): Promise<BookViewModel[]> {
        const books = await this.bookRepository.getByTestament(testamentId)

        return BookViewModel.mapCollection(books)
    }
}