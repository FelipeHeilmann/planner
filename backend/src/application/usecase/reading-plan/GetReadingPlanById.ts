import { ReadingPlanViewModel } from '@/api/view-model/ReadingPlanViewModel'
import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'

export class GetReadingPlanById {
    private readonly readingPlanRepository: IReadingPlanRepository
    constructor(readingPlanRepository: IReadingPlanRepository) {
        this.readingPlanRepository = readingPlanRepository
    }

    async execute(id: string): Promise<ReadingPlanViewModel> {
        const readingPlan = await this.readingPlanRepository.getById(id)

        return ReadingPlanViewModel.map(readingPlan)
    }
}