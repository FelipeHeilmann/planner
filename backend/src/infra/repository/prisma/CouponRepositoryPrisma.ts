import { NotFoundError, UnauthorizedError } from '@/api/helpers/api-error'
import { CouponMapper } from '@/application/mappers/CouponMapper'
import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { Coupon } from '@/domain/entities/Coupon'
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

export class CouponRepositoryPrisma implements ICouponRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async getAll(): Promise<Coupon[]> {
        const coupons = CouponMapper.mapCollection(await this.prisma.coupon.findMany({
            include: {
                affiliate: {
                    select: {
                        name: true
                    }
                }
            }
        }))

        for (const coupon of coupons) {
            const userCoupon = CouponMapper.mapUseCoupon(await this.prisma.userCoupon.findMany({
                where: {
                    couponId: coupon.id
                }
            }))

            coupon.setUsesCoupon(userCoupon)
        }

        return coupons
    }
    async getById(couponId: string): Promise<Coupon> {
        const result = await this.prisma.coupon.findFirst({
            where: {
                id: couponId
            },
            include: {
                affiliate: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!result) {
            throw new NotFoundError('Cupom não encontrado')
        }

        const coupon = CouponMapper.map(result)

        const userCoupon = CouponMapper.mapUseCoupon(await this.prisma.userCoupon.findMany({
            where: {
                couponId: couponId
            },

        }))

        coupon.setUsesCoupon(userCoupon)

        return coupon

    }
    async getByName(name: string): Promise<Coupon> {
        const result = await this.prisma.coupon.findFirst({
            where: {
                name: name
            },
            include: {
                affiliate: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!result) {
            throw new NotFoundError('Cupom não encontrado')
        }

        const coupon = CouponMapper.map(result)

        const userCoupon = CouponMapper.mapUseCoupon(await this.prisma.userCoupon.findMany({
            where: {
                couponId: result.id
            }
        }))

        coupon.setUsesCoupon(userCoupon)

        return coupon
    }
    async save(coupon: Coupon): Promise<void> {
        if (coupon.getAffiliateId() !== null) {
            const existAffiliate = await this.prisma.user.findFirst({
                where: {
                    id: coupon.getAffiliateId()!
                }
            })

            if (existAffiliate === null)
                throw new NotFoundError('Affiliado não encontado')

            if (existAffiliate.isAffiliate === false)
                throw new UnauthorizedError('Usuário não é afiliado')

        }

        await this.prisma.coupon.create({
            data: {
                id: coupon.id,
                name: coupon.getName(),
                use: coupon.getUse(),
                value: coupon.getValue(),
                isValid: coupon.getIsValid(),
                createdAt: coupon.getCreatedAt(),
                dueAt: coupon.getDueAt(),
                affiliateId: coupon.getAffiliateId(),
                percentageToAffiliate: coupon.getPercentageToAffiliate()
            }
        })
    }
    async saveUseCoupon(coupon: Coupon): Promise<void> {
        for (const useCoupon of coupon.getUsesCoupon()) {
            await this.prisma.userCoupon.create({
                data: {
                    id: uuidv4(),
                    couponId: coupon.id,
                    userId: useCoupon.userId,
                    status: useCoupon.status,
                    total: useCoupon.total,
                    date: useCoupon.date
                }
            })
        }
    }
    async update(coupon: Coupon): Promise<void> {
        await this.prisma.coupon.update({
            where: {
                id: coupon.id
            },
            data: {
                id: coupon.id,
                name: coupon.getName(),
                use: coupon.getUse(),
                value: coupon.getValue(),
                isValid: coupon.getIsValid(),
                createdAt: coupon.getCreatedAt(),
                dueAt: coupon.getDueAt(),
                affiliateId: coupon.getAffiliateId()
            }
        })
    }

}