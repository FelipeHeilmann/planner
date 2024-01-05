import { readingController } from '../controllers'
import { FastifyInstance } from 'fastify/types/instance'
import { isUserActive } from '../middlewares/isUserActive'

export const readingRoutes = (app: FastifyInstance) => {
    app.get('/readings', async function (req, reply) {
        await isUserActive(req)
        return readingController.handleGetAll(req, reply)
    })
    app.get('/readings/:id', async function (req, reply) {
        await isUserActive(req)
        return readingController.handleGetById(req, reply)
    })
    app.get('/readings/count', async function (req, reply) {
        await isUserActive(req)
        return readingController.handleGetReadingsGroupByMonth(req, reply)
    })
    app.post('/readings', async function (req, reply) {
        await isUserActive(req)
        return readingController.handleCreate(req, reply)
    })
    app.put('/readings/:id', async function (req, reply) {
        await isUserActive(req)
        return readingController.handleUpdate(req, reply)
    })
    app.delete('/readings/:id', async function (req, reply) {
        await isUserActive(req)
        return readingController.handleDelete(req, reply)
    })
}