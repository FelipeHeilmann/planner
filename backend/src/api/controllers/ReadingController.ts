import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateReading } from '@/application/usecase/reading/CreateReading'
import { GetAllReadings } from '@/application/usecase/reading/GetAllReadings'
import { UpdateReading } from '@/application/usecase/reading/UpdateReadings'
import { GetReadingById } from '@/application/usecase/reading/GetReadingById'
import { DeleteReading } from '@/application/usecase/reading/DeleteReading'
import { readingSchema } from '../schemas/readingSchema'
import { GetReadingsGroupByMonth } from '@/application/usecase/reading/GetReadingsGroupByMonth'


export class ReadingController {
    private readonly createReading: CreateReading
    private readonly getAllReadings: GetAllReadings
    private readonly updateReading: UpdateReading
    private readonly getReadingById: GetReadingById
    private readonly deleteReadings: DeleteReading
    private readonly getReadingsGroupByMonth: GetReadingsGroupByMonth
    constructor(
        createReading: CreateReading,
        getAllReadings: GetAllReadings,
        updateReading: UpdateReading,
        getReadingById: GetReadingById,
        deleteReadings: DeleteReading,
        getReadingsGroupByMonth: GetReadingsGroupByMonth
    ) {
        this.createReading = createReading
        this.getAllReadings = getAllReadings
        this.updateReading = updateReading
        this.getReadingById = getReadingById
        this.deleteReadings = deleteReadings
        this.getReadingsGroupByMonth = getReadingsGroupByMonth
    }

    async handleCreate(req: FastifyRequest, reply: FastifyReply) {
        const { bookName, bookChapters, duration, userDate, readingPlanId } = readingSchema.parse(req.body)

        const { reading, message } = await this.createReading.execute({ bookName, bookChapters, duration, userDate, userId: req.user.sub, readingPlanId: readingPlanId || null })

        reply.header('Location', `/readings/${reading.id} `)

        message !== undefined ? reply.status(201).send({ message }) : reply.status(201).send()

    }
    async handleGetAll(req: FastifyRequest, reply: FastifyReply) {
        const readings = await this.getAllReadings.execute(req.user.sub)

        reply.status(200).send(readings)
    }
    async handleGetById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const reading = await this.getReadingById.execute(id)

        reply.status(200).send(reading)
    }
    async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { duration, userDate, bookChapters, bookName } = readingSchema.parse(req.body)

        await this.updateReading.execute({
            duration, userDate, id, bookChapters, bookName
        })

        reply.status(200).send()
    }
    async handleGetReadingsGroupByMonth(req: FastifyRequest, reply: FastifyReply) {
        const result = await this.getReadingsGroupByMonth.execute(req.user.sub)

        reply.status(200).send(result)
    }
    async handleDelete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        await this.deleteReadings.execute(id)

        reply.status(200).send()
    }
}