import { prisma } from '@/infra/database'
import { ReadingPlanRepositoryPrisma } from '@/infra/repository/prisma/ReadingPlanRepositoryPrisma'
import { BookRepositoryPrisma } from '@/infra/repository/prisma/BookRepositoryPrisma'
import { UserRepositoryPrisma } from '@/infra/repository/prisma/UserRepositoryPrisma'
import { ReadingRepositoryPrisma } from '@/infra/repository/prisma/ReadingRepositoryPrisma'
import { CreateReading } from './CreateReading'
import { GetAllReadings } from './GetAllReadings'
import { GetReadingById } from './GetReadingById'
import { DeleteReading } from './DeleteReading'
import { UpdateReading } from './UpdateReadings'
import { updatePoints } from '../user'
import { GetReadingsGroupByMonth } from './GetReadingsGroupByMonth'

const readingRepository = new ReadingRepositoryPrisma(prisma)
const readingPlanRepository = new ReadingPlanRepositoryPrisma(prisma)
const bookRepository = new BookRepositoryPrisma(prisma)
const userRepository = new UserRepositoryPrisma(prisma)

const getAllReadings = new GetAllReadings(readingRepository)
const getReadingById = new GetReadingById(readingRepository)
const deleteReading = new DeleteReading(readingRepository)
const updateReading = new UpdateReading(readingRepository, bookRepository)
const getReadingsGroupByMonth = new GetReadingsGroupByMonth(readingRepository)

const createReading = new CreateReading(readingRepository, updatePoints, bookRepository, readingPlanRepository, userRepository)


export {
    createReading,
    getAllReadings,
    getReadingById,
    deleteReading,
    updateReading,
    getReadingsGroupByMonth
}