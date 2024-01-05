import { FastifyRequest } from 'fastify'
import { prisma } from '@/infra/database'
import { UserRepositoryPrisma } from '@/infra/repository/prisma/UserRepositoryPrisma'
import { ForbiddenError } from '../helpers/api-error'

/*eslint-disable*/
export async function isUserActive(req: FastifyRequest) {
    const userRepository = new UserRepositoryPrisma(prisma)

    await req.jwtVerify()

    const user = await userRepository.getById(req.user.sub)

    if (!user.getIsActive()) {
        throw new ForbiddenError('Usuário com conta inativa!')
    }

}