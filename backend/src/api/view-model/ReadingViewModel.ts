import { Reading } from '@/domain/entities/Reading'
import { BookViewModel } from './BookViewModel'
import { ReadingPlanViewModel } from './ReadingPlanViewModel'

export class ReadingViewModel {
    id?: string
    books?: BookViewModel[]
    readingPlan?: ReadingPlanViewModel | null
    duration?: number
    date?: string

    static map(entity: Reading): ReadingViewModel {
        return {
            id: entity.id,
            books: BookViewModel.mapCollection(entity.getBooks()),
            readingPlan: entity.getReadingPlan() !== null ? ReadingPlanViewModel.map(entity.getReadingPlan()!) : null,
            duration: entity.getDuration(),
            date: entity.getUserDate().toISOString()
        }
    }

    static mapCollection(entities: Reading[]): ReadingViewModel[] {
        return entities.map(entity => ReadingViewModel.map(entity))
    }
}