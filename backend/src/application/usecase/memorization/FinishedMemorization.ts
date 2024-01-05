import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'
import { UpdateUserPoints } from '../user/UpdateUserPoints'

export class FinishedMemorization {
    private readonly memorizationRepository: IMemorizationRepository
    private readonly updatePoints: UpdateUserPoints
    constructor(memorizationRepository: IMemorizationRepository, updatePoints: UpdateUserPoints) {
        this.memorizationRepository = memorizationRepository
        this.updatePoints = updatePoints
    }

    async execute(memorizationId: string): Promise<string | undefined> {
        const memorization = await this.memorizationRepository.getById(memorizationId)

        let message
        if (memorization.getIsFinished() === false) {
            const existMessage = await this.updatePoints.execute(memorization.getUserId(), 1)
            existMessage === true ? message = 'Parabéns! Você subiu de nível' : undefined
        }

        memorization.finished()

        await this.memorizationRepository.update(memorization)

        return message
    }
}