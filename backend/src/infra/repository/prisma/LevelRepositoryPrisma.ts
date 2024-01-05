import { PrismaClient } from '@prisma/client'
import { ILevelRepository } from '@/application/repository/ILevelRepository'
import { Level } from '@/domain/entities/Level'

export class LevelRepositoryPrisma implements ILevelRepository {
    constructor(readonly prisma: PrismaClient) { }
    async getAll(): Promise<Level[]> {
        return await this.prisma.level.findMany()
    }
    async getById(id: number): Promise<Level | null> {
        return await this.prisma.level.findFirst({
            where: {
                id: id
            }
        })
    }
    async save(level: Level): Promise<void> {
        await this.prisma.level.create({
            data: {
                id: level.id,
                description: level.description,
                imageUrl: level.imageUrl,
                name: level.name,
                minPoints: level.minPoints
            }
        })
    }
    async count(): Promise<number> {
        return await this.prisma.level.count()
    }
}