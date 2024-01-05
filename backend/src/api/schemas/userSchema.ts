import z from 'zod'

const userSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    accessDuration: z.number(),
    isAdmin: z.boolean()
})

const updateUserSchema = z.object({
    name: z.string().optional(),
    newPassword: z.string().optional(),
    oldPassword: z.string().optional(),
    gender: z.string().optional(),
    birthDate: z.string().optional()
})

export { userSchema, updateUserSchema }