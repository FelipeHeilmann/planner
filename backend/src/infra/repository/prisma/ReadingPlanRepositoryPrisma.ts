import { PrismaClient } from '@prisma/client'
import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'
import { ReadingPlan } from '@/domain/entities/ReadingPlan'
import { NotFoundError } from '@/api/helpers/api-error'
import { ReadingPlanMapper } from '@/application/mappers/ReadingPlanMapper'

export class ReadingPlanRepositoryPrisma implements IReadingPlanRepository {
    constructor(private readonly prisma: PrismaClient) { }
    async getAll(userId: string): Promise<ReadingPlan[]> {
        return ReadingPlanMapper.mapCollection(await this.prisma.readingPlan.findMany({
            where: {
                userId
            },
            orderBy: {
                createdAt: 'desc'
            }
        }))
    }
    async getById(id: string): Promise<ReadingPlan> {
        const result = await this.prisma.readingPlan.findFirst({
            where: {
                id
            }
        })

        if (result === null) {
            throw new NotFoundError('Plano não encontrado')
        }

        const readingPlan = ReadingPlanMapper.map(result)

        return readingPlan
    }
    async save(readindPlan: ReadingPlan): Promise<void> {
        await this.prisma.readingPlan.create({
            data: {
                id: readindPlan.id,
                planOf: readindPlan.getPlanOf(),
                name: readindPlan.getName(),
                book: readindPlan.getBook(),
                status: readindPlan.getStatus(),
                userId: readindPlan.getUserId(),
                readingGoalPerDay: readindPlan.getReadingGoalPerDay(),
                testamentId: readindPlan.getTestamentId(),
                endDate: readindPlan.getEndDate(),
                createdAt: readindPlan.getCreatedAt(),
                updatedAt: readindPlan.getUpdatedAt(),
            }
        })
    }
    async update(readindPlan: ReadingPlan): Promise<void> {
        await this.prisma.readingPlan.update({
            where: {
                id: readindPlan.id
            },
            data: {
                planOf: readindPlan.getPlanOf(),
                name: readindPlan.getName(),
                book: readindPlan.getBook(),
                status: readindPlan.getStatus(),
                readingGoalPerDay: readindPlan.getReadingGoalPerDay(),
                testamentId: readindPlan.getTestamentId(),
                endDate: readindPlan.getEndDate(),
                updatedAt: readindPlan.getUpdatedAt(),
            }
        })
    }
    async delete(id: string): Promise<void> {
        await this.prisma.readingPlan.delete({
            where: {
                id
            }
        })
    }
    async deleteOfUser(userId: string): Promise<void> {
        await this.prisma.readingPlan.deleteMany({
            where: {
                userId: userId
            }
        })
    }
}