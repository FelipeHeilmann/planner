import { PrismaClient } from '@prisma/client'
import { User } from '../../domain/entities/User'
import { IUserRepostory } from '../../application/repository/IUserRepository'
import { UserMapper } from '../../application/mapper/UserMapper'

export class UserRepositoryPrisma implements IUserRepostory {
    constructor(private readonly prisma: PrismaClient) { }

    async getAll(): Promise<User[]> {
        return UserMapper.mapCollection(await this.prisma.user.findMany())
    }
    async getById(userId: string): Promise<User> {
        return UserMapper.map(await this.prisma.user.findFirstOrThrow({ where: { applicationUserId: userId } }))
    }
    async save(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                name: user.getName(),
                email: user.getEmail(),
                accessDuration: user.getAcessDuration(),
                isActive: user.getIsActive(),
                applicationUserId: user.getApplicationUserId(),
                createdAt: user.getCreatedAt(),
                endDate: user.getEndDate()
            }
        })
    }
    async update(user: User): Promise<void> {
        await this.prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: user.getName(),
                email: user.getEmail(),
                accessDuration: user.getAcessDuration(),
                isActive: user.getIsActive(),
                applicationUserId: user.getApplicationUserId(),
                createdAt: user.getCreatedAt(),
                endDate: user.getEndDate()
            }
        })
    }
}