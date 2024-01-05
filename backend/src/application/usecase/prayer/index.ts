import { prisma } from '@/infra/database'
import { PrayerRepositoryPrisma } from '@/infra/repository/prisma/PrayerRepositoryPrisma'
import { updatePoints } from '../user'
import { AddTimePrayed } from './AddTimePrayed'
import { CreatePrayer } from './CreatePrayer'
import { DeletePrayer } from './DeletePrayer'
import { FinishedPrayer } from './FinishedPrayer'
import { GetAllPrayers } from './GetAllPrayers'
import { GetPrayerById } from './GetPrayerById'
import { UpdatePrayer } from './UpdatePrayer'

const prayerRepository = new PrayerRepositoryPrisma(prisma)

const createPrayer = new CreatePrayer(prayerRepository, updatePoints)
const getAllPrayers = new GetAllPrayers(prayerRepository)
const getPrayerById = new GetPrayerById(prayerRepository)
const finisehdPrayer = new FinishedPrayer(prayerRepository, updatePoints)
const updatePrayer = new UpdatePrayer(prayerRepository)
const deletePrayer = new DeletePrayer(prayerRepository)
const addTimePrayed = new AddTimePrayed(prayerRepository)

export { createPrayer, getAllPrayers, getPrayerById, finisehdPrayer, updatePrayer, deletePrayer, addTimePrayed }
