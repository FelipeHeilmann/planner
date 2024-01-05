import { ILevelRepository } from '@/application/repository/ILevelRepository'
import { Level } from '@/domain/entities/Level'

export class GetLevels {
    private readonly levelRepository: ILevelRepository
    constructor(levelRepository: ILevelRepository) {
        this.levelRepository = levelRepository
    }

    async execute(): Promise<Level[]> {
        return await this.levelRepository.getAll()
    }
}