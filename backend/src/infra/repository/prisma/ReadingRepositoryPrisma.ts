import { PrismaClient } from '@prisma/client'
import { Reading } from '@/domain/entities/Reading'
import { IReadingRepository } from '@/application/repository/IReadingRepository'
import { ReadingMapper } from '@/application/mappers/ReadingMapper'
import { NotFoundError } from '@/api/helpers/api-error'
import { BookMapper } from '@/application/mappers/BookMapper'
import { v4 as uuidv4 } from 'uuid'


export class ReadingRepositoryPrisma implements IReadingRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async save(reading: Reading): Promise<void> {
        await this.prisma.reading.create({
            data: {
                id: reading.id,
                duration: reading.getDuration(),
                createdAt: reading.getCreatedAt(),
                updatedAt: reading.getUpdatedAt(),
                userDate: reading.getUserDate(),
                userId: reading.getUserId(),
                readingPlanId: reading.getReadingPlan()?.id || null
            }
        })

        for (const book of reading.getBooks()) {
            await this.prisma.readingBook.create({
                data: {
                    id: uuidv4(),
                    bookId: book.id,
                    readingId: reading.id
                }
            })
        }
    }
    async getAll(userId: string): Promise<Reading[]> {
        const readings = ReadingMapper.mapCollection(await this.prisma.reading.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                userDate: 'desc'
            },
            include: {
                readingPlan: true
            }
        }))

        for (const reading of readings) {
            const readingBooks = await this.prisma.readingBook.findMany({
                where: {
                    readingId: reading.id
                },
                include: {
                    book: true
                }
            })
            const books = BookMapper.mapCollection(readingBooks.map(rb => rb.book))
            books.map(book => reading.addBook(book))
        }

        return readings
    }

    async getById(id: string): Promise<Reading> {
        const result = await this.prisma.reading.findFirst({
            where: {
                id
            },
            include: {
                readingPlan: true
            }
        })

        if (result === null) {
            throw new NotFoundError('Leitura não encontrada')
        }

        const reading = ReadingMapper.map(result)

        const readingBooks = await this.prisma.readingBook.findMany({
            where: {
                readingId: reading.id
            },
            include: {
                book: true
            }
        })
        const books = BookMapper.mapCollection(readingBooks.map(rb => rb.book))
        books.map(book => reading.addBook(book))


        return reading
    }
    async getByPlan(readingPlanId: string) {
        const readings = ReadingMapper.mapCollection(await this.prisma.reading.findMany({
            where: {
                readingPlanId
            },
            include: {
                readingPlan: true
            }
        }))

        for (const reading of readings) {
            const readingBooks = await this.prisma.readingBook.findMany({
                where: {
                    readingId: reading.id
                },
                include: {
                    book: true
                }
            })
            const books = BookMapper.mapCollection(readingBooks.map(rb => rb.book))
            books.map(book => reading.addBook(book))
        }

        return readings
    }
    async update(reading: Reading): Promise<void> {
        await this.prisma.reading.update({
            where: {
                id: reading.id
            },
            data: {
                id: reading.id,
                duration: reading.getDuration(),
                updatedAt: reading.getUpdatedAt(),
                userDate: reading.getUserDate(),
            }
        })
        await this.prisma.readingBook.deleteMany({
            where: {
                readingId: reading.id
            }
        })

        for (const book of reading.getBooks()) {
            await this.prisma.readingBook.create({
                data: {
                    id: uuidv4(),
                    bookId: book.id,
                    readingId: reading.id
                }
            })
        }
    }
    async delete(id: string, bookName?: string, userId?: string): Promise<void> {
        await this.prisma.reading.delete({
            where: {
                id
            }
        })

        if (bookName && userId) {
            const completedBook = await this.prisma.userCompletedBook.findFirstOrThrow({
                where: {
                    book: bookName,
                    userId: userId
                }
            })

            await this.prisma.userCompletedBook.delete({ where: { id: completedBook.id } })
        }


    }
    async deleteOfUser(userId: string): Promise<void> {
        await this.prisma.reading.deleteMany({
            where: {
                userId: userId
            }
        })
    }
}