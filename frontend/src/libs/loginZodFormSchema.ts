import { z } from "zod"

export const loginZodFormSchema = z.object({
    email: z
        .string({
            required_error: 'O email é obrigatório',
        })
        .email("Formato de email inválido")
        .max(50, {
            message: "Email não poder conter mais de 50 caracteres"
        }),
    password: z
        .string({
            required_error: "A senha é obrigatória"
        })
        .min(4, {
            message: "Senha deve conter no mínimo 4 caracteres"
        }),
})

// To infer type
export type TloginCredentials = z.infer<typeof loginZodFormSchema>
