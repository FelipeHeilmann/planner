import { NotFoundError } from '@/api/helpers/api-error'
import { IMemorizationRepository } from '@/application/repository/IMemorizationRepository'

export class DeleteMemorization {
    private readonly memorizationRepository: IMemorizationRepository
    constructor(memorizationRepository: IMemorizationRepository) {
        this.memorizationRepository = memorizationRepository
    }

    async execute(memorizationId: string): Promise<void> {
        const memorization = await this.memorizationRepository.getById(memorizationId)

        if (memorization === null) {
            throw new NotFoundError('Memorização não encontrada')
        }

        await this.memorizationRepository.delete(memorizationId)
    }

}