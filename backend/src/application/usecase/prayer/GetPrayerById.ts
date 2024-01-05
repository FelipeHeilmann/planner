import { PrayerViewModel } from '@/api/view-model/PrayerViewModel'
import { IPrayerRepository } from '@/application/repository/IPrayerRepository'

export class GetPrayerById {
    private readonly prayerRepository: IPrayerRepository
    constructor(prayerRepository: IPrayerRepository) {
        this.prayerRepository = prayerRepository
    }

    async execute(id: string): Promise<PrayerViewModel> {
        const prayer = await this.prayerRepository.getById(id)

        return PrayerViewModel.map(prayer)
    }
}