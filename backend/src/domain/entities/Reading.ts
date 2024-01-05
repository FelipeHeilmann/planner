import { v4 as uuidv4 } from 'uuid'
import { Book } from './Book'
import { ReadingPlan } from './ReadingPlan'
import { ReadingDoesNotFitOnReadingPlan } from '../exceptions/domain-errors'

export class Reading {
    readonly id: string
    private userId: string
    private books: Book[]
    private readingPlan: ReadingPlan | null
    private duration: number
    private userDate: Date
    private createdAt: Date
    private updatedAt: Date

    static create(duration: number, userId: string, books: Book[], userDate: Date, readingPlan: ReadingPlan | null) {
        if (readingPlan)
            if (readingPlan.getPlanOf() === 'book' && books[0].name !== readingPlan.getBook() || readingPlan.getTestamentId() !== null && readingPlan.getTestamentId() !== books[0].testamentId)
                throw new ReadingDoesNotFitOnReadingPlan('Plano de leitura não compatível com leitura')
        return new Reading(
            uuidv4(), books, duration, userId, userDate, readingPlan, new Date(), new Date()
        )
    }
    constructor(id: string, books: Book[], duration: number, userId: string, userDate: Date, readingPlan: ReadingPlan | null, createdAt: Date, updatedAt: Date) {
        this.books = books
        this.duration = duration
        this.userDate = userDate
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.userId = userId
        this.readingPlan = readingPlan
        this.id = id
    }

    getBooks(): Book[] {
        return this.books
    }
    getReadingPlan(): ReadingPlan | null {
        return this.readingPlan
    }
    getDuration(): number {
        return this.duration
    }
    getUserDate(): Date {
        return this.userDate
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getUpdatedAt(): Date {
        return this.updatedAt
    }
    getUserId(): string {
        return this.userId
    }

    /*eslint-disable*/
    addBook(book: any): void {
        this.books.push(book)
    }
    setReadingPlan(readingPlan: ReadingPlan | null): void {
        this.readingPlan = readingPlan
    }
    setDuration(duration: number): void {
        this.duration = duration
    }
    setUserDate(userDate: Date): void {
        this.userDate = userDate
    }
    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt
    }
    updateBooks(books: Book[]): void {
        this.books = books
    }

}