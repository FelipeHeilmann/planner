import { IUserRepository } from '@/application/repository/IUserRepository'

export class CancelUserAccess {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(input: Input): Promise<void> {
        const user = await this.userRepository.getById(input.applicationUserId)

        user.disable()

        await this.userRepository.update(user)
    }
}

type Input = {
    id: string
    name: string
    email: string
    applicationUserId: string
    acessDuration: number
    createdAt: Date
    endDate: Date
}