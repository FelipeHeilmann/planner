import { User } from "../../domain/entities/User"

export interface IUserRepostory {
    getAll(): Promise<User[]>

    getById(userId: string): Promise<User>

    save(user: User): Promise<void>

    update(user: User): Promise<void>

}