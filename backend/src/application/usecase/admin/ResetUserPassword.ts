import { IUserRepository } from '@/application/repository/IUserRepository'
import bcrypt from 'bcrypt'

export class ResetUserPassword {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(userId: string) {
        const user = await this.userRepository.getById(userId)

        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash('mudar123', salt)

        user.setPassword(hashPassword)

        await this.userRepository.update(user)
    }
}