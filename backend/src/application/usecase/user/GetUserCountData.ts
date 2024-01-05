import { IUserRepository } from '@/application/repository/IUserRepository'
import { Level } from '@/domain/entities/Level'

export class GetUserCountData {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(userId: string): Promise<Output> {
        const user = await this.userRepository.getCountData(userId)

        return user
    }
}

type Output = {
    level: Level
    points: number
    readings: number
    devotionals: number
    prayers: number
    memorizations: number
}