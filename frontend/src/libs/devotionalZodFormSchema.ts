import { z } from 'zod'

export const devotionalZodFormSchema = z.object({
    bookName: z
        .string({
            required_error: ''
        }),
    bookChapter: z
        .string({
            required_error: ''
        }),
    verses: z
        .array(
            z.object(
                {
                    label: z.number(),
                    value: z.number()
                }
            )).nonempty({ message: '' }).or(z.array(z.any())),
    userDate: z
        .string({
            required_error: ''
        }),
    subject: z
        .string({
            required_error: 'O tema é obrigatório'
        }).max(300, 'O tema é muito longo'),
    learned: z
        .string().max(700, 'O que aprendeu é muito longo'),
    application: z
        .string().max(700, 'O como aplicar é muito longo'),
})

// To infer type
export type TDevotionalZodFormSchema = z.infer<typeof devotionalZodFormSchema>

