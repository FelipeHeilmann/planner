import { PrismaClient } from '@prisma/client'
import { IBookRepository } from '@/application/repository/IBooksRepository'
import { Book } from '@/domain/entities/Book'
import { NotFoundError } from '@/api/helpers/api-error'
import { BookMapper } from '@/application/mappers/BookMapper'

export class BookRepositoryPrisma implements IBookRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async getAll(): Promise<Book[]> {
        const books = BookMapper.mapCollection(await this.prisma.book.findMany())

        return books
    }
    async getById(bookId: number): Promise<Book> {
        const result = await this.prisma.book.findFirst({
            where: {
                id: bookId
            }
        })

        if (result === null) {
            throw new NotFoundError('Livro não encontrado')
        }

        const book = BookMapper.map(result)

        return book

    }
    async getByName(name: string): Promise<Book[]> {
        const result = await this.prisma.book.findMany({
            where: {
                name
            }
        })

        if (result === null) {
            throw new NotFoundError('Livro não encontrado')
        }

        const books = BookMapper.mapCollection(result)

        return books
    }
    async getByNameAndChapter(bookName: string, chapter: number): Promise<Book> {
        const result = await this.prisma.book.findFirst({
            where: {
                name: bookName,
                chapter: chapter
            }
        })


        if (result === null) {
            throw new NotFoundError('Livro não encontrado')
        }

        const books = BookMapper.map(result)

        return books
    }
    async getByTestament(testamentId: number): Promise<Book[]> {
        const result = await this.prisma.book.findMany({
            where: {
                testamentId
            }
        })

        if (result === null) {
            throw new NotFoundError('Livro não encontrado')
        }

        const books = BookMapper.mapCollection(result)

        return books
    }
    async countChapter(name: string): Promise<number> {
        const count = await this.prisma.book.count({
            where: {
                name: name
            }
        })

        return count
    }

}