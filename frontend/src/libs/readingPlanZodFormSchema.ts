import { z } from "zod"

export const readingPlanZodFormSchema = z.object({
    name: z
        .string({
            required_error: 'Muito longo'
        }).max(100),
    planOf: z
        .string(), // -> book, testament, bible
    book: z
        .string().or(z.null()),
    endDate: z
        .string(), // -> new Date
})

// To infer type
export type TReadingPlanZodFormSchema = z.infer<typeof readingPlanZodFormSchema>
