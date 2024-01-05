import { DevotionalViewModel } from '@/api/view-model/DevotionalViewModel'
import { IDevotionalRepository } from '../../repository/IDevotionalRepository'

export class GetDevotionalById {
    private readonly devotionalRepository: IDevotionalRepository
    constructor(devotionalRepository: IDevotionalRepository) {
        this.devotionalRepository = devotionalRepository
    }

    async execute(id: string): Promise<DevotionalViewModel> {
        const devotional = await this.devotionalRepository.getById(id)

        return DevotionalViewModel.map(devotional)
    }
}