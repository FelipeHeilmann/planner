import { BookRepositoryPrisma } from '@/infra/persistence/repository/prisma/BookRepositoryPrisma'
import { LevelRepositoryPrisma } from '@/infra/persistence/repository/prisma/LevelRepositoryPrisma'
import { MemorizationRepositoryPrisma } from '@/infra/persistence/repository/prisma/MemorizationRepositoryPrisma'
import { UserRepositoryPrisma } from '@/infra/persistence/repository/prisma/UserRepositoryPrisma'
import { AddTimeMemorizated } from '@/application/usecase/memorization/AddTimeMemorizated'
import { CreateMemorization } from '@/application/usecase/memorization/CreateMemorization'
import { FinishedMemorization } from '@/application/usecase/memorization/FinishedMemorization'
import { CheckLevel } from '@/application/usecase/user/CheckLevel'
import { UpdateUserPoints } from '@/application/usecase/user/UpdateUserPoints'
import { prisma } from '@/infra/database'



test('Deve criar uma memorização, adicionar duas datas de memorização e finalizar', async function () {

    const userRepository = new UserRepositoryPrisma(prisma)
    const levelRepository = new LevelRepositoryPrisma(prisma)
    const checkLevel = new CheckLevel(levelRepository, userRepository)
    const memorizationRepository = new MemorizationRepositoryPrisma(prisma)
    const bookRepository = new BookRepositoryPrisma(prisma)
    const updatePoints = new UpdateUserPoints(userRepository, checkLevel)
    const createMemorization = new CreateMemorization(memorizationRepository, updatePoints, bookRepository)
    const addTimeMemorizated = new AddTimeMemorizated(memorizationRepository)
    const finishedMemorization = new FinishedMemorization(memorizationRepository, updatePoints)
    const user = await userRepository.getById('71baf668-206b-43e7-9349-c643330a12cb')

    const memorization = await createMemorization.execute({
        bookChapter: '1',
        bookName: 'Gênesis',
        timesMemorizated: [],
        description: 'Meu versículo',
        userId: user.id!,
        verse: 1,
    })

    const memorizationId = memorization.id

    await addTimeMemorizated.execute(new Date().toISOString(), memorizationId)
    await addTimeMemorizated.execute(new Date().toISOString(), memorizationId)

    await finishedMemorization.execute(memorizationId)
})