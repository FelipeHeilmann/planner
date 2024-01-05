import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { Coupon } from '@/domain/entities/Coupon'

export class CreateCoupon {
    private readonly coupoRepository: ICouponRepository
    constructor(coupoRepository: ICouponRepository) {
        this.coupoRepository = coupoRepository
    }

    async execute(input: Input): Promise<Coupon> {

        const coupon = Coupon.create(
            input.name,
            input.value,
            input.isValid,
            0,
            new Date(),
            input.dueAt !== null ? new Date(input.dueAt) : null,
            input.affiliateId,
            input.percentageToAffiliate
        )

        await this.coupoRepository.save(coupon)

        return coupon
    }
}

type Input = {
    name: string
    value: number
    isValid: boolean
    dueAt: string | null
    affiliateId: string | null
    percentageToAffiliate: number | null
}