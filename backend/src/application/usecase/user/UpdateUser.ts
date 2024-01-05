import { BadRequestError } from '@/api/helpers/api-error'
import { IUserRepository } from '@/application/repository/IUserRepository'
import bcrypt from 'bcrypt'

export class UpdateUser {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(input: Input): Promise<void> {
        const user = await this.userRepository.getById(input.userId)
        if (input.newPassword && input.oldPassword) {


            const checkPassword = await bcrypt.compare(
                input.oldPassword,
                user.getPassword()
            )

            if (!checkPassword) {
                throw new BadRequestError('Senha antiga inválida')
            }

            const salt = await bcrypt.genSalt(12)
            const newPassword = await bcrypt.hash(input.newPassword, salt)

            user.setPassword(newPassword)
            user.setUpdatedAt(new Date())

            await this.userRepository.update(user)
        }

        if (input.name) {
            user.setName(input.name)
            user.setUpdatedAt(new Date())

            await this.userRepository.update(user)
        }

        if (input.birthDate) {
            user.setBirthDate(new Date(input.birthDate))
            user.setUpdatedAt(new Date())

            await this.userRepository.update(user)
        }

        if (input.gender) {
            user.setGender(input.gender)

            user.setUpdatedAt(new Date())

            await this.userRepository.update(user)
        }
    }
}


type Input = {
    name?: string
    newPassword?: string
    oldPassword?: string
    userId: string
    gender?: string
    birthDate?: string
}