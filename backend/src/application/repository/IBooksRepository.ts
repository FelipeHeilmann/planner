import { Book } from '../../domain/entities/Book'

export interface IBookRepository {
    getAll(): Promise<Book[]>

    getById(bookId: number): Promise<Book>

    getByNameAndChapter(bookName: string, chapter: number): Promise<Book>

    getByName(name: string): Promise<Book[]>

    getByTestament(testamentId: number): Promise<Book[]>

    countChapter(name: string): Promise<number>

}