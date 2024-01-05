import z from 'zod'

const readingSchema = z.object({
    userDate: z.string(),
    bookName: z.string(),
    bookChapters: z.array(z.number()),
    duration: z.number(),
    readingPlanId: z.string().nullable()
})

export { readingSchema }