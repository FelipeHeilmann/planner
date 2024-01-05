import { prisma } from '@/infra/database'
import { ReadingPlanRepositoryPrisma } from '@/infra/repository/prisma/ReadingPlanRepositoryPrisma'
import { ReadingRepositoryPrisma } from '@/infra/repository/prisma/ReadingRepositoryPrisma'
import { CreateReadingPlan } from './CreateReadingPlan'
import { DecreaseGoalPerDay } from './DecreaseGoalPerDay'
import { GetAllReadingsPlan } from './GetAllReadingsPlans'
import { GetReadingPlanById } from './GetReadingPlanById'
import { GetReadingsOfReadingPlan } from './GetReadingsOfReadingPlan'
import { IncreaseGoalPerDay } from './IncreaseGoalPerDay'
import { UpdateReadingPlan } from './UpdateReadingPlan'
import { GetReadingPlanReadingsGroupByMonth } from './GetReadingPlanReadingsGroupByMonth'
import { BookRepositoryPrisma } from '@/infra/repository/prisma/BookRepositoryPrisma'
import { GetReadingsPlanCount } from './GetReadingPlanCount'
import { GetReadingPlanReadingGroupByDay } from './GetReadingPlanReadingGroupByDay'

const readingPlanRepository = new ReadingPlanRepositoryPrisma(prisma)
const readingRepository = new ReadingRepositoryPrisma(prisma)
const bookRepository = new BookRepositoryPrisma(prisma)

const createReadinPlan = new CreateReadingPlan(readingPlanRepository)
const getReadingPlanById = new GetReadingPlanById(readingPlanRepository)
const getReadingsOfReadingPlan = new GetReadingsOfReadingPlan(readingRepository)
const getAllReadingsPlans = new GetAllReadingsPlan(readingPlanRepository)
const increaseReadingPlanGoalPerDay = new IncreaseGoalPerDay(readingPlanRepository)
const decreaseReadingPlanGoalPerDay = new DecreaseGoalPerDay(readingPlanRepository)
const updateReadingPlan = new UpdateReadingPlan(readingPlanRepository)
const getReadingsPlanCount = new GetReadingsPlanCount(readingRepository, bookRepository, readingPlanRepository)
const getReadingPlanReadingsGroupByMonth = new GetReadingPlanReadingsGroupByMonth(readingRepository)
const getReadingPlanReadingGroupByDay = new GetReadingPlanReadingGroupByDay(readingRepository)


export {
    createReadinPlan,
    getReadingPlanById,
    getReadingsOfReadingPlan,
    getAllReadingsPlans,
    increaseReadingPlanGoalPerDay,
    decreaseReadingPlanGoalPerDay,
    updateReadingPlan,
    getReadingPlanReadingsGroupByMonth,
    getReadingsPlanCount,
    getReadingPlanReadingGroupByDay
}
