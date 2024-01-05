import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'

export class DecreaseGoalPerDay {
    private readonly readingPlanRepository: IReadingPlanRepository
    constructor(readingPlanRepository: IReadingPlanRepository) {
        this.readingPlanRepository = readingPlanRepository
    }

    async execute(readingPlanId: string): Promise<void> {
        const readingPlan = await this.readingPlanRepository.getById(readingPlanId)
        readingPlan.decreaseGoal()

        await this.readingPlanRepository.update(readingPlan)
    }
}