import { IUserRepostory } from '../../repository/IUserRepository'

export class DisableUser {
    private readonly userRepository: IUserRepostory
    constructor(userRepository: IUserRepostory) {
        this.userRepository = userRepository
    }

    async execute(userId: string) {
        const user = await this.userRepository.getById(userId)

        user.disable()

        await this.userRepository.update(user)
    }
}