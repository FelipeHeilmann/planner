import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'

export class AddTimeMemorizated {
    private readonly memorizationRepository: IMemorizationRepository
    constructor(memorizationRepository: IMemorizationRepository) {
        this.memorizationRepository = memorizationRepository
    }

    async execute(date: string, memorizationId: string): Promise<void> {
        const memorization = await this.memorizationRepository.getById(memorizationId)
        memorization.memorize(new Date(date))

        await this.memorizationRepository.update(memorization)
    }
}