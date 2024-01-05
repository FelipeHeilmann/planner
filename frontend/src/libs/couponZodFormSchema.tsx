import { isValid, z } from "zod";

export const couponZodFormSchema = z.object({

    name: z
        .string(),
    value: z
        .string(),
    dueAt: z
        .string()
        .nullable(),
    affiliateId: z
        .string()
        .nullable(),
    percentageToAffiliate: z
        .string()
        .nullable(),

})

export type TCouponZodForm = z.infer<typeof couponZodFormSchema>