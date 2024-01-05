import { IUserRepository } from '@/application/repository/IUserRepository'

export class ToggleTheme {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(userId: string): Promise<string> {
        const user = await this.userRepository.getById(userId)

        user.toggleTheme()

        await this.userRepository.update(user)

        return user.getTheme()
    }
}