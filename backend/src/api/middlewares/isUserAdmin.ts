import { FastifyRequest } from 'fastify'
import { prisma } from '@/infra/database'
import { UserRepositoryPrisma } from '@/infra/repository/prisma/UserRepositoryPrisma'
import { ForbiddenError } from '../helpers/api-error'

/*eslint-disable*/
export async function isUserAdmin(req: FastifyRequest) {
    const userRepository = new UserRepositoryPrisma(prisma)

    await req.jwtVerify()

    const user = await userRepository.getById(req.user.sub)

    if (!user.getIsAdmin()) {
        throw new ForbiddenError('Usuário não é administrador.')
    }

}