import { IAffiliatePaymentRepository } from '@/application/repository/IAffiliatePaymentRepository'
import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { AffiliatePayment } from '@/domain/entities/AffiliatePayment'

export class CreateAffiliatePayment {
    private readonly affiliatePaymentRepository: IAffiliatePaymentRepository
    private readonly couponRepository: ICouponRepository

    constructor(affiliatePaymentRepository: IAffiliatePaymentRepository, couponRepository: ICouponRepository) {
        this.affiliatePaymentRepository = affiliatePaymentRepository
        this.couponRepository = couponRepository
    }

    async execute(input: Input) {
        const coupon = await this.couponRepository.getById(input.couponId)

        const alreadyPayed = (await this.affiliatePaymentRepository.getByCoupon(input.couponId)).reduce((acc, item) => acc + item.value, 0)
        const percentageToAffiliate = coupon.getPercentageToAffiliate() !== null ? coupon.getPercentageToAffiliate() : 0
        const total = (coupon.getUsesCoupon().reduce((acc, item) => acc + item.total, 0) * (percentageToAffiliate! / 100))
        const payment = AffiliatePayment.makePayment(new Date(input.date), input.value, input.couponId, total, alreadyPayed)

        await this.affiliatePaymentRepository.save(payment)
    }
}

type Input = {
    value: number
    date: string
    couponId: string
}