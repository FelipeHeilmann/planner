import { PrismaClient } from '@prisma/client'
import { Memorization } from '@/domain/entities/Memorization'
import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'
import { MemorizationMapper } from '@/application/mappers/MemorizationMapper'
import { NotFoundError } from '@/api/helpers/api-error'

export class MemorizationRepositoryPrisma implements IMemorizationRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(memorization: Memorization): Promise<void> {
        await this.prisma.memorization.create({
            data: {
                id: memorization.id,
                status: memorization.getStatus(),
                bookId: memorization.getBook().id,
                userId: memorization.getUserId(),
                verse: memorization.getVerse(),
                timesMemorizated: memorization.getTimesMemorized(),
                createdAt: memorization.getCreatedAt(),
                description: memorization.getDescription(),
                updatedAt: memorization.getUpdatedAt()
            }
        })
    }
    async getAll(userId: string): Promise<Memorization[]> {
        const memorizations = MemorizationMapper.mapCollection(await this.prisma.memorization.findMany({
            where: {
                userId: userId
            },
            include: {
                book:
                    true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }))

        return memorizations
    }
    async getById(id: string): Promise<Memorization> {
        const result = await this.prisma.memorization.findFirst({
            where: {
                id
            },
            include: {
                book: true
            }
        })

        if (result === null) {
            throw new NotFoundError('Memorização não encontrada')
        }

        const memorization = MemorizationMapper.map(result)

        return memorization
    }
    async update(memorization: Memorization): Promise<void> {
        await this.prisma.memorization.update({
            where: {
                id: memorization.id
            },
            data: {
                status: memorization.getStatus(),
                bookId: memorization.getBook().id,
                verse: memorization.getVerse(),
                timesMemorizated: memorization.getTimesMemorized(),
                description: memorization.getDescription(),
                updatedAt: memorization.getUpdatedAt()
            }
        })
    }
    async delete(id: string): Promise<void> {
        await this.prisma.memorization.delete({
            where: {
                id
            }
        })
    }
    async deleteOfUser(userId: string): Promise<void> {
        await this.prisma.memorization.deleteMany({
            where: {
                userId: userId
            }
        })
    }
}