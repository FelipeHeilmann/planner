import { v4 as uuidv4 } from 'uuid'
import { PaymentValueExceedsAvaliable } from '../exceptions/domain-errors'

export class AffiliatePayment {
    readonly id: string
    public date: Date
    public value: number
    public couponId: string


    constructor(id: string, date: Date, value: number, couponId: string) {
        this.id = id
        this.date = date
        this.value = value
        this.couponId = couponId
    }

    static makePayment(date: Date, value: number, couponId: string, total: number, alreadyPayed: number): AffiliatePayment {
        if (value > (total / 100) || value <= 0 || value > (total - alreadyPayed)) throw new PaymentValueExceedsAvaliable('Valor fora do disponível para pagar')
        return new AffiliatePayment(uuidv4(), date, value, couponId)
    }
}