import { devotionalController } from '../controllers'
import { FastifyInstance } from 'fastify/types/instance'
import { isUserActive } from '../middlewares/isUserActive'

export const devotionalRoutes = (app: FastifyInstance) => {

    app.get('/devotionals', async function (req, reply) {
        await isUserActive(req)
        return devotionalController.handleGetAll(req, reply)
    })
    app.get('/devotionals/:id', async function (req, reply) {
        await isUserActive(req)
        return devotionalController.handleGetById(req, reply)
    })
    app.post('/devotionals', async function (req, reply) {
        await isUserActive(req)
        return devotionalController.handleCreate(req, reply)
    })
    app.put('/devotionals/:id', async function (req, res) {
        await isUserActive(req)
        return devotionalController.handleUpdate(req, res)
    })
    app.delete('/devotionals/:id', async function (req, res) {
        await isUserActive(req)
        return devotionalController.handleDelete(req, res)
    })
}


