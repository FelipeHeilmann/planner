import z from 'zod'

const devotionalSchema = z.object({
    bookName: z.string(),
    bookChapter: z.string(),
    learned: z.string(),
    subject: z.string(),
    application: z.string(),
    verses: z.array(z.number()),
    userDate: z.string()
})

export { devotionalSchema }