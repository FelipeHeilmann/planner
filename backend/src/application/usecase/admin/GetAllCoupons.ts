import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { Coupon } from '@/domain/entities/Coupon'

export class GetAllCoupons {
    private readonly couponRepository: ICouponRepository
    private readonly userRepository: IUserRepository
    constructor(couponRepository: ICouponRepository, userRepository: IUserRepository) {
        this.couponRepository = couponRepository
        this.userRepository = userRepository
    }

    async execute(): Promise<Coupon[]> {
        const coupons = await this.couponRepository.getAll()

        for (const coupon of coupons) {
            for (const use of coupon.getUsesCoupon()) {
                const user = await this.userRepository.getById(use.userId)
                use.userName = user.getName()
                use.userEmail = user.getEmail()
            }
        }

        return coupons
    }
}