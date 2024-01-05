import { IBookRepository } from '@/application/repository/IBooksRepository'
import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'
import { IReadingRepository } from '@/application/repository/IReadingRepository'
import { Reading } from '@/domain/entities/Reading'
import { UpdateUserPoints } from '../user/UpdateUserPoints'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { CompleteBook } from '@/domain/service/CompleteBook'
import { CompleteBible } from '@/domain/service/CompleteBible'
import { CompletePlan } from '@/domain/service/CompletePlan'
import { Book } from '@/domain/entities/Book'

export class CreateReading {
    private readonly readingRepository: IReadingRepository
    private readonly updatePoints: UpdateUserPoints
    private readonly bookRepository: IBookRepository
    private readonly readingPlanRepository: IReadingPlanRepository
    private readonly userRepository: IUserRepository
    constructor(
        readingRepository: IReadingRepository,
        updatePoints: UpdateUserPoints,
        bookRepository: IBookRepository,
        readingPlanRepository: IReadingPlanRepository,
        userRepository: IUserRepository
    ) {
        this.readingRepository = readingRepository
        this.updatePoints = updatePoints
        this.bookRepository = bookRepository
        this.readingPlanRepository = readingPlanRepository
        this.userRepository = userRepository
    }

    async execute(input: Input): Promise<{ reading: Reading, message: string | undefined }> {
        const books = []

        for (const bookId of input.bookChapters) {
            books.push(await this.bookRepository.getByNameAndChapter(input.bookName, bookId))
        }

        const readingPlanId = input.readingPlanId
        const readingPlan = readingPlanId ? await this.readingPlanRepository.getById(readingPlanId) : null


        const reading = Reading.create(
            input.duration,
            input.userId,
            books,
            new Date(input.userDate),
            readingPlan
        )

        await this.readingRepository.save(reading)

        const createReadingMessage = await this.updatePoints.execute(reading.getUserId(), 1)

        const completedBookMessage = await this.bookIsComplete(reading)

        let message: string | undefined

        if (completedBookMessage !== undefined) {
            message = 'Parabéns! Você subiu de nível'
        } else if (createReadingMessage !== undefined) {
            message = 'Parabéns! Você subiu de nível'
        } else {
            message = undefined
        }

        await this.bibleIsCompleted(reading.getUserId())

        if (reading.getReadingPlan() !== null) {
            await this.readingPlanIsCompleted(reading.getReadingPlan()!.id)
        }

        return { reading, message }
    }

    private async bookIsComplete(createdReading: Reading) {
        const readings = await this.readingRepository.getAll(createdReading.getUserId())

        const books = await this.bookRepository.getByName(createdReading.getBooks()[0].name)

        const completedBook = new CompleteBook()

        const userToCheck = await this.userRepository.getById(createdReading.getUserId())

        const { user, completed } = completedBook.check(createdReading, readings, books, userToCheck)

        await this.userRepository.update(user)

        if (completed) {
            return await this.updatePoints.execute(createdReading.getUserId(), 4)
        }
        else {
            return undefined
        }
    }
    private async bibleIsCompleted(userId: string) {
        const readings = await this.readingRepository.getAll(userId)

        const books = await this.bookRepository.getAll()

        const completeBible = new CompleteBible()

        const userToCheck = await this.userRepository.getById(userId)

        const { user } = completeBible.check(readings, books, userToCheck)

        await this.userRepository.update(user)

    }
    private async readingPlanIsCompleted(readingPlanId: string) {
        const completePlan = new CompletePlan()

        const readings = await this.readingRepository.getByPlan(readingPlanId)
        const readingPlanToCheck = await this.readingPlanRepository.getById(readingPlanId)
        let books: Book[] = []
        if (readingPlanToCheck.getPlanOf() === 'book') books = await this.bookRepository.getByName(readingPlanToCheck.getBook()!)
        if (readingPlanToCheck.getPlanOf() === 'testament') books = await this.bookRepository.getByTestament(readingPlanToCheck.getTestamentId()!)
        if (readingPlanToCheck.getPlanOf() === 'bible') books = await this.bookRepository.getAll()

        const readingPlan = completePlan.check(readings, books, readingPlanToCheck)

        await this.readingPlanRepository.update(readingPlan)
    }
}


type Input = {
    bookChapters: number[]
    bookName: string
    duration: number
    userDate: string
    userId: string
    readingPlanId: string | null
}