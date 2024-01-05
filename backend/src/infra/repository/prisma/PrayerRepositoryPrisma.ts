import { PrismaClient } from '@prisma/client'
import { Prayer } from '@/domain/entities/Prayer'
import { IPrayerRepository } from '@/application/repository/IPrayerRepository'
import { PrayerMapper } from '@/application/mappers/PrayerMapper'
import { NotFoundError } from '@/api/helpers/api-error'

export class PrayerRepositoryPrisma implements IPrayerRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(prayer: Prayer): Promise<void> {
        await this.prisma.prayer.create({
            data: {
                id: prayer.id,
                title: prayer.getTitle(),
                description: prayer.getDescription(),
                request: prayer.getRequest(),
                userId: prayer.getUserId(),
                createdAt: prayer.getCreatedAt(),
                updatedAt: prayer.getUpdatedAt(),
                status: prayer.getStatus(),
                timesPrayed: prayer.getTimesPrayed(),
                userDate: prayer.getUserDate()
            }
        })
    }
    async getAll(userId: string): Promise<Prayer[]> {
        const prayers = PrayerMapper.mapCollection(await this.prisma.prayer.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                userDate: 'desc'
            }
        }))

        return prayers
    }
    async getById(id: string): Promise<Prayer> {
        const result = await this.prisma.prayer.findFirst({
            where: {
                id
            }
        })

        if (result === null) {
            throw new NotFoundError('Oração não encontrada')
        }

        const prayer = PrayerMapper.map(result)

        return prayer
    }
    async update(prayer: Prayer): Promise<void> {
        await this.prisma.prayer.update({
            where: {
                id: prayer.id,
            },
            data: {
                title: prayer.getTitle(),
                description: prayer.getDescription(),
                request: prayer.getRequest(),
                updatedAt: prayer.getUpdatedAt(),
                status: prayer.getStatus(),
                timesPrayed: prayer.getTimesPrayed(),
                userDate: prayer.getUserDate()
            }
        })

    }
    async delete(id: string): Promise<void> {
        await this.prisma.prayer.delete({
            where: {
                id
            }
        })
    }
    async deleteOfUser(userId: string): Promise<void> {
        await this.prisma.prayer.deleteMany({
            where: {
                userId: userId
            }
        })
    }
}