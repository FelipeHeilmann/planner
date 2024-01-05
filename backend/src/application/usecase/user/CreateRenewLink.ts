import { PaymentGateway } from '@/application/gateway/PaymentGateway'
import { IUserRepository } from '@/application/repository/IUserRepository'
import axios from 'axios'

export class CreateRenewLink {
    private readonly userRepository: IUserRepository
    private readonly paymentGateway: PaymentGateway
    constructor(userRepository: IUserRepository, paymentGateway: PaymentGateway) {
        this.userRepository = userRepository
        this.paymentGateway = paymentGateway
    }

    async execute(input: Input): Promise<string> {
        const API_KEY = process.env.PAGARME_TEST!
        const API_PASSWORD = ''

        const user = await this.userRepository.getById(input.userId)

        const code = input.plan
        const amount = input.plan === '1' ? 7700 : 6600

        const response = await axios.get(`https://api.pagar.me/core/v5/customers/${user.getPagarmeId()}`, {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${API_KEY}:${API_PASSWORD}`).toString('base64'),
                'Content-Type': 'application/json; charset=utf-8'
            }
        })
        const userPagarmeData = response.data

        const customer = {
            name: userPagarmeData.name,
            email: userPagarmeData.email,
            type: userPagarmeData.type,
            document: userPagarmeData.document,
            document_type: userPagarmeData.document_type,
        }

        const date = new Date()
        date.setDate(date.getDate() + 7)

        const dueDate = date.toISOString()

        const items = [
            {
                amount,
                description: 'Planner Bíblico',
                quantity: 1,
                code: code,
            },
        ]

        const paymentGatewayInput = {
            customer: customer,
            items: items,
            dueDate: dueDate
        }

        const paymentLink = await this.paymentGateway.createPaymentLink(paymentGatewayInput)

        return paymentLink
    }
}

type Input = {
    userId: string,
    plan: string
}