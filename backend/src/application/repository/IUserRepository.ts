import { Level } from '@/domain/entities/Level'
import { User } from '@/domain/entities/User'


export interface IUserRepository {
    getAll(): Promise<User[]>

    getAdmins(): Promise<User[]>

    getAffiliates(): Promise<User[]>

    getById(id: string): Promise<User>

    getByEmail(email: string): Promise<User | null>

    getCountData(userId: string): Promise<Output>

    save(user: User): Promise<void>

    completedBook(user: User): Promise<void>

    update(user: User): Promise<void>

    delete(id: string): Promise<void>
}

type Output = {
    level: Level
    points: number
    readings: number
    devotionals: number
    prayers: number
    memorizations: number
}