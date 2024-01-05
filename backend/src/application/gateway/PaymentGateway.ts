export interface PaymentGateway {
    createPaymentLink(input: Input): Promise<string>

}

type Input = {
    customer: {
        name: string,
        email: string,
        document: string,
        document_type: string,
        type: string,
    },
    items:
    {
        amount: number,
        description: string,
        quantity: number,
        code: string,
    }[],
    dueDate: string
}