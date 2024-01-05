import { ReadingPlan } from '@/domain/entities/ReadingPlan'
import { StatusEnum } from '@/domain/enum/statusEnum'

export class ReadingPlanMapper {
    static map(input: readingPlanDBOutput) {
        return new ReadingPlan(
            input.id,
            input.name,
            input.planOf,
            input.book,
            input.status === 'Em andamento' ? StatusEnum.OnProgress : StatusEnum.Finished,
            input.userId,
            input.readingGoalPerDay,
            input.createdAt,
            input.updatedAt,
            input.endDate,
            input.testamentId
        )
    }

    static mapCollection(input: readingPlanDBOutput[]) {
        const readingPlans: ReadingPlan[] = []

        input.map(item => readingPlans.push(ReadingPlanMapper.map(item)))

        return readingPlans
    }
}

type readingPlanDBOutput = {
    id: string
    planOf: string
    name: string
    book: string | null
    status: string
    userId: string
    readingGoalPerDay: number
    testamentId: number | null
    endDate: Date
    createdAt: Date
    updatedAt: Date
}
