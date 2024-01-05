import { PaymentGateway } from '@/application/gateway/PaymentGateway'
import axios from 'axios'

export class PagarmeGateway implements PaymentGateway {
    private API_KEY = process.env.PAGARME_TEST!
    private API_PASSWORD = ''

    async createPaymentLink(input: Input): Promise<string> {
        const amount = input.items[0].amount

        const payments = [
            {
                payment_method: 'checkout',
                checkout: {
                    customer_editable: false,
                    skip_checkout_success_page: false,
                    accepted_payment_methods: ['credit_card', 'boleto', 'pix'],
                    success_url: 'https://plannerbiblico.com.br/confirmacao-pagamento/',
                    boleto: {
                        bank: '104',
                        instructions: 'Pagar até o vencimento',
                        due_at: input.dueDate
                    },
                    credit_card: {
                        capture: true,
                        statement_descriptor: '',
                        installments: [
                            {
                                number: 1,
                                total: amount
                            },
                            {
                                number: 2,
                                total: Math.floor(amount + (0.0731 * amount))
                            },
                            {
                                number: 3,
                                total: Math.floor(amount + (0.0857 * amount))
                            },
                            {
                                number: 4,
                                total: Math.floor(amount + (0.0983 * amount))
                            },
                            {
                                number: 5,
                                total: Math.floor(amount + (0.119 * amount))
                            },
                            {
                                number: 6,
                                total: Math.floor(amount + (0.1235 * amount))
                            },
                            {
                                number: 7,
                                total: Math.floor(amount + (0.1361 * amount))
                            },
                            {
                                number: 8,
                                total: Math.floor(amount + (0.1487 * amount))
                            },
                            {
                                number: 9,
                                total: Math.floor(amount + (0.1613 * amount))
                            },
                            {
                                number: 10,
                                total: Math.floor(amount + (0.1739 * amount))
                            },
                            {
                                number: 11,
                                total: Math.floor(amount + (0.1835 * amount))
                            },
                            {
                                number: 12,
                                total: Math.floor(amount + (0.1991 * amount))
                            },
                        ]
                    }, pix: {
                        expires_in: 100000
                    }
                }
            }
        ]

        const requestData = {
            customer: input.customer,
            items: input.items,
            payments
        }

        const response = await axios.post('https://api.pagar.me/core/v5/orders', JSON.stringify(requestData), {
            headers: {
                Authorization: 'Basic ' + Buffer.from(`${this.API_KEY}:${this.API_PASSWORD}`).toString('base64'),
                'Content-Type': 'application/json; charset=utf-8'
            }
        })

        return response.data.checkouts[0].payment_url
    }
}

type Input = {
    customer: {
        name: string,
        email: string,
        document: string,
        document_type: string,
        type: string,
    },
    items: {
        amount: number,
        description: string,
        quantity: number,
        code: string,
    }[],
    dueDate: string
}
