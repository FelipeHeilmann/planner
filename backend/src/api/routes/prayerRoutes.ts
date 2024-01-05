import { prayerController } from '../controllers'
import { FastifyInstance } from 'fastify/types/instance'
import { isUserActive } from '../middlewares/isUserActive'

export const prayerRoutes = (app: FastifyInstance) => {

    app.get('/prayers', async function (req, reply) {
        await isUserActive(req)
        return prayerController.handleGetAll(req, reply)
    })
    app.get('/prayers/:id', async function (req, reply) {
        await isUserActive(req)
        return prayerController.handleGetById(req, reply)
    })
    app.post('/prayers', async function (req, reply) {
        await isUserActive(req)
        return prayerController.handleCreate(req, reply)
    })
    app.put('/prayers/:id', async function (req, reply) {
        await isUserActive(req)
        return prayerController.handleUpdate(req, reply)
    })
    app.patch('/prayers/:id/finished', async function (req, reply) {
        await isUserActive(req)
        return prayerController.handleFinished(req, reply)
    })
    app.patch('/prayers/:id/prayed', async function (req, reply) {
        await isUserActive(req)
        return prayerController.handleAddTimePrayed(req, reply)
    })
    app.delete('/prayers/:id', async function (req, reply) {
        await isUserActive(req)
        return prayerController.handleDelete(req, reply)
    })
}