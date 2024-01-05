import { v4 as uuidv4 } from 'uuid'
import { StatusEnum } from '../enum/statusEnum'

export class Prayer {
    readonly id: string
    private title: string
    private description: string
    private request: string
    private timesPrayed: Date[] = []
    private status: StatusEnum
    private userId: string
    private isFinished: boolean
    private createdAt: Date
    private userDate: Date
    private updatedAt: Date


    static create(title: string, description: string, request: string, datePrayed: Date[], userDate: Date, userId: string, status: StatusEnum) {
        return new Prayer(
            uuidv4(), title, description, request, datePrayed, userDate, userId, status, new Date(), new Date(), false
        )
    }
    constructor(id: string, title: string, description: string, request: string, datePrayed: Date[], userDate: Date, userId: string, status: StatusEnum, createdAt: Date, updatedAt: Date, isFinished: boolean) {
        this.id = id
        this.title = title
        this.description = description
        this.request = request
        this.timesPrayed = datePrayed
        this.userDate = userDate
        this.userId = userId
        this.status = status
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.isFinished = isFinished
    }

    finished() {
        this.status = StatusEnum.Finished
        this.updatedAt = new Date()
        this.isFinished = true
    }
    pray(date: Date) {
        this.timesPrayed.push(date)
        this.updatedAt = new Date()
    }

    getTitle(): string {
        return this.title
    }
    getDescription(): string {
        return this.description
    }
    getRequest(): string {
        return this.request
    }
    getTimesPrayed(): Date[] {
        return this.timesPrayed
    }
    getStatus(): string {
        return this.status
    }
    getUserId(): string {
        return this.userId
    }
    getIsFinished(): boolean {
        return this.isFinished
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getUserDate(): Date {
        return this.userDate
    }
    getUpdatedAt(): Date {
        return this.updatedAt
    }

    setTitle(title: string): void {
        this.title = title
    }
    setDescription(description: string): void {
        this.description = description
    }
    setRequest(request: string): void {
        this.request = request
    }
    setUserId(userId: string): void {
        this.userId = userId
    }
    setUserDate(userDate: Date): void {
        this.userDate = userDate
    }
    setUpdatedAt(date: Date): void {
        this.updatedAt = date
    }

}