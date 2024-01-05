import { ReadingViewModel } from '@/api/view-model/ReadingViewModel'
import { IReadingRepository } from '@/application/repository/IReadingRepository'

export class GetReadingsOfReadingPlan {
    private readonly readingRepository: IReadingRepository
    constructor(readingRepository: IReadingRepository) {
        this.readingRepository = readingRepository
    }

    async execute(readingPlanId: string): Promise<ReadingViewModel[]> {
        const readings = await this.readingRepository.getByPlan(readingPlanId)

        return ReadingViewModel.mapCollection(readings)
    }
}