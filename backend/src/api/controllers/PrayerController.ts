import { FastifyReply, FastifyRequest } from 'fastify'
import { CreatePrayer } from '@/application/usecase/prayer/CreatePrayer'
import { GetAllPrayers } from '@/application/usecase/prayer/GetAllPrayers'
import { UpdatePrayer } from '@/application/usecase/prayer/UpdatePrayer'
import { FinishedPrayer } from '@/application/usecase/prayer/FinishedPrayer'
import { AddTimePrayed } from '@/application/usecase/prayer/AddTimePrayed'
import { GetPrayerById } from '@/application/usecase/prayer/GetPrayerById'
import { DeletePrayer } from '@/application/usecase/prayer/DeletePrayer'
import { prayerSchema } from '../schemas/prayerSchema'

export class PrayerController {
    private readonly createPrayer: CreatePrayer
    private readonly getAllPrayer: GetAllPrayers
    private readonly updatePrayer: UpdatePrayer
    private readonly finishedPrayer: FinishedPrayer
    private readonly addTimePrayed: AddTimePrayed
    private readonly getPrayerById: GetPrayerById
    private readonly deletePrayer: DeletePrayer
    constructor(createPrayer: CreatePrayer,
        getAllPrayer: GetAllPrayers,
        updatePrayer: UpdatePrayer,
        finishedPrayer: FinishedPrayer,
        addTimePrayed: AddTimePrayed,
        getPrayerById: GetPrayerById,
        deletePrayer: DeletePrayer
    ) {
        this.createPrayer = createPrayer
        this.getAllPrayer = getAllPrayer
        this.updatePrayer = updatePrayer
        this.finishedPrayer = finishedPrayer
        this.addTimePrayed = addTimePrayed
        this.getPrayerById = getPrayerById
        this.deletePrayer = deletePrayer
    }

    async handleCreate(req: FastifyRequest, reply: FastifyReply) {
        const { title, description, request, userDate } = prayerSchema.parse(req.body)

        const { prayer, message } = await this.createPrayer.execute(
            { title, description, request, userId: req.user.sub, userDate, }
        )

        reply.header('Location', `/prayers/${prayer.id}`)

        message !== undefined ? reply.status(201).send({ message }) : reply.status(201).send()
    }
    async handleGetAll(req: FastifyRequest, reply: FastifyReply) {
        const prayers = await this.getAllPrayer.execute(req.user.sub)

        reply.status(200).send(prayers)
    }
    async handleGetById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const prayer = await this.getPrayerById.execute(id)

        reply.status(200).send(prayer)
    }
    async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { title, description, request, userDate } = prayerSchema.parse(req.body)

        await this.updatePrayer.execute({
            title, description, request, userDate, id
        })

        reply.status(200).send()
    }
    async handleDelete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        await this.deletePrayer.execute(id)

        reply.status(200).send()
    }
    async handleFinished(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        await this.finishedPrayer.execute(id)

        reply.status(200).send()
    }
    async handleAddTimePrayed(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { date } = req.body as { date: string }

        await this.addTimePrayed.execute(date, id)

        reply.status(200).send()
    }
}