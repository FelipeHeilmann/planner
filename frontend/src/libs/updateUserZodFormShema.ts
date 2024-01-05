import { z } from "zod"

export const userUpdateSchema = z.object({
    name: z
        .string()
        .optional(),
    oldPassword: z
        .string()
        .optional(),
    newPassword: z
        .string()
        .optional(),
    image: z
        .any()
        .optional(),
    gender: z
        .string()
        .optional(),
    birthDate: z
        .string()
        .optional()
})

export type TUserUpdateZodFormSchema = z.infer<typeof userUpdateSchema>