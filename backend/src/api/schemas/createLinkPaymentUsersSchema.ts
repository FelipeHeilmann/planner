import z from 'zod'

const createLinkPaymentUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    cpf: z.string(),
    telephone: z.string(),
    plan: z.string(),
    couponName: z.string().nullable()
})

export { createLinkPaymentUserSchema }