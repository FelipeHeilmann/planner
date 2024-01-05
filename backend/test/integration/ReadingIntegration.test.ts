
import { UserRepositoryPrisma } from '@/infra/repository/prisma/UserRepositoryPrisma'
import { prisma } from '@/infra/database'
import { CreateReading } from '@/application/usecase/reading/CreateReading'
import { ReadingRepositoryPrisma } from '@/infra/repository/prisma/ReadingRepositoryPrisma'
import { UpdateUserPoints } from '@/application/usecase/user/UpdateUserPoints'
import { BookRepositoryPrisma } from '@/infra/repository/prisma/BookRepositoryPrisma'
import { ReadingPlanRepositoryPrisma } from '@/infra/repository/prisma/ReadingPlanRepositoryPrisma'
import { LevelRepositoryPrisma } from '@/infra/repository/prisma/LevelRepositoryPrisma'
import { CheckReadingPlanIsComplete } from '@/application/usecase/reading-plan/CheckReadingPlanIsComplete'




test('Deve criar uma leitura e validar se o usuário já terminou a leitura atual do livro e da biblia e ganhar pontos por terminar o livro', async function () {
    const userRepository = new UserRepositoryPrisma(prisma)
    const readingRepository = new ReadingRepositoryPrisma(prisma)
    const bookRepository = new BookRepositoryPrisma(prisma)
    const levelRepository = new LevelRepositoryPrisma(prisma)
    const readingPlanRepository = new ReadingPlanRepositoryPrisma(prisma)

    const updatePoints = new UpdateUserPoints(userRepository, levelRepository)
    const checkReadingPlanIsComplete = new CheckReadingPlanIsComplete(readingPlanRepository, readingRepository, bookRepository,)

    const createReading = new CreateReading(readingRepository, updatePoints, checkReadingPlanIsComplete, bookRepository, readingPlanRepository, userRepository)
    const user = await userRepository.getById('71baf668-206b-43e7-9349-c643330a12cb')

    const { reading } = await createReading.execute({
        bookName: 'Gênesis',
        bookChapters: [1, 2, 3, 4, 5, 6],
        duration: 5,
        userDate: new Date().toISOString(),
        userId: user.id!,
        readingPlanId: null
    })

    const user2 = await userRepository.getById(reading.getUserId())

    expect(user2.getPoints()).toBe(user.getPoints() + 5)
})