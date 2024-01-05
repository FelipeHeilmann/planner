import { FastifyReply, FastifyRequest } from 'fastify'
import { CountBookChapterByName } from '@/application/usecase/books/CountBookChapterByName'
import { GetBookById } from '@/application/usecase/books/GetBookById'
import { GetBookByName } from '@/application/usecase/books/GetBookByName'
import { GetBookByTestament } from '@/application/usecase/books/GetBookByTestament'
import { GetAllCompletedBooks } from '@/application/usecase/books/GetAllCompletedBooks'
import { CountBookVerses } from '@/application/usecase/books/CountBookVerses'

export class BookController {
    private readonly countBookChapterByName: CountBookChapterByName
    private readonly getBookById: GetBookById
    private readonly getBookByName: GetBookByName
    private readonly getBookByTestament: GetBookByTestament
    private readonly getAllCompletedBook: GetAllCompletedBooks
    private readonly countBookVerses: CountBookVerses
    constructor(
        countBookChapterByName: CountBookChapterByName,
        getBookById: GetBookById,
        getBookByName: GetBookByName,
        getBookByTestament: GetBookByTestament,
        getAllCompletedBook: GetAllCompletedBooks,
        countBookVerses: CountBookVerses
    ) {
        this.countBookChapterByName = countBookChapterByName
        this.getBookById = getBookById
        this.getBookByName = getBookByName
        this.getBookByTestament = getBookByTestament
        this.getAllCompletedBook = getAllCompletedBook
        this.countBookVerses = countBookVerses
    }

    async handleCountBookChapterByName(req: FastifyRequest, reply: FastifyReply) {
        const { name } = req.query as { name: string }

        const count = await this.countBookChapterByName.execute(name)

        return reply.status(200).send({ count })
    }
    async handleGetBookById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const book = await this.getBookById.execute(Number(id))

        return reply.status(200).send(book)

    }
    async handleGetBooksByName(req: FastifyRequest, reply: FastifyReply) {
        const { name } = req.params as { name: string }

        const books = await this.getBookByName.execute(name)

        return reply.status(200).send(books)
    }
    async handleGetBooksByTestament(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const books = await this.getBookByTestament.execute(Number(id))

        return reply.status(200).send(books)
    }
    async handleGetAllCompletedBooks(req: FastifyRequest, reply: FastifyReply) {
        const completedBooks = await this.getAllCompletedBook.execute(req.user.sub)

        reply.status(200).send(completedBooks)
    }
    async handleCountBookVerses(req: FastifyRequest, reply: FastifyReply) {
        const { name, chapter } = req.query as { name: string, chapter: string }

        const count = await this.countBookVerses.execute(name, chapter)

        reply.status(200).send({ count })
    }
}