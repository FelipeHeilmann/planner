import { Memorization } from '@/domain/entities/Memorization'
import { BookViewModel } from './BookViewModel'

export class MemorizationViewModel {
    id?: string
    timesMemorized?: string[]
    book?: BookViewModel
    verse?: number
    description?: string | null
    status?: string

    static map(entity: Memorization): MemorizationViewModel {
        return {
            id: entity.id,
            book: BookViewModel.map(entity.getBook()),
            description: entity.getDescription(),
            status: entity.getStatus(),
            timesMemorized: entity.getTimesMemorized().map(date => date.toISOString()),
            verse: entity.getVerse()
        }
    }

    static mapCollection(entities: Memorization[]): MemorizationViewModel[] {
        return entities.map(entity => MemorizationViewModel.map(entity))
    }
}