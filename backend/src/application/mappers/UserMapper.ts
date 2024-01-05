import { CompletedBook } from '@/domain/entities/CompletedBook'
import { User } from '@/domain/entities/User'
import { OriginEnum } from '@/domain/enum/originEnum'

export class UserMapper {
    static map(input: UserDBOutput): User {
        return new User(
            input.id,
            input.name,
            input.email,
            input.password,
            input.levelId,
            input.createdAt,
            input.updatedAt,
            input.points,
            input.completedBible,
            input.accessDuration,
            input.isActive,
            input.isAdmin,
            input.birthDate,
            input.gender,
            input.disabledAt,
            input.lastLoginAt,
            input.pagarmeId,
            input.imageUrl,
            [],
            input.theme,
            input.isAffiliate,
            input.origin === 'Pagamento' ? OriginEnum.Payment : input.origin === 'Manual' ? OriginEnum.Manual : null
        )
    }
    static mapCollection(input: UserDBOutput[]): User[] {
        const users: User[] = []

        input.map(item => users.push(UserMapper.map(item)))

        return users
    }

    static mapCompletedBook(input: CompletedBookDBOuput[]): CompletedBook[] {
        const completedBook: CompletedBook[] = []

        input.map(item => completedBook.push(new CompletedBook(item.book, item.completed, item.finishedAt, item.startedAt)))

        return completedBook
    }
}

type UserDBOutput = {
    id: string
    name: string
    email: string
    password: string
    points: number
    createdAt: Date
    updatedAt: Date
    levelId: number
    isActive: boolean
    isAdmin: boolean
    theme: string,
    completedBible: number
    accessDuration: number
    isAffiliate: boolean
    gender: string | null
    birthDate: Date | null
    imageUrl: string | null
    disabledAt: Date | null
    lastLoginAt: Date | null
    pagarmeId: string | null
    origin: string | null
}

type CompletedBookDBOuput = {
    id: string
    book: string
    completed: number
    finishedAt: Date[]
    startedAt: Date[]
}