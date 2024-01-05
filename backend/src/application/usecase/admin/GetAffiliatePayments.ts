import { IAffiliatePaymentRepository } from '@/application/repository/IAffiliatePaymentRepository'

export class GetAffiliatePayments {
    private readonly affiliateRepository: IAffiliatePaymentRepository

    constructor(affiliateRepository: IAffiliatePaymentRepository) {
        this.affiliateRepository = affiliateRepository
    }

    async execute(couponId: string) {
        const payments = await this.affiliateRepository.getByCoupon(couponId)

        return payments
    }
}