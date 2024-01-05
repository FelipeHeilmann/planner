import { v4 as uuidv4 } from 'uuid'
import { CompletedBook } from './CompletedBook'
import { OriginEnum } from '../enum/originEnum'

export class User {
    readonly id: string
    private name: string
    private email: string
    private password: string
    private createdAt: Date
    private updatedAt: Date
    private isActive: boolean
    private theme: string
    private birthDate: Date | null
    private gender: string | null
    private completedBible: number
    private pagarmeId: string | null
    private points: number
    private levelId: number
    private completedBook: CompletedBook[]
    private disableAt: Date | null
    private lastLoginAt: Date | null
    private isAdmin: boolean
    private isAffiliate: boolean
    private accessDuration: number
    private imageUrl: string | null
    private origin: OriginEnum | null

    static create(name: string, email: string, password: string, accessDuration: number, isActive: boolean, isAdmin: boolean, pagarmeId: string | null, isAffiliate: boolean, origin: OriginEnum | null) {
        return new User(
            uuidv4(), name, email, password, 1, new Date(), new Date(), 0, 0, accessDuration, isActive, isAdmin, null, null, null, null, pagarmeId, null, [], 'Blue', isAffiliate, origin
        )
    }

    constructor(
        id: string,
        name: string,
        email: string,
        password: string,
        levelId: number,
        createdAt: Date,
        updatedAt: Date,
        points: number,
        completedBible: number,
        accessDuration: number,
        isActive: boolean,
        isAdmin: boolean,
        birthDate: Date | null,
        gender: string | null,
        disableAt: Date | null,
        lastLoginAt: Date | null,
        pagarmeId: string | null,
        imageUrl: string | null,
        completedBook: CompletedBook[],
        theme: string,
        isAffiliate: boolean,
        origin: OriginEnum | null
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.levelId = levelId
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.points = points
        this.completedBible = completedBible
        this.imageUrl = imageUrl
        this.accessDuration = accessDuration
        this.isActive = isActive
        this.isAdmin = isAdmin
        this.gender = gender
        this.birthDate = birthDate
        this.disableAt = disableAt
        this.lastLoginAt = lastLoginAt
        this.pagarmeId = pagarmeId
        this.completedBook = completedBook
        this.theme = theme
        this.isAffiliate = isAffiliate
        this.origin = origin
    }

    incrementPoints(point: number): void {
        this.points = this.points + point
        this.updatedAt = new Date()
    }
    completeBible(): void {
        this.completedBible = this.completedBible + 1
        this.updatedAt = new Date()
    }
    completeBook(book: string, completed: number, finishedAt: Date[], startedAt: Date[]): void {
        const completedBook = new CompletedBook(book, completed, finishedAt, startedAt)
        this.completedBook.push(completedBook)
    }
    updateCompletedBook(book: string, completed: number, finishedAt: Date[], startedAt: Date[]): void {
        const existsCompletedBook = this.completedBook.findIndex(item => item.getBook() === book)

        if (existsCompletedBook !== -1) {
            this.completedBook[existsCompletedBook] = new CompletedBook(book, completed, finishedAt, startedAt)
        }
        this.updatedAt = new Date()

    }
    nextLevel(id: number): void {
        this.levelId = id
        this.updatedAt = new Date()

    }
    disable(): void {
        this.isActive = false
        this.disableAt = new Date()
        this.updatedAt = new Date()
    }
    enable(): void {
        this.isActive = true
        this.updatedAt = new Date()
    }
    toggleTheme(): void {
        this.theme === 'Blue' ? this.theme = 'Pink' : this.theme = 'Blue'
    }
    makeAffiliate(): void {
        this.isAffiliate = true
        this.updatedAt = new Date()
    }
    unmakeAffiliate(): void {
        this.isAffiliate = false
        this.updatedAt = new Date()
    }

    getName(): string {
        return this.name
    }
    getEmail(): string {
        return this.email
    }
    getPassword(): string {
        return this.password
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getUpdatedAt(): Date {
        return this.updatedAt
    }
    getCompletedBible(): number {
        return this.completedBible
    }
    getPoints(): number {
        return this.points
    }
    getLevelId(): number {
        return this.levelId
    }
    getImageUrl(): string | null {
        return this.imageUrl
    }
    getAccesDuration(): number {
        return this.accessDuration
    }
    getIsActive(): boolean {
        return this.isActive
    }
    getIsAdmin(): boolean {
        return this.isAdmin
    }
    getGender(): string | null {
        return this.gender
    }
    getBirthDate(): Date | null {
        return this.birthDate
    }
    getLastLoginAt(): Date | null {
        return this.lastLoginAt
    }
    getDisabledAt(): Date | null {
        return this.disableAt
    }
    getPagarmeId(): string | null {
        return this.pagarmeId
    }
    getCompletedBook(): CompletedBook[] {
        return this.completedBook
    }
    getTheme(): string {
        return this.theme
    }
    getIsAffiliate(): boolean {
        return this.isAffiliate
    }
    getOrigin(): OriginEnum | null {
        return this.origin
    }

    setName(name: string): void {
        this.name = name
    }
    setEmail(email: string): void {
        this.email = email
    }
    setPassword(password: string): void {
        this.password = password
    }
    setCreatedAt(createdAt: Date): void {
        this.createdAt = createdAt
    }
    setUpdatedAt(updatedAt: Date): void {
        this.updatedAt = updatedAt
    }
    setCompletedBible(completedBible: number): void {
        this.completedBible = completedBible
    }
    setPoints(points: number): void {
        this.points = points
    }
    setLevelId(levelId: number): void {
        this.levelId = levelId
    }
    setImageUrl(imageUrl: string | null): void {
        this.imageUrl = imageUrl
    }
    setGender(gender: string): void {
        this.gender = gender
    }
    setBirthDate(birthDate: Date): void {
        this.birthDate = birthDate
    }
    setLastLoginAt(date: Date): void {
        this.lastLoginAt = date
    }
    setPagarmeId(pagarmeId: string): void {
        this.pagarmeId = pagarmeId
    }
    setCompletedBook(completedBook: CompletedBook[]): void {
        this.completedBook = completedBook
    }
}