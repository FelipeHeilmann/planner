import { BadRequestError } from '@/api/helpers/api-error'
import { IUserRepository } from '@/application/repository/IUserRepository'
import bcrypt from 'bcrypt'

export class ChangePassword {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(input: Input): Promise<void> {
        const user = await this.userRepository.getById(input.userId)

        const checkPassword = await bcrypt.compare(
            input.oldPassword,
            user.getPassword()
        )

        if (!checkPassword) {
            throw new BadRequestError('A senha antiga inválida')
        }

        const salt = await bcrypt.genSalt(12)
        const newPassword = await bcrypt.hash(input.newPassword, salt)

        user.setPassword(newPassword)
        user.setUpdatedAt(new Date())

        await this.userRepository.update(user)
    }
}

type Input = {
    userId: string
    oldPassword: string
    newPassword: string
}