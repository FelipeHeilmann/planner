import { Reading } from '@/domain/entities/Reading'

export interface IReadingRepository {
    save(reading: Reading): Promise<void>

    getAll(userId: string): Promise<Reading[]>

    getById(id: string): Promise<Reading>

    getByPlan(readingPlanId: string): Promise<Reading[]>

    update(reading: Reading): Promise<void>

    delete(id: string, bookName?: string, userId?: string): Promise<void>

    deleteOfUser(userId: string): Promise<void>

}