import { Prayer } from '@/domain/entities/Prayer'

export interface IPrayerRepository {
    save(prayer: Prayer): Promise<void>

    getAll(userId: string): Promise<Prayer[]>

    getById(id: string): Promise<Prayer>

    update(prayer: Prayer): Promise<void>

    delete(id: string): Promise<void>

    deleteOfUser(userId: string): Promise<void>
}