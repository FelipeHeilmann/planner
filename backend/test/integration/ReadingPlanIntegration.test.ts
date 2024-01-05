import { ReadingPlanRepositoryPrisma } from '@/infra/persistence/repository/prisma/ReadingPlanRepositoryPrisma'
import { CreateReadingPlan } from '@/application/usecase/reading-plan/CreateReadingPlan'
import { prisma } from '@/infra/database'

const readingPlanRepository = new ReadingPlanRepositoryPrisma(prisma)

const createReadinPlan = new CreateReadingPlan(readingPlanRepository)


test('Deve criar um plano de leitura', async function () {
    await createReadinPlan.execute({
        name: 'Meu plano',
        planOf: 'book',
        book: 'Mateus',
        readingGoalPerDay: 1,
        userId: '71baf668-206b-43e7-9349-c643330a12cb',
        endDate: new Date().toISOString()
    })
})