import { z } from "zod"

export const readingsZodFormSchema = z.object({
    bookName: z
        .string(),
    bookChapters: z
        .array(
            z.object(
                {
                    value: z.number(),
                    label: z.number(),
                }
            )).nonempty({ message: '' }).or(z.array(z.any())),
    userDate: z
        .string(),
    readingPlan: z
        .string().optional(),
    duration: z
        .number(),
})

// To infer type
export type TReadingZodFormSchema = z.infer<typeof readingsZodFormSchema>
