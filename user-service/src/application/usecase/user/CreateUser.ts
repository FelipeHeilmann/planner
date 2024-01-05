import { User } from '../../../domain/entities/User'
import { SendMail } from './SendMail'
import { welcomeTemplate } from '../../../resources/mail/welcome'
import { IUserRepostory } from '../../repository/IUserRepository'

export class CreateUser {
    private readonly userRepository: IUserRepostory
    private readonly sendMail: SendMail
    constructor(userRepository: IUserRepostory, sendMail: SendMail) {
        this.userRepository = userRepository
        this.sendMail = sendMail
    }

    async execute(input: Input) {
        let endDate
        if (input.accessDuration === 1) {
            const date = new Date(input.createdAt)
            date.setFullYear(date.getFullYear() + 1)
            endDate = date
        } else if (input.accessDuration === 6) {
            const date = new Date(input.createdAt)
            date.setMonth(date.getMonth() + 6)
            endDate = date
        }

        const user = User.create(
            input.name,
            input.email,
            input.id,
            input.accessDuration,
            new Date(input.createdAt),
            endDate!,
            input.isActive,
        )

        await this.userRepository.save(user)

        const template = welcomeTemplate(input.password)

        await this.sendMail.execute(input.name, input.email, 'Bem-vindo à Plataforma!', template)
    }
}

type Input = {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
    accessDuration: number
    isActive: boolean
}