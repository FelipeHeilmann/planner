import { v4 as uuidv4 } from 'uuid'
import { Book } from './Book'
import { StatusEnum } from '../enum/statusEnum'

export class Memorization {
    readonly id: string
    private book: Book
    private timesMemorized: Date[] = []
    private userId: string
    private verse: number
    private description: string | null
    private status: StatusEnum
    private isFinished: boolean
    private createdAt: Date
    private updatedAt: Date

    static create(book: Book, timesMemorized: Date[], userId: string, status: StatusEnum, verse: number, description: string | null) {
        return new Memorization(
            uuidv4(), book, timesMemorized, userId, status, verse, new Date(), new Date(), false, description
        )
    }

    constructor(id: string, book: Book, timesMemorized: Date[], userId: string, status: StatusEnum, verse: number, createdAt: Date, updatedAt: Date, isFinished: boolean, description: string | null) {
        this.book = book
        this.timesMemorized = timesMemorized
        this.status = status
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.verse = verse
        this.userId = userId
        this.id = id
        this.isFinished = isFinished
        this.description = description
    }

    finished() {
        this.status = StatusEnum.Finished
        this.updatedAt = new Date()
        this.isFinished = true
    }
    memorize(date: Date) {
        this.timesMemorized.push(date)
        this.updatedAt = new Date()
    }

    getBook(): Book {
        return this.book
    }
    getTimesMemorized(): Date[] {
        return this.timesMemorized
    }
    getUserId(): string {
        return this.userId
    }
    getVerse(): number {
        return this.verse
    }
    getDescription(): string | null {
        return this.description
    }
    getStatus(): string {
        return this.status
    }
    getIsFinished(): boolean {
        return this.isFinished
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getUpdatedAt(): Date {
        return this.updatedAt
    }

    setBook(book: Book): void {
        this.book = book
    }
    setVerse(verse: number): void {
        this.verse = verse
    }
    setDescription(description: string | null): void {
        this.description = description
    }
    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt
    }
}