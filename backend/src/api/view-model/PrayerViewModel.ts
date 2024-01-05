import { Prayer } from '@/domain/entities/Prayer'

export class PrayerViewModel {
    id?: string
    title?: string
    description?: string
    request?: string
    timesPrayed?: string[]
    status?: string
    date?: string

    static map(entity: Prayer): PrayerViewModel {
        return {
            id: entity.id,
            request: entity.getRequest(),
            description: entity.getDescription(),
            status: entity.getStatus(),
            timesPrayed: entity.getTimesPrayed().map(date => date.toISOString()),
            title: entity.getTitle(),
            date: entity.getUserDate().toISOString()
        }
    }

    static mapCollection(entities: Prayer[]): PrayerViewModel[] {
        return entities.map(entity => PrayerViewModel.map(entity))
    }
}