import { ReadingPlan } from '@/domain/entities/ReadingPlan'

export class ReadingPlanViewModel {
    id?: string
    name?: string
    planOf?: string
    status?: string
    testament?: string | null
    readingGoalPerDay?: number
    endDate?: string | null

    static map(entity: ReadingPlan): ReadingPlanViewModel {
        const testamentId = entity.getTestamentId()
        let testament

        if (testamentId === 1) {
            testament = 'Antigo Testamento'
        } else if (testamentId === 2) {
            testament = 'Novo Testamento'
        } else {
            testament = null
        }
        return {
            id: entity.id,
            name: entity.getName(),
            planOf: entity.getPlanOf(),
            endDate: entity.getEndDate().toISOString(),
            status: entity.getStatus(),
            readingGoalPerDay: entity.getReadingGoalPerDay(),
            testament
        }

    }

    static mapCollection(entities: ReadingPlan[]): ReadingPlanViewModel[] {
        return entities.map(entity => ReadingPlanViewModel.map(entity))
    }
}