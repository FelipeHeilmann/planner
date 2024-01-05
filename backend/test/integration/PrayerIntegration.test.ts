import { LevelRepositoryPrisma } from '@/infra/persistence/repository/prisma/LevelRepositoryPrisma'
import { PrayerRepositoryPrisma } from '@/infra/persistence/repository/prisma/PrayerRepositoryPrisma'
import { UserRepositoryPrisma } from '@/infra/persistence/repository/prisma/UserRepositoryPrisma'
import { AddTimePrayed } from '@/application/usecase/prayer/AddTimePrayed'
import { CreatePrayer } from '@/application/usecase/prayer/CreatePrayer'
import { FinishedPrayer } from '@/application/usecase/prayer/FinishedPrayer'
import { CheckLevel } from '@/application/usecase/user/CheckLevel'
import { UpdateUserPoints } from '@/application/usecase/user/UpdateUserPoints'
import { prisma } from '@/infra/database'
import { GetPrayerById } from '@/application/usecase/prayer/GetPrayerById'

const prayerRepository = new PrayerRepositoryPrisma(prisma)
const userRepository = new UserRepositoryPrisma(prisma)
const levelRepository = new LevelRepositoryPrisma(prisma)

const checkLevel = new CheckLevel(levelRepository, userRepository)
const updatePoints = new UpdateUserPoints(userRepository, checkLevel)
const addTimePrayed = new AddTimePrayed(prayerRepository)
const finishedPrayer = new FinishedPrayer(prayerRepository, updatePoints)
const createPrayer = new CreatePrayer(prayerRepository, updatePoints)
const getPrayerById = new GetPrayerById(prayerRepository)


test('Deve criar uma oração e adicionar um ponto para o usuário', async function () {
    const user = await userRepository.getById('71baf668-206b-43e7-9349-c643330a12cb')

    const newPrayer = await createPrayer.execute({
        description: 'Oração do DDD',
        request: 'Que meu teste funcione',
        timesPrayed: [],
        title: 'DDD',
        userDate: new Date().toISOString(),
        userId: user.id!
    })

    const prayerId = newPrayer.prayer.id

    expect(newPrayer.prayer.getTimesPrayed().length).toBe(0)

    await addTimePrayed.execute(new Date().toISOString(), newPrayer.prayer.id)
    await addTimePrayed.execute(new Date().toISOString(), newPrayer.prayer.id)

    await finishedPrayer.execute(prayerId)

    const prayer = await getPrayerById.execute(prayerId)

    expect(prayer.timesPrayed!.length).toBe(2)
})