import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateReadingPlan } from '@/application/usecase/reading-plan/CreateReadingPlan'
import { readingPlanSchema } from '../schemas/readingPlanSchema'
import { GetReadingsOfReadingPlan } from '@/application/usecase/reading-plan/GetReadingsOfReadingPlan'
import { GetAllReadingsPlan } from '@/application/usecase/reading-plan/GetAllReadingsPlans'
import { GetReadingPlanById } from '@/application/usecase/reading-plan/GetReadingPlanById'
import { IncreaseGoalPerDay } from '@/application/usecase/reading-plan/IncreaseGoalPerDay'
import { DecreaseGoalPerDay } from '@/application/usecase/reading-plan/DecreaseGoalPerDay'
import { UpdateReadingPlan } from '@/application/usecase/reading-plan/UpdateReadingPlan'
import { GetReadingPlanReadingsGroupByMonth } from '@/application/usecase/reading-plan/GetReadingPlanReadingsGroupByMonth'
import { GetReadingsPlanCount } from '@/application/usecase/reading-plan/GetReadingPlanCount'
import { GetReadingPlanReadingGroupByDay } from '@/application/usecase/reading-plan/GetReadingPlanReadingGroupByDay'

export class ReadingPlanController {
    private readonly createReadinPlan: CreateReadingPlan
    private readonly getReadingsFromReadingBook: GetReadingsOfReadingPlan
    private readonly getAllReadingsPlan: GetAllReadingsPlan
    private readonly getReadinPlanById: GetReadingPlanById
    private readonly increaseReadingPlanGoalPerDay: IncreaseGoalPerDay
    private readonly decreaseReadingPlanGoalPerDay: DecreaseGoalPerDay
    private readonly updateReadingPlan: UpdateReadingPlan
    private readonly getReadingPlanReadingsGroupByMonth: GetReadingPlanReadingsGroupByMonth
    private readonly getReadingPlanCount: GetReadingsPlanCount
    private readonly getReadingPlanReadingGroupByDay: GetReadingPlanReadingGroupByDay
    constructor(
        createReadinPlan: CreateReadingPlan,
        getReadingsFromReadingBook: GetReadingsOfReadingPlan,
        getAllReadingsPlan: GetAllReadingsPlan,
        getReadinPlanById: GetReadingPlanById,
        increaseReadingPlanGoalPerDay: IncreaseGoalPerDay,
        decreaseReadingPlanGoalPerDay: DecreaseGoalPerDay,
        updateReadingPlan: UpdateReadingPlan,
        getReadingPlanReadingsGroupByMonth: GetReadingPlanReadingsGroupByMonth,
        getReadingPlanCount: GetReadingsPlanCount,
        getReadingPlanReadingGroupByDay: GetReadingPlanReadingGroupByDay
    ) {
        this.createReadinPlan = createReadinPlan
        this.getReadingsFromReadingBook = getReadingsFromReadingBook
        this.getAllReadingsPlan = getAllReadingsPlan
        this.getReadinPlanById = getReadinPlanById
        this.increaseReadingPlanGoalPerDay = increaseReadingPlanGoalPerDay
        this.decreaseReadingPlanGoalPerDay = decreaseReadingPlanGoalPerDay
        this.updateReadingPlan = updateReadingPlan
        this.getReadingPlanReadingsGroupByMonth = getReadingPlanReadingsGroupByMonth
        this.getReadingPlanCount = getReadingPlanCount
        this.getReadingPlanReadingGroupByDay = getReadingPlanReadingGroupByDay
    }

    async handleGetAll(req: FastifyRequest, reply: FastifyReply) {
        const readings = await this.getAllReadingsPlan.execute(req.user.sub)

        reply.status(200).send(readings)
    }
    async handleGetById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const readingPlan = await this.getReadinPlanById.execute(id)

        reply.status(200).send(readingPlan)
    }
    async handleCreate(req: FastifyRequest, reply: FastifyReply) {
        const { name, planOf, book, testamentId, endDate, readingGoalPerDay } = readingPlanSchema.parse(req.body)

        const readingPlan = await this.createReadinPlan.execute({
            name,
            planOf,
            book,
            testamentId,
            endDate,
            readingGoalPerDay,
            userId: req.user.sub
        })

        reply.header('Location', `/readings-plans/${readingPlan.id}`)

        reply.status(201).send()
    }
    async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { name, planOf, book, testamentId, endDate, readingGoalPerDay } = readingPlanSchema.parse(req.body)

        await this.updateReadingPlan.execute({
            id,
            name,
            planOf,
            book: book || null,
            testamentId: testamentId || null,
            endDate,
            readingGoalPerDay
        })

        reply.status(200).send()
    }
    async handleGetReadings(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const readings = await this.getReadingsFromReadingBook.execute(id)

        reply.status(200).send(readings)
    }
    async handleGetGroupPerMonth(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const result = await this.getReadingPlanReadingsGroupByMonth.execute(id)

        reply.status(200).send(result)
    }
    async handleGetGroupPerDay(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const result = await this.getReadingPlanReadingGroupByDay.execute(id)

        reply.status(200).send(result)
    }
    async handleGetCount(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        const result = await this.getReadingPlanCount.execute(id)

        reply.status(200).send(result)
    }
    async handleIncrease(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        await this.increaseReadingPlanGoalPerDay.execute(id)

        reply.status(200).send()
    }
    async handleDecrease(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        await this.decreaseReadingPlanGoalPerDay.execute(id)

        reply.status(200).send()
    }
}