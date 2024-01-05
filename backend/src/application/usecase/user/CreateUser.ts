import { UnprocessableError } from '@/api/helpers/api-error'
import { User } from '@/domain/entities/User'
import { CreatedUser } from '@/domain/events/CreatedUser'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { Queue } from '@/infra/queue/Queue'
import bcrypt from 'bcrypt'
import { OriginEnum } from '@/domain/enum/originEnum'

export class CreateUser {
    private readonly userRepository: IUserRepository
    private readonly queue: Queue
    constructor(userRepository: IUserRepository, queue: Queue) {
        this.userRepository = userRepository
        this.queue = queue
    }

    async execute(input: Input): Promise<User> {
        await this.queue.connect()
        const salt = await bcrypt.genSalt(12)
        const hashPassword = await bcrypt.hash(input.password, salt)

        const userExits = await this.userRepository.getByEmail(input.email)

        if (userExits !== null) {
            throw new UnprocessableError('Email já foi usado')
        }

        const user = User.create(
            input.name,
            input.email,
            hashPassword,
            input.accessDuration,
            true,
            input.isAdmin,
            null,
            false,
            OriginEnum.Manual
        )

        await this.userRepository.save(user)

        const createdUser = new CreatedUser(
            user.id,
            user.getName(), user.getEmail(),
            user.getAccesDuration(),
            user.getCreatedAt(),
            user.getIsActive(),
            input.password
        )

        if (input.isAdmin === false) await this.queue.publish('createUser', createdUser)
        else await this.queue.publish('createAdmin', createdUser)

        return user
    }
}

type Input = {
    name: string,
    email: string,
    password: string,
    accessDuration: number,
    isAdmin: boolean
}