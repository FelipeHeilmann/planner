import { FastifyInstance } from 'fastify/types/instance'
import { bookRoutes } from './bookRoutes'
import { devotionalRoutes } from './devotionalRoutes'
import { memorizationRoutes } from './memorizationRoutes'
import { prayerRoutes } from './prayerRoutes'
import { readingRoutes } from './readingRoutes'
import { userRoutes } from './userRoutes'
import { readinPlanRoutes } from './readingPlanRoutes'
import { adminRoutes } from './adminRoutes'



const appRoutes = [
    prayerRoutes,
    readingRoutes,
    memorizationRoutes,
    devotionalRoutes,
    bookRoutes,
    userRoutes,
    readinPlanRoutes,
    adminRoutes
]

export const routes = (app: FastifyInstance) => {
    for (const route of appRoutes) {
        route(app)
    }
}

