import { BookRepositoryPrisma } from '@/infra/persistence/repository/prisma/BookRepositoryPrisma'
import { DevotionalRepositoryPrisma } from '@/infra/persistence/repository/prisma/DevotionalRepositoryPrisma'
import { LevelRepositoryPrisma } from '@/infra/persistence/repository/prisma/LevelRepositoryPrisma'
import { UserRepositoryPrisma } from '@/infra/persistence/repository/prisma/UserRepositoryPrisma'
import { CreateDevotional } from '@/application/usecase/devotional/CreateDevotional'
import { CheckLevel } from '@/application/usecase/user/CheckLevel'
import { UpdateUserPoints } from '@/application/usecase/user/UpdateUserPoints'
import { prisma } from '@/infra/database'

const devotionalRepository = new DevotionalRepositoryPrisma(prisma)
const levelRepository = new LevelRepositoryPrisma(prisma)
const userRepository = new UserRepositoryPrisma(prisma)
const bookRepository = new BookRepositoryPrisma(prisma)
const checkLevel = new CheckLevel(levelRepository, userRepository)


const updatePoints = new UpdateUserPoints(userRepository, checkLevel)
const createDevotional = new CreateDevotional(devotionalRepository, updatePoints, bookRepository)


test('Deve criar uma devocional e adicionar um ponto ao usuário', async function () {
    const user = await userRepository.getById('71baf668-206b-43e7-9349-c643330a12cb')
    await createDevotional.execute({
        application: 'Aplicação de DDD',
        bookChapter: '1',
        bookName: 'Gênesis',
        learned: 'Aprendi DDD',
        subject: 'DDD',
        userDate: new Date().toISOString(),
        userId: user.id!,
        verses: [1, 2, 3, 4]
    })
})