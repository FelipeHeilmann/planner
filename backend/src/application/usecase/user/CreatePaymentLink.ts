//pensar em refatoração
import { PaymentGateway } from '@/application/gateway/PaymentGateway'
import { ICouponRepository } from '@/application/repository/ICouponRepository'
export class CreatePaymentLink {
    private readonly couponRepository: ICouponRepository
    private readonly paymentGateway: PaymentGateway
    constructor(couponRepository: ICouponRepository, paymentGateway: PaymentGateway) {
        this.couponRepository = couponRepository
        this.paymentGateway = paymentGateway
    }

    async execute(input: Input): Promise<string> {
        const coupon = input.couponName !== null ? await this.couponRepository.getByName(input.couponName) : null

        let amount
        let code
        if (input.plan === '1') {
            amount = coupon ? 7700 - (7700 * (coupon.getValue() / 100)) : 7700
            code = coupon ? `1-${coupon.id}` : '1'
        } else {
            amount = coupon ? 6600 - (6600 * (coupon.getValue() / 100)) : 6600
            code = coupon ? `2-${coupon.id}` : '2'
        }

        const regex = /[-()]/g
        const telephoneResult = input.telephone.replaceAll(regex, '').toString().split(' ')

        const customer = {
            name: input.name,
            email: input.email,
            document: input.cpf.replace(/[.-]/g, ''),
            document_type: 'CPF',
            type: 'individual',
            phones: {
                mobile_phone: {
                    country_code: '55',
                    number: telephoneResult[1],
                    area_code: telephoneResult[0]
                }
            }
        }

        const date = new Date()
        date.setDate(date.getDate() + 7)

        const dueDate = date.toISOString()

        const items = [{
            amount,
            description: 'Planner Bíblico',
            quantity: 1,
            code: String(code),
        }]

        const paymentGatewayInput = {
            customer: customer,
            items: items,
            dueDate: dueDate
        }

        console.log(customer.phones)

        const paymentLink = await this.paymentGateway.createPaymentLink(paymentGatewayInput)


        return paymentLink

    }
}

type Input = {
    name: string
    email: string
    cpf: string
    telephone: string
    plan: string
    couponName: string | null
}