import { ReadingViewModel } from '@/api/view-model/ReadingViewModel'
import { IReadingRepository } from '@/application/repository/IReadingRepository'

export class GetAllReadings {
    private readonly readingRepository: IReadingRepository
    constructor(readingRepository: IReadingRepository) {
        this.readingRepository = readingRepository
    }

    async execute(userId: string): Promise<ReadingViewModel[]> {
        const readings = await this.readingRepository.getAll(userId)

        return ReadingViewModel.mapCollection(readings)
    }
}