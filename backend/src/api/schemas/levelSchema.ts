import { z } from 'zod'

export const levelSchema = z.object({
    name: z.string(),
    description: z.string(),
    imageUrl: z.string(),
    minPoints: z.number()
})