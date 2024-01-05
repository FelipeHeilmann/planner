import { ReadingPlan } from '@/domain/entities/ReadingPlan'
import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'
import { StatusEnum } from '@/domain/enum/statusEnum'

export class CreateReadingPlan {
    private readonly readingPlanRepository: IReadingPlanRepository
    constructor(readingPlanRepository: IReadingPlanRepository) {
        this.readingPlanRepository = readingPlanRepository
    }

    async execute(input: Input): Promise<ReadingPlan> {
        const readingPlan = ReadingPlan.create(
            input.name,
            input.planOf,
            input.book,
            StatusEnum.OnProgress,
            input.userId,
            input.readingGoalPerDay,
            new Date(input.endDate),
            input.testamentId
        )

        await this.readingPlanRepository.save(readingPlan)

        return readingPlan
    }
}

type Input = {
    name: string
    planOf: string
    userId: string
    readingGoalPerDay: number
    endDate: string
    testamentId: number | null
    book: string | null
} 