import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import multipart from '@fastify/multipart'
import { routes } from './api/routes'
import { middlewareError } from './api/middlewares/error'
import { resolve } from 'node:path'
import { QueueController } from './infra/queue/QueueController'
import { RabbitMQAdapter } from './infra/queue/RabbitMQAdapter'
import { cancelUserAccess } from './application/usecase/user'
import 'dotenv/config'

// import path from 'path'
// import fs from 'fs'

// export const app = fastify({
//     https: {
//         key: fs.readFileSync(path.join('.', '/certificate_ssl', 'privkey.pem')),
//         cert: fs.readFileSync(path.join('.', '/certificate_ssl', 'fullchain.pem')),
//     }
// })

export const app = fastify()
async function main() {

    app.register(cors, {
        origin: true
    })

    app.get('/api', async function (res, reply) {
        reply.status(200).send({ version: 'API 2.0' })
    })

    app.register(multipart)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.register(require('@fastify/static'), {
        root: resolve(__dirname, '../resources'),
        prefix: '/resources',
    })

    app.register(jwt, {
        secret: process.env.SECRET!
    })

    middlewareError(app)
    routes(app)

    const PORT = Number(process.env.PORT) || 3333

    app.listen({
        port: PORT,
        host: '0.0.0.0'
    }).then(() => {
        console.log(`HTTP server running on port ${PORT}`)
    })

    const rabbitMQ = new RabbitMQAdapter()
    await rabbitMQ.connect()
    new QueueController(rabbitMQ, cancelUserAccess)
}

main()
