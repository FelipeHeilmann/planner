import { AffiliatePayment } from '@/domain/entities/AffiliatePayment'

export interface IAffiliatePaymentRepository {
    getAll(): Promise<AffiliatePayment[]>

    getById(paymentId: string): Promise<AffiliatePayment>

    getByCoupon(couponId: string): Promise<AffiliatePayment[]>

    save(payment: AffiliatePayment): Promise<void>
}