import { memorizationController } from '../controllers'
import { FastifyInstance } from 'fastify/types/instance'
import { isUserActive } from '../middlewares/isUserActive'

export const memorizationRoutes = (app: FastifyInstance) => {

    app.get('/memorizations', async function (req, reply) {
        await isUserActive(req)
        return memorizationController.handleGetAll(req, reply)
    })
    app.get('/memorizations/:id', async function (req, reply) {
        await isUserActive(req)
        return memorizationController.handleGetById(req, reply)
    })
    app.post('/memorizations', async function (req, reply) {
        await isUserActive(req)
        return memorizationController.handleCreate(req, reply)
    })
    app.put('/memorizations/:id', async function (req, reply) {
        await isUserActive(req)
        return memorizationController.handleUpdate(req, reply)
    })
    app.patch('/memorizations/:id/memorized', async function (req, reply) {
        await isUserActive(req)
        return memorizationController.handleAddTimeMemorizated(req, reply)
    })
    app.patch('/memorizations/:id/finished', async function (req, reply) {
        await isUserActive(req)
        return memorizationController.handeleFinished(req, reply)
    })
    app.delete('/memorizations/:id', async function (req, reply) {
        await isUserActive(req)
        return memorizationController.handleDelete(req, reply)
    })
}