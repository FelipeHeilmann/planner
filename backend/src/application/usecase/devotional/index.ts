import { prisma } from '@/infra/database'
import { BookRepositoryPrisma } from '@/infra/repository/prisma/BookRepositoryPrisma'
import { DevotionalRepositoryPrisma } from '@/infra/repository/prisma/DevotionalRepositoryPrisma'
import { updatePoints } from '../user'
import { CreateDevotional } from './CreateDevotional'
import { DeleteDevotional } from './DeleteDevotional'
import { GetAllDevotional } from './GetAllDevotional'
import { GetDevotionalById } from './GetDevotionalById'
import { UpdateDevotional } from './UpdateDevotional'

const devotionalRepository = new DevotionalRepositoryPrisma(prisma)
const bookRepository = new BookRepositoryPrisma(prisma)

const createDevotional = new CreateDevotional(devotionalRepository, updatePoints, bookRepository)
const getAllDevotional = new GetAllDevotional(devotionalRepository)
const updateDevotional = new UpdateDevotional(devotionalRepository, bookRepository)
const getDevotionalById = new GetDevotionalById(devotionalRepository)
const deleteDevotional = new DeleteDevotional(devotionalRepository)

export { createDevotional, getAllDevotional, updateDevotional, getDevotionalById, deleteDevotional }
