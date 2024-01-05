import { NotFoundError } from '@/api/helpers/api-error'
import { IDevotionalRepository } from '@/application/repository/IDevotionalRepository'

export class DeleteDevotional {
    private readonly devotionalRepository: IDevotionalRepository
    constructor(devotionalRepository: IDevotionalRepository) {
        this.devotionalRepository = devotionalRepository
    }

    async execute(id: string): Promise<void> {
        const devotional = await this.devotionalRepository.getById(id)

        if (devotional === null) {
            throw new NotFoundError('Devocional não encontrada')
        }

        await this.devotionalRepository.delete(id)
    }
}