import { UserViewModel } from '@/api/view-model/UserViewModel'
import { IUserRepository } from '@/application/repository/IUserRepository'

export class GetAffiliates {
    private readonly userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute() {
        const affliates = await this.userRepository.getAffiliates()

        return UserViewModel.mapCollection(affliates)
    }
}