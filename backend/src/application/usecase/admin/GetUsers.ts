import { UserViewModel } from '@/api/view-model/UserViewModel'
import { IUserRepository } from '@/application/repository/IUserRepository'

export class GetUsers {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(): Promise<UserViewModel[]> {
        const users = await this.userRepository.getAll()

        return UserViewModel.mapCollection(users)
    }
}
