import { User } from '@/domain/entities/User'
import { Queue } from '@/infra/queue/Queue'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { CreatedUser } from '@/domain/events/CreatedUser'
import { ICouponRepository } from '@/application/repository/ICouponRepository'
import { UseCoupon } from '@/domain/entities/UseCoupon'
import { OriginEnum } from '@/domain/enum/originEnum'
import bcrypt from 'bcrypt'

export class CreateuserByPayment {
    private readonly userRepository: IUserRepository
    private readonly couponRepository: ICouponRepository
    private readonly queue: Queue

    constructor(
        userRepository: IUserRepository,
        queue: Queue,
        couponRepository: ICouponRepository
    ) {
        this.userRepository = userRepository
        this.queue = queue
        this.couponRepository = couponRepository
    }

    async execute(input: Input): Promise<void> {
        await this.queue.connect()
        const words = ['devocional', 'leitura', 'memorização', 'oração']
        const password = `${words[Math.floor(Math.random() * words.length)]}${(Math.random() * 100).toFixed()}`
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(password, salt)

        const code = input.data.items[0].code

        const coupon = code.length > 1 ? await this.couponRepository.getById(code.slice(2)) : null

        const user = User.create(
            input.data.customer.name,
            input.data.customer.email,
            hashPassword,
            Number(code[0]),
            true,
            false,
            input.data.customer.id,
            false,
            OriginEnum.Payment
        )

        await this.userRepository.save(user)

        if (coupon) {
            const useCoupon = new UseCoupon(user.id, 'pago', input.data.amount, new Date())
            coupon.used(useCoupon)
            await this.couponRepository.update(coupon)
            await this.couponRepository.saveUseCoupon(coupon)
        }


        const createdUser = new CreatedUser(
            user.id,
            user.getName(),
            user.getEmail(),
            user.getAccesDuration(),
            user.getCreatedAt(),
            true,
            password,
        )

        await this.queue.publish('createUser', createdUser)
    }
}

type Input = {
    data: {
        amount: number,
        items: [
            {
                code: string
            }
        ],
        customer: {
            id: string
            name: string
            email: string
            document: string
            document_type: string
            type: string
        }
    }
}