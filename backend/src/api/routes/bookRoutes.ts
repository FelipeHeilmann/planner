import { bookController } from '../controllers'
import { FastifyInstance } from 'fastify/types/instance'
import { isUserActive } from '../middlewares/isUserActive'

export const bookRoutes = (app: FastifyInstance) => {

    app.get('/books/chapters', async function (req, reply) {
        await isUserActive(req)
        return bookController.handleCountBookChapterByName(req, reply)
    })
    app.get('/books/:id', async function (req, reply) {
        await isUserActive(req)
        return bookController.handleGetBookById(req, reply)
    })
    app.get('/books/name/:name', async function (req, reply) {
        await isUserActive(req)
        return bookController.handleGetBooksByName(req, reply)
    })
    app.get('/books/testament/:id', async function (req, reply) {
        await isUserActive(req)
        return bookController.handleGetBooksByTestament(req, reply)
    })
    app.get('/books/completed', async function (req, reply) {
        await isUserActive(req)
        return bookController.handleGetAllCompletedBooks(req, reply)
    })
    app.get('/books/verses', async function (req, res) {
        await isUserActive(req)
        return bookController.handleCountBookVerses(req, res)
    })
}

