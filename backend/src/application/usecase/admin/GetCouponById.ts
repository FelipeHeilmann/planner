import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { Coupon } from '@/domain/entities/Coupon'

export class GetCouponById {
    private readonly coupoRepository: ICouponRepository
    private readonly userRepository: IUserRepository
    constructor(coupoRepository: ICouponRepository, userRepository: IUserRepository) {
        this.coupoRepository = coupoRepository
        this.userRepository = userRepository
    }

    async execute(couponId: string): Promise<Coupon> {
        const coupon = await this.coupoRepository.getById(couponId)

        for (const use of coupon.getUsesCoupon()) {
            const user = await this.userRepository.getById(use.userId)
            use.userName = user.getName()
            use.userEmail = user.getEmail()
        }

        return coupon
    }

}