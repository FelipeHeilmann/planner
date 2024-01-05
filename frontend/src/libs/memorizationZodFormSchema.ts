import { z } from "zod"

export const memorizationZodFormSchema = z.object({
    bookName: z
        .string({
            required_error: 'O nome do livro é necessário'
        }),
    bookChapter: z
        .string({
            required_error: 'O capítulo é necessário'
        }),
    verse: z
        .number({
            required_error: 'O Versículo é necessário'
        }),
    description: z
        .string()
        .nullable()
})

export type TMemorizationZodFormSchema = z.infer<typeof memorizationZodFormSchema>