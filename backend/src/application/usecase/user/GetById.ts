import { NotFoundError } from '@/api/helpers/api-error'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { User } from '@/domain/entities/User'

export class GetById {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(id: string): Promise<User> {
        const user = await this.userRepository.getById(id)

        if (user === null) {
            throw new NotFoundError('Usuário não encontrado')
        }

        return user
    }
}