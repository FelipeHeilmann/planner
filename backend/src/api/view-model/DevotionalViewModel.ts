import { Devotional } from '@/domain/entities/Devotional'
import { BookViewModel } from './BookViewModel'

export class DevotionalViewModel {
    id?: string
    book?: BookViewModel
    subject?: string
    learned?: string
    application?: string
    verses?: number[]
    date?: string

    static map(entity: Devotional): DevotionalViewModel {
        return {
            id: entity.id,
            book: BookViewModel.map(entity.getBook()),
            application: entity.getApplication(),
            learned: entity.getLearned(),
            date: entity.getUserDate().toISOString(),
            subject: entity.getSubject(),
            verses: entity.getVerses()
        }
    }

    static mapCollection(entities: Devotional[]): DevotionalViewModel[] {
        return entities.map(entity => DevotionalViewModel.map(entity))
    }
}