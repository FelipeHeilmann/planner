import { PrayerViewModel } from '@/api/view-model/PrayerViewModel'
import { IPrayerRepository } from '@/application/repository/IPrayerRepository'

export class GetAllPrayers {
    private readonly prayerRepository: IPrayerRepository
    constructor(prayerRepository: IPrayerRepository) {
        this.prayerRepository = prayerRepository
    }

    async execute(userId: string): Promise<PrayerViewModel[]> {
        const prayers = await this.prayerRepository.getAll(userId)

        return PrayerViewModel.mapCollection(prayers)
    }
}