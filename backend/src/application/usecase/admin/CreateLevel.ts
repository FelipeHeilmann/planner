import { ILevelRepository } from '@/application/repository/ILevelRepository'
import { Level } from '@/domain/entities/Level'

export class CreateLevel {
    private readonly levelRepository: ILevelRepository
    constructor(levelRepository: ILevelRepository) {
        this.levelRepository = levelRepository
    }

    async execute(input: Input): Promise<Level> {
        const count = await this.levelRepository.count()
        const level = new Level(count + 1, input.name, input.description, input.minPoints, input.imageUrl)

        await this.levelRepository.save(level)

        return level
    }
}

type Input = {
    name: string
    description: string
    minPoints: number
    imageUrl: string
}