import { Prayer } from '@/domain/entities/Prayer'
import { IPrayerRepository } from '@/application/repository/IPrayerRepository'
import { UpdateUserPoints } from '../user/UpdateUserPoints'
import { StatusEnum } from '@/domain/enum/statusEnum'

export class CreatePrayer {
    private readonly prayerRepository: IPrayerRepository
    readonly updatePoints: UpdateUserPoints
    constructor(prayerRepository: IPrayerRepository, updatePoints: UpdateUserPoints) {
        this.prayerRepository = prayerRepository
        this.updatePoints = updatePoints
    }

    async execute(input: Input): Promise<{ prayer: Prayer, message: string | undefined }> {
        const prayer = Prayer.create(
            input.title,
            input.description,
            input.request,
            [],
            new Date(input.userDate),
            input.userId,
            StatusEnum.OnProgress
        )

        const existMessage = await this.updatePoints.execute(prayer.getUserId(), 1)

        let message
        existMessage === true ? message = 'Parabéns! Você subiu de nível' : undefined

        await this.prayerRepository.save(prayer)

        return { prayer, message }
    }
}

type Input = {
    title: string,
    description: string,
    request: string,
    userId: string,
    userDate: string
}