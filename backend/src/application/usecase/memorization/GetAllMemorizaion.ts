import { MemorizationViewModel } from '@/api/view-model/MemorizationsViewModel'
import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'

export class GetAllMemorizations {
    private readonly memorizationRepository: IMemorizationRepository
    constructor(memorizationRepository: IMemorizationRepository) {
        this.memorizationRepository = memorizationRepository
    }

    async execute(userId: string): Promise<MemorizationViewModel[]> {
        const memorizations = await this.memorizationRepository.getAll(userId)

        return MemorizationViewModel.mapCollection(memorizations)
    }
}