import { v4 as uuidv4 } from 'uuid'
import { StatusEnum } from '../enum/statusEnum'
import { InvalidPlanOf } from '../exceptions/domain-errors'

export class ReadingPlan {
    public readonly id: string
    private name: string
    private planOf: string
    private status: StatusEnum
    private book: string | null
    private userId: string
    private testamentId?: number | null
    private readingGoalPerDay: number
    private createdAt: Date
    private endDate: Date
    private updatedAt: Date

    static create(name: string, planOf: string, book: string | null, status: StatusEnum, userId: string, readingGoalPerDay: number, endDate: Date, testamentId: number | null) {
        if (!(planOf === 'testament' || planOf === 'book' || planOf === 'bible'))
            throw new InvalidPlanOf('Tipo do plano de leituira inválido')
        return new ReadingPlan(
            uuidv4(),
            name,
            planOf,
            book,
            status,
            userId,
            readingGoalPerDay,
            new Date(),
            new Date(),
            new Date(endDate),
            testamentId
        )
    }

    constructor(id: string, name: string, planOf: string, book: string | null, status: StatusEnum, userId: string, readingGoalPerDay: number, createdAt: Date, updatedAt: Date, endDate: Date, testamentId: number | null) {
        this.id = id
        this.name = name
        this.planOf = planOf
        this.status = status
        this.userId = userId
        this.readingGoalPerDay = readingGoalPerDay
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.testamentId = testamentId
        this.endDate = endDate
        this.book = book
    }

    finished() {
        this.status = StatusEnum.Finished
        this.updatedAt = new Date()
    }
    increaseGoal() {
        this.readingGoalPerDay = this.readingGoalPerDay + 1
        this.updatedAt = new Date()
    }
    decreaseGoal() {
        this.readingGoalPerDay = this.readingGoalPerDay - 1
        this.updatedAt = new Date()
    }

    getName(): string {
        return this.name
    }
    getPlanOf(): string {
        return this.planOf
    }
    getStatus(): string {
        return this.status
    }
    getBook(): string | null {
        return this.book
    }
    getUserId(): string {
        return this.userId
    }
    getTestamentId(): number | null | undefined {
        return this.testamentId
    }
    getReadingGoalPerDay(): number {
        return this.readingGoalPerDay
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getEndDate(): Date {
        return this.endDate
    }
    getUpdatedAt(): Date {
        return this.updatedAt
    }

    setName(name: string): void {
        this.name = name
    }
    setPlanOf(planOf: string): void {
        this.planOf = planOf
    }
    setBook(book: string | null): void {
        this.book = book
    }
    setTestamentId(testamentId: number | null | undefined): void {
        this.testamentId = testamentId
    }
    setReadingGoalPerDay(readingGoalPerDay: number): void {
        this.readingGoalPerDay = readingGoalPerDay
    }
    setEndDate(endDate: Date): void {
        this.endDate = endDate
    }
    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt
    }
}