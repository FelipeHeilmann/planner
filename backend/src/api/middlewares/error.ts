import { DoneFuncWithErrOrRes, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ApiError } from '../helpers/api-error'

export const middlewareError = (app: FastifyInstance) => {
    /*eslint-disable*/
    app.addHook('onError', (req: FastifyRequest, reply: FastifyReply, error: Error & Partial<ApiError>, done: DoneFuncWithErrOrRes): void => {
        const statusCode = error.statusCode ?? 500
        const message = error.statusCode ? error.message : 'Erro interno'
        done()
    })
}