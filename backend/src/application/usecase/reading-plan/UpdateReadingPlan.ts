import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'

export class UpdateReadingPlan {
    private readonly readingPlanRepository: IReadingPlanRepository
    constructor(readingPlanRepository: IReadingPlanRepository) {
        this.readingPlanRepository = readingPlanRepository
    }

    async execute(input: Input): Promise<void> {
        const readingPlan = await this.readingPlanRepository.getById(input.id)

        readingPlan.setBook(input.book)
        readingPlan.setPlanOf(input.planOf)
        readingPlan.setReadingGoalPerDay(input.readingGoalPerDay)
        readingPlan.setEndDate(new Date(input.endDate))
        readingPlan.setTestamentId(input.testamentId)
        readingPlan.setUpdatedAt(new Date())

        await this.readingPlanRepository.update(readingPlan)
    }
}

type Input = {
    id: string
    name: string
    planOf: string
    readingGoalPerDay: number
    endDate: string
    testamentId: number | null
    book: string | null
}