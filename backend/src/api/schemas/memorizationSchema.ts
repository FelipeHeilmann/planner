import z from 'zod'

const memorizationSchema = z.object({
    bookName: z.string(),
    bookChapter: z.string(),
    verse: z.number(),
    description: z.string().nullable()
})

export { memorizationSchema }