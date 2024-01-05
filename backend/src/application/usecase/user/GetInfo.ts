import { IUserRepository } from '@/application/repository/IUserRepository'

export class GetInfo {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(userId: string): Promise<Output> {
        const user = await this.userRepository.getById(userId)

        return {
            name: user.getName(),
            completedBible: user.getCompletedBible(),
            imageUrl: user.getImageUrl(),
            theme: user.getTheme(),
            level: user.getLevelId(),
            email: user.getEmail(),
            gender: user.getGender(),
            birthDate: user.getBirthDate()
        }
    }
}

type Output = {
    name: string
    completedBible: number
    imageUrl: string | null,
    theme: string,
    level: number
    email: string
    gender: string | null
    birthDate: Date | null
}