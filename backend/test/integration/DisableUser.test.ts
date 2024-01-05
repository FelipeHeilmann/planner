import { DeleteUser } from '@/application/usecase/admin/DeleteUser'
import { prisma } from '@/infra/database'
import { UserCompletedBookDAOPrisma } from '@/infra/persistence/dao/prisma/UserCompletedBookDAOPrisma'
import { DevotionalRepositoryPrisma } from '@/infra/persistence/repository/prisma/DevotionalRepositoryPrisma'
import { MemorizationRepositoryPrisma } from '@/infra/persistence/repository/prisma/MemorizationRepositoryPrisma'
import { PrayerRepositoryPrisma } from '@/infra/persistence/repository/prisma/PrayerRepositoryPrisma'
import { ReadingPlanRepositoryPrisma } from '@/infra/persistence/repository/prisma/ReadingPlanRepositoryPrisma'
import { ReadingRepositoryPrisma } from '@/infra/persistence/repository/prisma/ReadingRepositoryPrisma'
import { UserRepositoryPrisma } from '@/infra/persistence/repository/prisma/UserRepositoryPrisma'
import { RabbitMQAdapter } from '@/infra/queue/RabbitMQAdapter'


test('Deve desativar um usuário', async function () {
    const userRepository = new UserRepositoryPrisma(prisma)
    const readingPlanRepository = new ReadingPlanRepositoryPrisma(prisma)
    const readingRepository = new ReadingRepositoryPrisma(prisma)
    const devotionalRepository = new DevotionalRepositoryPrisma(prisma)
    const userCompletedBookDAO = new UserCompletedBookDAOPrisma(prisma)
    const memorizationRepository = new MemorizationRepositoryPrisma(prisma)
    const prayerRepository = new PrayerRepositoryPrisma(prisma)
    const rabbitMQ = new RabbitMQAdapter()

    const deleteUser = new DeleteUser(userRepository, readingPlanRepository, userCompletedBookDAO, memorizationRepository, devotionalRepository, readingRepository, prayerRepository, rabbitMQ)


    await deleteUser.execute('ecd96c7a-c140-4ba0-8692-f4779305d9dd')

    const user = await userRepository.getById('ecd96c7a-c140-4ba0-8692-f4779305d9dd')

    expect(user.getIsActive()).toBe(false)
})