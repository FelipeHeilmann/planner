import { FastifyInstance } from 'fastify'
import { readingPlanController } from '../controllers'
import { isUserActive } from '../middlewares/isUserActive'

export const readinPlanRoutes = (app: FastifyInstance) => {
    app.get('/reading-plans', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleGetAll(req, reply)
    })
    app.get('/reading-plans/:id', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleGetById(req, reply)
    })
    app.get('/reading-plans/:id/readings', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleGetReadings(req, reply)
    })
    app.get('/reading-plans/:id/readings/count', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleGetGroupPerMonth(req, reply)
    })
    app.get('/reading-plans/:id/readings/count/day', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleGetGroupPerDay(req, reply)
    })
    app.get('/reading-plans/:id/count', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleGetCount(req, reply)
    })
    app.post('/reading-plans', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleCreate(req, reply)
    })
    app.put('/reading-plans/:id', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleUpdate(req, reply)
    })
    app.patch('/reading-plans/:id/increase', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleIncrease(req, reply)
    })
    app.patch('/reading-plans/:id/decrease', async function (req, reply) {
        await isUserActive(req)
        return readingPlanController.handleDecrease(req, reply)
    })
}