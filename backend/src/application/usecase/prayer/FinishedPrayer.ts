import { IPrayerRepository } from '@/application/repository/IPrayerRepository'
import { UpdateUserPoints } from '../user/UpdateUserPoints'

export class FinishedPrayer {
    private readonly prayerRepository: IPrayerRepository
    readonly updatePoints: UpdateUserPoints
    constructor(prayerRepository: IPrayerRepository, updatePoints: UpdateUserPoints) {
        this.prayerRepository = prayerRepository
        this.updatePoints = updatePoints
    }

    async execute(prayerId: string): Promise<void> {
        const prayer = await this.prayerRepository.getById(prayerId)
        prayer.finished()

        await this.prayerRepository.update(prayer)

    }
}