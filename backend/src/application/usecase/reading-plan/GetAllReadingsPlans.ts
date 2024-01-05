import { ReadingPlanViewModel } from '@/api/view-model/ReadingPlanViewModel'
import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'

export class GetAllReadingsPlan {
    private readonly readingPlanRepository: IReadingPlanRepository
    constructor(readingPlanRepository: IReadingPlanRepository) {
        this.readingPlanRepository = readingPlanRepository
    }

    async execute(userId: string): Promise<ReadingPlanViewModel[]> {
        const readingsPlans = await this.readingPlanRepository.getAll(userId)

        return ReadingPlanViewModel.mapCollection(readingsPlans)
    }
}