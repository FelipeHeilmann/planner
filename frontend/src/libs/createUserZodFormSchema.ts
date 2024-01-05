import { z } from "zod";

export const createUserZodFormSchema = z.object({
    name: z
        .string({
            required_error: 'O nome é obrigatório'
        }),
    email: z
        .string({
            required_error: 'O email é obrigatório'
        })
        .email("Formato de email inválido"),
    password: z
        .string({
            required_error: 'A senha é obrigatória'
        }),
    isAdmin: z
        .boolean({
            required_error: 'O é admin é obrigatório'
        }),
    accessDuration: z
        .number({
            required_error: 'O tempo de duração é necessário'
        })
})

export type TCreateUserFormZodFormSchema = z.infer<typeof createUserZodFormSchema>