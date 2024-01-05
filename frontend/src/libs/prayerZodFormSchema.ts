import { z } from "zod"

export const prayerZodFormSchema = z.object({
    title: z
        .string({
            required_error: 'O título é necessário'
        }),
    description: z
        .string({
            required_error: 'A data é necessária'
        }),
    userDate: z
        .string({
            required_error: 'A descrição é necessária'
        }),
})

// To infer type
export type TPrayerZodFormSchema = z.infer<typeof prayerZodFormSchema>
