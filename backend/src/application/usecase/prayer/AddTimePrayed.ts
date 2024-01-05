import { IPrayerRepository } from '@/application/repository/IPrayerRepository'

export class AddTimePrayed {
    private readonly prayerRepository: IPrayerRepository
    constructor(prayerRepository: IPrayerRepository) {
        this.prayerRepository = prayerRepository
    }

    async execute(date: string, prayerId: string): Promise<void> {
        const prayer = await this.prayerRepository.getById(prayerId)
        prayer.pray(new Date(date))

        await this.prayerRepository.update(prayer)
    }
}