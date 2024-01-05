import { IDevotionalRepository } from '@/application/repository/IDevotionalRepository'
import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'
import { IPrayerRepository } from '@/application/repository/IPrayerRepository'
import { IReadingPlanRepository } from '@/application/repository/IReadingPlanRepository'
import { IReadingRepository } from '@/application/repository/IReadingRepository'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { Queue } from '@/infra/queue/Queue'

export class DeleteUser {
    private readonly userRepository: IUserRepository
    private readonly readingPlanRepository: IReadingPlanRepository
    private readonly memorizationRepository: IMemorizationRepository
    private readonly devotionalRepository: IDevotionalRepository
    private readonly readingRepository: IReadingRepository
    private readonly prayerRepository: IPrayerRepository
    private readonly queue: Queue
    constructor(
        userRepository: IUserRepository,
        readingPlanRepository: IReadingPlanRepository,
        memorizationRepository: IMemorizationRepository,
        devotionalRepository: IDevotionalRepository,
        readingRepository: IReadingRepository,
        prayerRepository: IPrayerRepository,
        queue: Queue
    ) {
        this.userRepository = userRepository
        this.readingPlanRepository = readingPlanRepository
        this.memorizationRepository = memorizationRepository
        this.devotionalRepository = devotionalRepository
        this.readingRepository = readingRepository
        this.prayerRepository = prayerRepository
        this.queue = queue
    }

    async execute(userId: string): Promise<void> {
        await this.queue.connect()

        await Promise.all([
            this.devotionalRepository.deleteOfUser(userId),
            this.memorizationRepository.deleteOfUser(userId),
            this.prayerRepository.deleteOfUser(userId),
            this.readingRepository.deleteOfUser(userId),
            this.readingPlanRepository.deleteOfUser(userId),
        ])

        const user = await this.userRepository.getById(userId)
        user.disable()
        await this.userRepository.update(user)

        await this.queue.publish('userCanceled', user.id)
    }
}