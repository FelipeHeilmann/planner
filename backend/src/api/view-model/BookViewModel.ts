import { Book } from '@/domain/entities/Book'

export class BookViewModel {
    id?: number
    name?: string
    chapter?: number
    verses?: number
    words?: number
    testament?: string

    static map(entity: Book): BookViewModel {
        return {
            id: entity.id,
            name: entity.name,
            chapter: entity.chapter,
            testament: entity.testamentId === 1 ? 'Antigo Testamento' : 'Novo Testamento',
            verses: entity.verses,
            words: entity.words,
        }
    }

    static mapCollection(entities: Book[]): BookViewModel[] {
        return entities.map(entity => BookViewModel.map(entity))
    }
}