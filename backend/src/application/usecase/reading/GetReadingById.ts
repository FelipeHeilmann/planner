import { ReadingViewModel } from '@/api/view-model/ReadingViewModel'
import { IReadingRepository } from '@/application/repository/IReadingRepository'

export class GetReadingById {
    private readonly readingRepository: IReadingRepository
    constructor(readingRepository: IReadingRepository) {
        this.readingRepository = readingRepository
    }

    async execute(id: string): Promise<ReadingViewModel> {
        const reading = await this.readingRepository.getById(id)


        return ReadingViewModel.map(reading)
    }
}