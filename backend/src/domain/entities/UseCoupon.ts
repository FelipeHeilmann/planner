export class UseCoupon {
    public readonly userId: string
    public readonly status: string
    public readonly total: number
    public readonly date: Date | null
    public userName: string | null = null
    public userEmail: string | null = null

    constructor(userId: string, status: string, total: number, date: Date | null) {
        this.userId = userId
        this.status = status
        this.total = total
        this.date = date
    }
}