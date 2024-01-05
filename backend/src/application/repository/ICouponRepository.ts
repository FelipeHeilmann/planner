import { Coupon } from '@/domain/entities/Coupon'

export interface ICouponRepository {
    getAll(): Promise<Coupon[]>

    getById(couponId: string): Promise<Coupon>

    getByName(name: string): Promise<Coupon>

    save(coupon: Coupon): Promise<void>

    saveUseCoupon(coupon: Coupon): Promise<void>

    update(coupon: Coupon): Promise<void>
}