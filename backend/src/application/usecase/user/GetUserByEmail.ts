import { IUserRepository } from '@/application/repository/IUserRepository'
import { User } from '@/domain/entities/User'

export class GetUserByEmail {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: string): Promise<User | null> {
        const user = await this.userRepository.getByEmail(email)

        return user
    }
}