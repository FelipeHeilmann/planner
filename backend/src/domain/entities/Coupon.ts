import { v4 as uuidv4 } from 'uuid'
import { UseCoupon } from './UseCoupon'

export class Coupon {
    readonly id: string
    private name: string
    private value: number
    private isValid: boolean
    private use: number
    private usesCoupon: UseCoupon[]
    private createdAt: Date
    private dueAt: Date | null
    private affiliateId: string | null
    private affiliateName: string | null = null
    private percentageToAffiliate: number | null

    constructor(id: string, name: string, value: number, isValid: boolean, use: number, usesCoupon: UseCoupon[], createdAt: Date, dueAt: Date | null, affiliateId: string | null, percentageToAffiliate: number | null) {
        this.id = id
        this.name = name
        this.value = value
        this.usesCoupon = usesCoupon
        this.isValid = isValid
        this.use = use
        this.createdAt = createdAt
        this.dueAt = dueAt
        this.affiliateId = affiliateId
        this.percentageToAffiliate = percentageToAffiliate
    }

    static create(name: string, value: number, isValid: boolean, use: number, createdAt: Date, dueAt: Date | null, affiliateId: string | null, percentageToAffiliate: number | null) {
        return new Coupon(uuidv4(), name, value, isValid, use, [], createdAt, dueAt, affiliateId, percentageToAffiliate)
    }

    used(userCoupon: UseCoupon): void {
        this.usesCoupon.push(userCoupon)
        this.use = this.usesCoupon.length
    }

    getName(): string {
        return this.name
    }
    getValue(): number {
        return this.value
    }
    getIsValid(): boolean {
        return this.isValid
    }
    getUse(): number {
        return this.use
    }
    getUsesCoupon(): UseCoupon[] {
        return this.usesCoupon
    }
    getCreatedAt(): Date {
        return this.createdAt
    }
    getDueAt(): Date | null {
        return this.dueAt
    }
    getAffiliateId(): string | null {
        return this.affiliateId
    }
    getAffiliateName(): string | null {
        return this.affiliateName
    }
    getPercentageToAffiliate(): number | null {
        return this.percentageToAffiliate
    }

    setName(name: string): void {
        this.name = name
    }
    setValue(value: number): void {
        this.value = value
    }
    setIsValid(isValid: boolean): void {
        this.isValid = isValid
    }
    setUse(use: number): void {
        this.use = use
    }
    setUsesCoupon(useCoupon: UseCoupon[]): void {
        this.usesCoupon = useCoupon
    }
    setDueAt(date: Date): void {
        this.dueAt = date
    }
    setAffiliateName(name: string | null): void {
        this.affiliateName = name
    }
}