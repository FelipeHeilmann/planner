import { z } from "zod";

export const resetPasswordZodFormSchema = z.object({
    password: z
        .string({
            required_error: "A senha é obrigatória"
        })
        .min(4, {
            message: "Senha deve conter no mínimo 4 caracteres"
        }),
    confirmPassword: z
        .string({
            required_error: "A confirmação da senha é obrigatória"
        })
        .min(4, {
            message: "Senha deve conter no mínimo 4 caracteres"
        }),
})

export type TResetPasswordZodFormSchema = z.infer<typeof resetPasswordZodFormSchema>
