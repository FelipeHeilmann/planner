import { v4 as uuidv4 } from 'uuid'
import { Book } from './Book'

export class Devotional {
    readonly id: string
    private book: Book
    private subject: string
    private learned: string
    private application: string
    private verses: number[]
    private userId: string
    private userDate: Date
    private createdAt: Date
    private updatedAt: Date

    static create(subject: string, learned: string, application: string, verses: number[], userId: string, userDate: Date, book: Book) {
        return new Devotional(
            uuidv4(), book, subject, learned, application, verses, userId, userDate, new Date(), new Date()
        )
    }

    constructor(id: string, book: Book, subject: string, learned: string, application: string, verses: number[], userId: string, userDate: Date, createdAt: Date, updatedAt: Date) {
        this.id = id
        this.book = book
        this.subject = subject
        this.learned = learned
        this.application = application
        this.verses = verses
        this.userId = userId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.userDate = userDate
    }

    getBook(): Book {
        return this.book
    }
    getSubject(): string {
        return this.subject
    }
    getLearned(): string {
        return this.learned
    }
    getApplication(): string {
        return this.application
    }
    getVerses(): number[] {
        return this.verses
    }
    getUserId(): string {
        return this.userId
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


    setBook(book: Book): void {
        this.book = book
    }
    setSubject(subject: string): void {
        this.subject = subject
    }
    setApplication(application: string): void {
        this.application = application
    }
    setLearned(learned: string): void {
        this.learned = learned
    }
    setVerses(verses: number[]): void {
        this.verses = verses
    }
    setUserDate(date: Date): void {
        this.userDate = date
    }
    setUpdatedAt(date: Date): void {
        this.updatedAt = date
    }


}