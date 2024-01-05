import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateDevotional } from '@/application/usecase/devotional/CreateDevotional'
import { GetAllDevotional } from '@/application/usecase/devotional/GetAllDevotional'
import { UpdateDevotional } from '@/application/usecase/devotional/UpdateDevotional'
import { GetDevotionalById } from '@/application/usecase/devotional/GetDevotionalById'
import { DeleteDevotional } from '@/application/usecase/devotional/DeleteDevotional'
import { devotionalSchema } from '../schemas/devotionalSchema'

export class DevotionalController {
    private readonly createDevotional: CreateDevotional
    private readonly getAllDevotional: GetAllDevotional
    private readonly updateDevotional: UpdateDevotional
    private readonly getDevotionalById: GetDevotionalById
    private readonly deleteDevotional: DeleteDevotional
    constructor(
        createDevotional: CreateDevotional,
        getAllDevotional: GetAllDevotional,
        updateDevotional: UpdateDevotional,
        getDevotionalById: GetDevotionalById,
        deleteDevotional: DeleteDevotional,
    ) {
        this.createDevotional = createDevotional
        this.getAllDevotional = getAllDevotional
        this.updateDevotional = updateDevotional
        this.getDevotionalById = getDevotionalById
        this.deleteDevotional = deleteDevotional
    }

    async handleCreate(req: FastifyRequest, reply: FastifyReply) {
        const { bookName, bookChapter, learned, subject, application, verses, userDate } = devotionalSchema.parse(req.body)


        const { devotional, message } = await this.createDevotional.execute({
            bookName, bookChapter, learned, subject, application, verses, userDate, userId: req.user.sub
        })

        reply.header('Location', `/devotionals/${devotional.id}`)

        message !== undefined ? reply.status(201).send({ message }) : reply.status(201).send()

    }
    async handleGetAll(req: FastifyRequest, reply: FastifyReply) {
        const devotionals = await this.getAllDevotional.execute(req.user.sub)

        reply.status(200).send(devotionals)
    }
    async handleGetById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const devotional = await this.getDevotionalById.execute(id)

        reply.status(200).send(devotional)
    }
    async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
        const { bookName, bookChapter, learned, subject, application, verses, userDate } = devotionalSchema.parse(req.body)
        const { id } = req.params as { id: string }

        await this.updateDevotional.execute({
            bookName, bookChapter, learned, subject, application, verses, userDate, id
        })

        return reply.status(200).send()
    }
    async handleDelete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const devotional = await this.deleteDevotional.execute(id)

        reply.status(200).send(devotional)
    }
}