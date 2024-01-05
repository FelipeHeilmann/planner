import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { Coupon } from '@/domain/entities/Coupon'

export class GetMyCoupons{
    private readonly couponRepository: ICouponRepository
    private readonly userRepository: IUserRepository
    constructor(couponRepository: ICouponRepository, userRepository: IUserRepository) {
        this.couponRepository = couponRepository
        this.userRepository = userRepository
    }

    async execute(affiliateId: string): Promise<Coupon[]> {
        const coupons = await (await this.couponRepository.getAll()).filter(coupon => coupon.getAffiliateId() === affiliateId)
        const affiliate = await this.userRepository.getById(affiliateId)
        for (const coupon of coupons) {
            for (const use of coupon.getUsesCoupon()) {
                use.userName = affiliate.getName()
                use.userEmail = affiliate.getEmail()
            }
        }

        return coupons
    }
}