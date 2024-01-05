import { IUserRepository } from '@/application/repository/IUserRepository'
import { ILevelRepository } from '@/application/repository/ILevelRepository'

export class UpdateUserPoints {
    private readonly userRepository: IUserRepository
    private readonly levelRepository: ILevelRepository
    constructor(userRepository: IUserRepository, levelRepository: ILevelRepository) {
        this.userRepository = userRepository
        this.levelRepository = levelRepository
    }

    async execute(id: string, points: number): Promise<boolean | undefined> {
        const user = await this.userRepository.getById(id)

        user.incrementPoints(points)

        await this.userRepository.update(user)

        const nextLevel = await this.levelRepository.getById(user.getLevelId() + 1)

        if (nextLevel == null) {
            return undefined
        }

        if (user.getPoints() >= nextLevel.minPoints) {
            user.nextLevel(nextLevel.id)

            await this.userRepository.update(user)

            return true
        }

    }
}