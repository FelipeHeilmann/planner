import { randomUUID } from "crypto"
export class User {
    readonly id: string
    private name: string
    private email: string
    private applicationUserId: string
    private acessDuration: number
    private createdAt: Date
    private endDate: Date
    private isActive: boolean

    static create(
        name: string,
        email: string,
        applicationUserId: string,
        acessDuration: number,
        createdAt: Date,
        endDate: Date,
        isActive: boolean,
    ) {
        return new User(
            randomUUID(),
            name,
            email,
            applicationUserId,
            acessDuration,
            createdAt,
            endDate,
            isActive,
        )
    }
    constructor(
        id: string,
        name: string,
        email: string,
        applicationUserId: string,
        acessDuration: number,
        createdAt: Date,
        endDate: Date,
        isActive: boolean,
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.applicationUserId = applicationUserId
        this.acessDuration = acessDuration
        this.createdAt = createdAt
        this.endDate = endDate
        this.isActive = isActive
    }

    disable(): void {
        this.isActive = false
    }

    getName(): string {
        return this.name
    }
    getEmail(): string {
        return this.email
    }
    getApplicationUserId(): string {
        return this.applicationUserId
    }
    getAcessDuration(): number {
        return this.acessDuration
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getEndDate(): Date {
        return this.endDate
    }
    getIsActive(): boolean {
        return this.isActive
    }
}