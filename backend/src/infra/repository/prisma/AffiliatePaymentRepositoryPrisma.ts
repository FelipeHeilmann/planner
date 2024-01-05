import { NotFoundError } from '@/api/helpers/api-error'
import { AffiliatePaymentMapper } from '@/application/mappers/AffiliatePaymentMapper'
import { IAffiliatePaymentRepository } from '@/application/repository/IAffiliatePaymentRepository'
import { AffiliatePayment } from '@/domain/entities/AffiliatePayment'
import { PrismaClient } from '@prisma/client'

export class AffiliatePaymentRepositoryPrisma implements IAffiliatePaymentRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async getAll(): Promise<AffiliatePayment[]> {
        return AffiliatePaymentMapper.mapColection(await this.prisma.affiliatePayment.findMany())
    }
    async getById(paymentId: string): Promise<AffiliatePayment> {
        const paymentExist = await this.prisma.affiliatePayment.findFirst({
            where: {
                id: paymentId
            }
        })

        if (paymentExist === null) {
            throw new NotFoundError('Pagamento não encontrado')
        }

        return AffiliatePaymentMapper.map(paymentExist)

    }
    async getByCoupon(couponId: string): Promise<AffiliatePayment[]> {
        return AffiliatePaymentMapper.mapColection(await this.prisma.affiliatePayment.findMany({
            where: {
                couponId
            }
        }))
    }
    async save(payment: AffiliatePayment): Promise<void> {
        await this.prisma.affiliatePayment.create({
            data: {
                id: payment.id,
                couponId: payment.couponId,
                date: payment.date,
                value: payment.value
            }
        })
    }
}