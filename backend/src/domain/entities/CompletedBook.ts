export class CompletedBook {
    private book: string
    private completed: number
    private startedAt: Date[]
    private finishedAt: Date[]

    constructor(book: string, completed: number, finishedAt: Date[], startedAt: Date[]) {
        this.book = book
        this.completed = completed
        this.finishedAt = finishedAt
        this.startedAt = startedAt
    }

    getBook(): string {
        return this.book
    }
    getCompleted(): number {
        return this.completed
    }
    getFinishedAt(): Date[] {
        return this.finishedAt
    }
    getStartedAt(): Date[] {
        return this.startedAt
    }

    setBook(book: string): void {
        this.book = book
    }
    setCompleted(completed: number): void {
        this.completed = completed
    }
    setFinishedAt(finishedAt: Date[]) {
        this.finishedAt = finishedAt
    }
    setStartedAt(startedAt: Date[]) {
        this.startedAt = startedAt
    }
}