import { BookViewModel } from '@/api/view-model/BookViewModel'
import { IBookRepository } from '@/application/repository/IBooksRepository'

export class GetBookById {
    private readonly bookRepository: IBookRepository
    constructor(bookRepository: IBookRepository) {
        this.bookRepository = bookRepository
    }

    async execute(id: number): Promise<BookViewModel> {
        const book = await this.bookRepository.getById(id)

        return BookViewModel.map(book)
    }
}