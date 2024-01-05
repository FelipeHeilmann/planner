import { Coupon } from '@/domain/entities/Coupon'
import { UseCoupon } from '@/domain/entities/UseCoupon'

export class CouponMapper {
    static map(input: CouponDBOuput): Coupon {
        const coupon = new Coupon(
            input.id,
            input.name,
            input.value,
            input.isValid,
            input.use,
            [],
            input.createdAt,
            input.dueAt,
            input.affiliateId,
            input.percentageToAffiliate
        )

        coupon.setAffiliateName(input.affiliate ? input.affiliate.name : null)
        return coupon
    }

    static mapCollection(input: CouponDBOuput[]): Coupon[] {
        const coupons: Coupon[] = []

        input.map(item => coupons.push(CouponMapper.map(item)))

        return coupons
    }

    static mapUseCoupon(input: UseCouponOutputDB[]): UseCoupon[] {
        const usesCoupon: UseCoupon[] = []


        input.map(item => usesCoupon.push(new UseCoupon(item.userId, item.status, item.total, item.date)))

        return usesCoupon
    }

}

type CouponDBOuput = {
    id: string
    name: string
    use: number
    value: number
    isValid: boolean
    createdAt: Date
    dueAt: Date | null
    affiliateId: string | null,
    percentageToAffiliate: number | null
    affiliate: {
        name: string
    } | null
}

type UseCouponOutputDB = {
    id: string
    couponId: string
    userId: string
    status: string
    total: number
    date: Date | null
}