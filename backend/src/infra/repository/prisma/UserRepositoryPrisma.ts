import { Level, PrismaClient } from '@prisma/client'
import { User } from '@/domain/entities/User'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { UserMapper } from '@/application/mappers/UserMapper'
import { NotFoundError } from '@/api/helpers/api-error'
import { v4 as uuidv4 } from 'uuid'


export class UserRepositoryPrisma implements IUserRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async getAll() {
        const users = UserMapper.mapCollection(await this.prisma.user.findMany())
        for (const user of users) {
            const completedBook = UserMapper.mapCompletedBook(await this.prisma.userCompletedBook.findMany({
                where: {
                    userId: user.id
                }
            }))

            user.setCompletedBook(completedBook)
        }
        return users
    }
    async getAdmins(): Promise<User[]> {
        const users = UserMapper.mapCollection(await this.prisma.user.findMany({
            where: {
                isAdmin: true
            }
        }))
        for (const user of users) {
            const completedBook = UserMapper.mapCompletedBook(await this.prisma.userCompletedBook.findMany({
                where: {
                    userId: user.id
                }
            }))

            user.setCompletedBook(completedBook)
        }
        return users
    }
    async getAffiliates(): Promise<User[]> {
        const users = UserMapper.mapCollection(await this.prisma.user.findMany({
            where: {
                isAffiliate: true
            }
        }))
        for (const user of users) {
            const completedBook = UserMapper.mapCompletedBook(await this.prisma.userCompletedBook.findMany({
                where: {
                    userId: user.id
                }
            }))

            user.setCompletedBook(completedBook)
        }
        return users
    }
    async getById(id: string): Promise<User> {
        const result = await this.prisma.user.findFirst({
            where: {
                id: id
            }
        })

        if (result === null) {
            throw new NotFoundError('Usuário não encontrado')
        }

        const user = UserMapper.map(result)

        const completedBook = UserMapper.mapCompletedBook(await this.prisma.userCompletedBook.findMany({
            where: {
                userId: user.id
            }
        }))

        user.setCompletedBook(completedBook)

        return user
    }
    async getByEmail(email: string): Promise<User | null> {
        const result = await this.prisma.user.findFirst({
            where: {
                email
            }
        })

        if (result === null) {
            return result
        }

        else {
            const user = UserMapper.map(result)

            return user
        }
    }
    async getCountData(userId: string): Promise<Output> {
        const [userData, readings, devotional, memorization, prayer] = await Promise.all([
            this.prisma.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    level: true
                }
            }),
            this.prisma.reading.count({
                where: {
                    userId: userId,
                }
            }),
            this.prisma.devotional.count({
                where: {
                    userId: userId
                }
            }),
            this.prisma.memorization.count({
                where: {
                    userId: userId,
                    status: 'Finalizado'
                }
            }),
            this.prisma.prayer.count({
                where: {
                    userId: userId
                }
            })
        ])

        const result: Output = {
            level: userData!.level,
            devotionals: devotional,
            memorizations: memorization,
            points: userData!.points,
            prayers: prayer,
            readings: readings
        }


        return result
    }
    async save(user: User): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                points: user.getPoints(),
                accessDuration: user.getAccesDuration(),
                isActive: user.getIsActive(),
                createdAt: user.getCreatedAt(),
                updatedAt: user.getUpdatedAt(),
                levelId: user.getLevelId(),
                disabledAt: user.getDisabledAt(),
                lastLoginAt: user.getLastLoginAt(),
                birthDate: user.getBirthDate(),
                gender: user.getGender(),
                pagarmeId: user.getPagarmeId(),
                completedBible: user.getCompletedBible(),
                imageUrl: user.getImageUrl(),
                isAdmin: user.getIsAdmin(),
                theme: user.getTheme(),
                isAffiliate: user.getIsAffiliate(),
                origin: user.getOrigin()
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
                password: user.getPassword(),
                points: user.getPoints(),
                updatedAt: user.getUpdatedAt(),
                levelId: user.getLevelId(),
                completedBible: user.getCompletedBible(),
                imageUrl: user.getImageUrl(),
                disabledAt: user.getDisabledAt(),
                lastLoginAt: user.getLastLoginAt(),
                birthDate: user.getBirthDate(),
                pagarmeId: user.getPagarmeId(),
                gender: user.getGender(),
                accessDuration: user.getAccesDuration(),
                isActive: user.getIsActive(),
                theme: user.getTheme(),
                isAffiliate: user.getIsAffiliate(),
                origin: user.getOrigin()
            }
        })

        for (const completedBook of user.getCompletedBook()) {
            const existsCompletedBook = await this.prisma.userCompletedBook.findFirst({
                where: {
                    book: completedBook.getBook(),
                    userId: user.id
                }
            })

            if (existsCompletedBook === null) {
                await this.prisma.userCompletedBook.create({
                    data: {
                        id: uuidv4(),
                        book: completedBook.getBook(),
                        completed: completedBook.getCompleted(),
                        userId: user.id,
                        finishedAt: completedBook.getFinishedAt(),
                        startedAt: completedBook.getStartedAt()
                    }
                })
            }
            else {
                await this.prisma.userCompletedBook.update({
                    where: {
                        id: existsCompletedBook.id
                    },
                    data: {
                        completed: completedBook.getCompleted(),
                        finishedAt: completedBook.getFinishedAt(),
                        startedAt: completedBook.getStartedAt()
                    }
                })
            }


        }
    }
    async completedBook(user: User): Promise<void> {
        for (const book of user.getCompletedBook()) {
            const completedBook = await this.prisma.userCompletedBook.findFirstOrThrow({
                where: {
                    book: book.getBook()
                }
            })

            await this.prisma.userCompletedBook.update({
                where: {
                    id: completedBook.id
                },
                data: {
                    completed: book.getCompleted(),
                    finishedAt: book.getFinishedAt()
                }
            })
        }
    }
    async delete(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: id
            }
        })
    }
}

type Output = {
    level: Level
    points: number
    readings: number
    devotionals: number
    prayers: number
    memorizations: number
}