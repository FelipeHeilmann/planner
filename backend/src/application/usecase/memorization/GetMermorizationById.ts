import { MemorizationViewModel } from '@/api/view-model/MemorizationsViewModel'
import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'

export class GetMemorizationById {
    private readonly memorizationRepository: IMemorizationRepository
    constructor(memorizationRepository: IMemorizationRepository) {
        this.memorizationRepository = memorizationRepository
    }

    async execute(id: string): Promise<MemorizationViewModel> {
        const memorization = await this.memorizationRepository.getById(id)

        return MemorizationViewModel.map(memorization)
    }

}