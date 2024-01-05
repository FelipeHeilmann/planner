import { User } from '../../domain/entities/User'

export class UserMapper {

    static map(input: userDBOutput) {
        return new User(
            input.id,
            input.name,
            input.email,
            input.applicationUserId,
            input.accessDuration,
            input.createdAt,
            input.endDate,
            input.isActive
        )

    }

    static mapCollection(input: userDBOutput[]): User[] {
        const users: User[] = []

        input.map(user => users.push(UserMapper.map(user)))

        return users
    }
}

type userDBOutput = {
    id: string
    name: string
    email: string
    accessDuration: number
    applicationUserId: string
    endDate: Date
    createdAt: Date
    isActive: boolean
}