import { IUserRepository } from '@/application/repository/IUserRepository'

export class MakeUserAffiliate {
    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(userId: string) {
        const user = await this.userRepository.getById(userId)

        user.makeAffiliate()

        await this.userRepository.update(user)
    }
}