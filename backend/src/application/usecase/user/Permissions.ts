import { IUserRepository } from '@/application/repository/IUserRepository'

export class Permissions{
    private readonly userRepository: IUserRepository
    
    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository
    }

    async execute(userId: string): Promise<Output>{
        const user = await this.userRepository.getById(userId)

        return {
            isAdmin: user.getIsAdmin(),
            isAffiliate: user.getIsAffiliate()
        }
    }
}

type Output = {
    isAdmin: boolean
    isAffiliate: boolean
}