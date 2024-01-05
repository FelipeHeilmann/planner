import { DevotionalViewModel } from '@/api/view-model/DevotionalViewModel'
import { IDevotionalRepository } from '../../repository/IDevotionalRepository'

export class GetAllDevotional {
    private readonly devotionalRepository: IDevotionalRepository
    constructor(devotionalRepository: IDevotionalRepository) {
        this.devotionalRepository = devotionalRepository
    }

    async execute(userId: string): Promise<DevotionalViewModel[]> {
        const devotinals = await this.devotionalRepository.getAll(userId)

        return DevotionalViewModel.mapCollection(devotinals)
    }
}