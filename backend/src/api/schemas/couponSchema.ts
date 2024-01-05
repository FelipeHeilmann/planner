import { z } from 'zod'

export const couponSchema = z.object({
    name: z.string(),
    value: z.number(),
    isValid: z.boolean(),
    dueAt: z.string().nullable(),
    affiliateId: z.string().nullable(),
    percentageToAffiliate: z.number().nullable()
})


export const affiliatePaymentSchema = z.object({
    value: z.number(),
    date: z.string()
})