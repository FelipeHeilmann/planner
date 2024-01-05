import { Reading } from '@/domain/entities/Reading'
import { ReadingPlan } from '@/domain/entities/ReadingPlan'
import { StatusEnum } from '@/domain/enum/statusEnum'
import { ReadingPlan as PrismaReadingPlan } from '@prisma/client'

export class ReadingMapper {
    static map(input: Input): Reading {
        const readingPlan = input.readingPlan ? this.mapReadingPlan(input.readingPlan) : null

        return new Reading(
            input.id,
            [],
            input.duration,
            input.userId,
            input.userDate,
            readingPlan,
            input.createdAt,
            input.updatedAt,
        )
    }

    static mapCollection(input: Input[]): Reading[] {
        return input.map(reading => {
            const readingPlan = reading.readingPlan ? this.mapReadingPlan(reading.readingPlan) : null

            return new Reading(
                reading.id,
                [],
                reading.duration,
                reading.userId,
                reading.userDate,
                readingPlan,
                reading.createdAt,
                reading.updatedAt,
            )
        })
    }

    private static mapReadingPlan(readingPlanData: PrismaReadingPlan): ReadingPlan {
        return new ReadingPlan(
            readingPlanData.id,
            readingPlanData.name,
            readingPlanData.planOf,
            readingPlanData.book,
            readingPlanData.status === 'Em andamento' ? StatusEnum.OnProgress : StatusEnum.Finished,
            readingPlanData.userId,
            readingPlanData.readingGoalPerDay,
            readingPlanData.createdAt,
            readingPlanData.updatedAt,
            readingPlanData.endDate,
            readingPlanData.testamentId || null
        )
    }
}

type Input = {
    id: string
    duration: number
    userId: string
    userDate: Date
    createdAt: Date
    updatedAt: Date
    readingPlan: PrismaReadingPlan | null
}
