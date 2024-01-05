import z from 'zod'
const prayerSchema = z.object({
    title: z.string(),
    description: z.string(),
    request: z.string(),
    userDate: z.string(),
})

export { prayerSchema }