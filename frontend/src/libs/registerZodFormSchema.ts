import { z } from "zod";

export const registerZodFormSchema = z.object({
    name: z
        .string({
            required_error: "O nome é obrigatório"
        }),
    email: z
        .string({
            required_error: "O email é obrigatório"
        })
        .email("Formato de email inválido"),
    cpf:
        z.string({
            required_error: "o cpf é obrigatório"
        }),
    telephone: z
        .string({
            required_error: "O telefone é obrigatório"
        }),
    plan: z
        .string({
            required_error: "A duração é obrigatória"
        })
})

export type TRegisterZodFormSchema = z.infer<typeof registerZodFormSchema>