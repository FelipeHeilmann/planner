import { prisma } from '@/infra/database'
import { BookRepositoryPrisma } from '@/infra/repository/prisma/BookRepositoryPrisma'
import { MemorizationRepositoryPrisma } from '@/infra/repository/prisma/MemorizationRepositoryPrisma'
import { updatePoints } from '../user'
import { AddTimeMemorizated } from './AddTimeMemorizated'
import { CreateMemorization } from './CreateMemorization'
import { DeleteMemorization } from './DeleteMemorization'
import { FinishedMemorization } from './FinishedMemorization'
import { GetAllMemorizations } from './GetAllMemorizaion'
import { GetMemorizationById } from './GetMermorizationById'
import { UpdateMemorization } from './UpdateMemorization'

const memorizationRepository = new MemorizationRepositoryPrisma(prisma)
const bookRepository = new BookRepositoryPrisma(prisma)

const createMemorization = new CreateMemorization(memorizationRepository, updatePoints, bookRepository)
const getAllMemorization = new GetAllMemorizations(memorizationRepository)
const updateMemorization = new UpdateMemorization(memorizationRepository, bookRepository)
const finishedMemorization = new FinishedMemorization(memorizationRepository, updatePoints)
const addTimeMemorizated = new AddTimeMemorizated(memorizationRepository)
const getMemorizationById = new GetMemorizationById(memorizationRepository)
const deleteMemorization = new DeleteMemorization(memorizationRepository)

export { createMemorization, getAllMemorization, updateMemorization, finishedMemorization, addTimeMemorizated, getMemorizationById, deleteMemorization }
