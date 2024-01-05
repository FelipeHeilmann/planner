import { z } from 'zod'

export const readingPlanSchema = z.object({
    name: z.string(),
    planOf: z.string(),
    book: z.string().nullable(),
    testamentId: z.number().nullable(),
    endDate: z.string(),
    readingGoalPerDay: z.number()
})