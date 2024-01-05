import { CreateMemorization } from '@/application/usecase/memorization/CreateMemorization'
import { GetAllMemorizations } from '@/application/usecase/memorization/GetAllMemorizaion'
import { UpdateMemorization } from '@/application/usecase/memorization/UpdateMemorization'
import { FinishedMemorization } from '@/application/usecase/memorization/FinishedMemorization'
import { AddTimeMemorizated } from '@/application/usecase/memorization/AddTimeMemorizated'
import { DeleteMemorization } from '@/application/usecase/memorization/DeleteMemorization'
import { GetMemorizationById } from '@/application/usecase/memorization/GetMermorizationById'
import { memorizationSchema } from '../schemas/memorizationSchema'
import { FastifyReply, FastifyRequest } from 'fastify'

export class MemorizationController {
    private readonly createMemorization: CreateMemorization
    private readonly getAllMemorization: GetAllMemorizations
    private readonly updateMemorization: UpdateMemorization
    private readonly finishedMemorization: FinishedMemorization
    private readonly addTimeMemorizated: AddTimeMemorizated
    private readonly getMemorizationById: GetMemorizationById
    private readonly deleteMemorization: DeleteMemorization
    constructor(
        createMemorization: CreateMemorization,
        getAllMemorization: GetAllMemorizations,
        updateMemorization: UpdateMemorization,
        finishedMemorization: FinishedMemorization,
        addTimeMemorizated: AddTimeMemorizated,
        getMemorizationById: GetMemorizationById,
        deleteMemorization: DeleteMemorization,
    ) {
        this.createMemorization = createMemorization
        this.getAllMemorization = getAllMemorization
        this.updateMemorization = updateMemorization
        this.finishedMemorization = finishedMemorization
        this.addTimeMemorizated = addTimeMemorizated
        this.getMemorizationById = getMemorizationById
        this.deleteMemorization = deleteMemorization
    }

    async handleCreate(req: FastifyRequest, reply: FastifyReply) {
        const { bookName, bookChapter, verse, description } = memorizationSchema.parse(req.body)

        const memorization = await this.createMemorization.execute({
            bookName, bookChapter, verse, userId: req.user.sub, description: description || null
        })

        reply.header('Location', `/memorizations/${memorization.id}`)

        reply.status(201).send()
    }
    async handleGetAll(req: FastifyRequest, reply: FastifyReply) {
        const memorizations = await this.getAllMemorization.execute(req.user.sub)

        reply.status(200).send(memorizations)
    }
    async handleGetById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const memorization = await this.getMemorizationById.execute(id)

        reply.status(200).send(memorization)
    }
    async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { bookName, bookChapter, verse, description } = memorizationSchema.parse(req.body)

        await this.updateMemorization.execute({
            bookName, bookChapter, verse, id, description
        })

        reply.status(200).send()
    }
    async handleDelete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        await this.deleteMemorization.execute(id)

        reply.status(200).send()
    }
    async handeleFinished(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const message = await this.finishedMemorization.execute(id)

        message !== undefined ? reply.status(201).send({ message }) : reply.status(201).send()
    }
    async handleAddTimeMemorizated(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { date } = req.body as { date: string }

        await this.addTimeMemorizated.execute(date, id)

        reply.status(200).send()
    }
}