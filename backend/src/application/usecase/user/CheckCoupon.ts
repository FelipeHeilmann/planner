import { BadRequestError } from '@/api/helpers/api-error'
import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { Coupon } from '@/domain/entities/Coupon'

export class CheckCoupon {
    private readonly couponRepository: ICouponRepository
    constructor(couponRepository: ICouponRepository) {
        this.couponRepository = couponRepository
    }

    async execute(couponName: string): Promise<Coupon> {
        const coupon = await this.couponRepository.getByName(couponName)

        if (coupon.getIsValid() === false) {
            throw new BadRequestError('Cupon inválido')
        }

        return coupon
    }
}