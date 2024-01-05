import { IPrayerRepository } from '@/application/repository/IPrayerRepository'

export class UpdatePrayer {
    private readonly prayerRepository: IPrayerRepository
    constructor(prayerRepository: IPrayerRepository,) {
        this.prayerRepository = prayerRepository
    }

    async execute(input: Input): Promise<void> {
        const prayer = await this.prayerRepository.getById(input.id)

        prayer.setTitle(input.title)
        prayer.setDescription(input.description)
        prayer.setRequest(input.request)
        prayer.setUserDate(new Date(input.userDate))
        prayer.setUpdatedAt(new Date())
        await this.prayerRepository.update(prayer)
    }
}

type Input = {
    id: string
    title: string,
    description: string,
    request: string,
    userDate: string,
}