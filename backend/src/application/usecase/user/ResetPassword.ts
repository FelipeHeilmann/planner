import { BadRequestError } from '@/api/helpers/api-error'
import { IUserRepository } from '@/application/repository/IUserRepository'
import bcrypt from 'bcrypt'

export class ResetPassword {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(input: resetPassword): Promise<void> {
        const user = await this.userRepository.getById(input.id)

        if (input.password !== input.confirmPassword) {
            throw new BadRequestError('As senhas não coincidem')
        }

        const salt = await bcrypt.genSalt(12)
        const hashPass = await bcrypt.hash(input.password, salt)

        user.setPassword(hashPass)

        await this.userRepository.update(user)
    }
}

type resetPassword = {
    id: string
    password: string
    confirmPassword: string
}