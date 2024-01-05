import { NotFoundError } from '@/api/helpers/api-error'
import { IPrayerRepository } from '@/application/repository/IPrayerRepository'

export class DeletePrayer {
    private readonly prayerRepository: IPrayerRepository
    constructor(prayerRepository: IPrayerRepository) {
        this.prayerRepository = prayerRepository
    }

    async execute(id: string): Promise<void> {
        const prayer = await this.prayerRepository.getById(id)

        if (prayer === null) {
            throw new NotFoundError('Oração não encontrada')
        }

        await this.prayerRepository.delete(id)
    }
}