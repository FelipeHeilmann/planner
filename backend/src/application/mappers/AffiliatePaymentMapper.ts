import { AffiliatePayment } from '@/domain/entities/AffiliatePayment'

export class AffiliatePaymentMapper {
    static map(input: Input) {
        return new AffiliatePayment(
            input.id,
            input.date,
            input.value,
            input.couponId
        )
    }

    static mapColection(input: Input[]) {
        const affiliatePayments: AffiliatePayment[] = []

        input.map(item => affiliatePayments.push(AffiliatePaymentMapper.map(item)))

        return affiliatePayments
    }
}


type Input = {
    date: Date
    value: number
    id: string
    couponId: string
}