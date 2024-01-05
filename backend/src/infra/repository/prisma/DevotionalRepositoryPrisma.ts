import { PrismaClient } from '@prisma/client'
import { Devotional } from '@/domain/entities/Devotional'
import { IDevotionalRepository } from '@/application/repository/IDevotionalRepository'
import { NotFoundError } from '@/api/helpers/api-error'
import { DevotionalMapper } from '@/application/mappers/DevotionalMapper'


export class DevotionalRepositoryPrisma implements IDevotionalRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async getAll(userid: string): Promise<Devotional[]> {
        const devotionals = DevotionalMapper.mapCollection(await this.prisma.devotional.findMany({
            where: {
                userId: userid
            },
            include: {
                book: true
            },
            orderBy: {
                userDate: 'desc'
            }
        }))

        return devotionals
    }
    async getById(id: string): Promise<Devotional> {
        const result = await this.prisma.devotional.findFirst({
            where: {
                id
            },
            include: {
                book: true
            }
        })

        if (result === null) {
            throw new NotFoundError('Devocional não encontrado')
        }

        const devotional = DevotionalMapper.map(result)

        return devotional
    }
    async save(devotional: Devotional): Promise<void> {
        await this.prisma.devotional.create({
            data: {
                id: devotional.id,
                subject: devotional.getSubject(),
                application: devotional.getApplication(),
                learned: devotional.getLearned(),
                verses: devotional.getVerses(),
                userDate: devotional.getUserDate(),
                createdAt: devotional.getCreatedAt(),
                updatedAt: devotional.getUpdatedAt(),
                userId: devotional.getUserId(),
                bookId: devotional.getBook().id
            }
        })
    }
    async update(devotional: Devotional): Promise<void> {
        await this.prisma.devotional.update({
            where: {
                id: devotional.id
            },
            data: {
                bookId: devotional.getBook().id,
                verses: devotional.getVerses(),
                subject: devotional.getSubject(),
                application: devotional.getApplication(),
                learned: devotional.getLearned(),
                userDate: devotional.getUserDate(),
                updatedAt: devotional.getUpdatedAt(),
            }
        })
    }
    async delete(id: string): Promise<void> {
        await this.prisma.devotional.delete({
            where: {
                id
            }
        })
    }
    async deleteOfUser(userId: string): Promise<void> {
        await this.prisma.devotional.deleteMany({
            where: {
                userId: userId
            }
        })
    }
}